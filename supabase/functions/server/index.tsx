import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import { checkDatabaseHealth } from "./database.ts";
import { userRepository } from "./repositories/userRepository.ts";
import { logRepository } from "./repositories/logRepository.ts";
import { reportRepository } from "./repositories/reportRepository.ts";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Helper: 简单的HTML去除标签函数
const stripHtml = (html: string) => {
  return html
    .replace(/<[^>]*>/g, ' ') // 去除所有HTML标签
    .replace(/\s+/g, ' ') // 合并多个空格
    .trim();
};

// Helper: 从Authorization header中提取用户信息
const getUserFromToken = (authHeader: string | undefined) => {
  if (!authHeader) return null;
  const token = authHeader.replace('Bearer ', '');
  try {
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error('Invalid token');
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    return {
      userId: payload.sub,
      userEmail: payload.email,
      userName: payload.user_metadata?.name || payload.email?.split('@')[0] || '用户'
    };
  } catch (e) {
    return null;
  }
};

// Team members data
const teamMembers = [
  { id: '1', name: '刘硕', role: '产品经理', email: 'liushuo@itcast.cn' },
  { id: '2', name: '王静', role: '设计师', email: 'wangjing@itcast.cn' },
  { id: '3', name: '李方华', role: '设计师', email: 'lifanghua@itcast.cn' },
  { id: '4', name: '娄江华', role: '前端开发工程师', email: 'loujianghua@itcast.cn' },
  { id: '5', name: '牟浩天', role: '后端开发工程师', email: 'muhaotian@itcast.cn' },
  { id: '6', name: '吴雪', role: '项目部主管', email: 'wuxue1@itcast.cn' }
];

// 健康检查接口
app.get("/make-server-e9f91fb9/health", async (c) => {
  try {
    const dbHealthy = await checkDatabaseHealth();
    return c.json({
      status: "ok",
      database: dbHealthy ? "connected" : "disconnected",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check error:', error);
    return c.json({
      status: "error",
      database: "disconnected",
      error: error.message
    }, 500);
  }
});

// 用户注册接口
app.post("/make-server-e9f91fb9/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    if (!email || !password || !name) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // 检查用户是否已存在
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      return c.json({ error: 'Email already registered' }, 400);
    }

    // 生成用户ID
    const userId = crypto.randomUUID();

    // 在MySQL中创建用户记录
    const newUser = await userRepository.create({
      id: userId,
      email,
      name
    });

    // 使用Supabase Auth处理认证
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
    );

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true
    });

    if (error) {
      // 如果Supabase创建失败，删除MySQL中的记录
      await userRepository.delete(userId);
      console.error("Supabase signup error:", error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({
      user: data.user,
      mysqlUser: newUser
    });
  } catch (error: any) {
    console.error("Signup exception:", error);
    return c.json({ error: error.message }, 500);
  }
});

// 获取所有日志（支持userId、startDate、endDate查询参数）
app.get("/make-server-e9f91fb9/logs", async (c) => {
  try {
    const userId = c.req.query('userId');
    const startDate = c.req.query('startDate');
    const endDate = c.req.query('endDate');

    let logs;
    if (userId) {
      logs = await logRepository.findByUserId(userId, startDate, endDate);
    } else {
      logs = await logRepository.findAll();
    }

    // 转换为新格式以兼容前端
    const formattedLogs = logs.map(log => ({
      id: log.id,
      userId: log.user_id,
      dateTime: log.date,
      tags: [], // 需要从work_items中获取分类信息
      content: log.content_log,
      deliverables: log.deliverables ? JSON.parse(log.deliverables) : [],
      notes: log.notes,
      status: log.status
    }));

    return c.json({ logs: formattedLogs });
  } catch (error: any) {
    console.error('Get logs error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// 创建日志接口
app.post("/make-server-e9f91fb9/logs", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');

    // 使用Supabase客户端验证token
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
    );

    let userInfo = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (!error && user) {
        userInfo = {
          userId: user.id,
          userEmail: user.email,
          userName: user.user_metadata?.name || user.email?.split('@')[0] || '用户'
        };
      }
    }

    if (!userInfo) {
      return c.json({ error: 'Unauthorized', message: 'Invalid or missing authentication token' }, 401);
    }

    const body = await c.req.json();
    const logId = crypto.randomUUID();

    // 处理前端发送的workItems格式，转换为展示格式
    let tags: string[] = [];
    let content = '';
    let deliverables: any[] = [];

    if (body.workItems && Array.isArray(body.workItems)) {
      const items = body.workItems;
      tags = items.map(item => item.category).filter(Boolean);

      // 构建内容
      content = items.map(item => {
        let text = '';
        if (item.category) {
          text += `【${item.category}】\n`;
        }
        // 去除HTML标签获取纯文本
        const plainText = stripHtml(item.description || '');
        if (plainText) {
          text += plainText + '\n';
        }
        return text;
      }).filter(Boolean).join('\n');

      // 合并交付物
      items.forEach(item => {
        if (item.files && Array.isArray(item.files)) {
          item.files.forEach(file => {
            // 简单映射类型
            let type = 'DOC';
            const fileName = file.name.toLowerCase();
            if (fileName.endsWith('.ts') || fileName.endsWith('.tsx') ||
                fileName.endsWith('.js') || fileName.endsWith('.jsx')) {
              type = 'CODE';
            } else if (fileName.endsWith('.png') || fileName.endsWith('.jpg') ||
                       fileName.endsWith('.jpeg') || fileName.endsWith('.svg') ||
                       fileName.endsWith('.fig') || fileName.endsWith('.sketch')) {
              type = 'DESIGN';
            }
            deliverables.push({
              type: type,
              name: file.name,
              url: file.url
            });
          });
        }
      });
    }

    // 添加notes
    if (body.notes) {
      if (content) content += '\n';
      content += `【重点说明】\n${body.notes}`;
    }

    const newLog = {
      id: logId,
      user_id: userInfo.userId,
      date: body.date ? new Date(body.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      notes: body.notes || '',
      content_log: content || '无具体内容',
      deliverables: JSON.stringify(deliverables),
      status: body.status || 'pending'
    };

    await logRepository.create(newLog);

    return c.json({
      log: {
        id: newLog.id,
        userId: newLog.user_id,
        dateTime: newLog.date,
        tags: tags.length > 0 ? tags : ['工作记录'],
        content: newLog.content_log,
        deliverables: deliverables,
        notes: newLog.notes,
        status: newLog.status
      }
    });
  } catch (error: any) {
    console.error('Create log error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// 获取月报统计接口
app.get("/make-server-e9f91fb9/monthly-report", async (c) => {
  try {
    const userId = c.req.query('userId');
    const year = parseInt(c.req.query('year') || new Date().getFullYear().toString());
    const month = parseInt(c.req.query('month') || (new Date().getMonth() + 1).toString());

    if (!userId) {
      return c.json({ error: 'userId is required' }, 400);
    }

    // 获取现有的月报或使用MySQL数据生成统计
    const existingReport = await reportRepository.findByUserYearMonth(userId, year, month);

    if (existingReport) {
      const { categories } = await reportRepository.findReportWithCategories(existingReport.id);

      return c.json({
        stats: {
          totalLogs: existingReport.total_logs,
          totalDeliverables: existingReport.total_deliverables,
          mostActiveDay: existingReport.most_active_day,
          topCategories: categories.map(cat => ({
            name: cat.category,
            count: cat.count,
            color: getCategoryColor(cat.category)
          })),
          logs: [] // 可以从work_logs表中获取详细日志
        }
      });
    }

    // 如果没有现有月报，动态计算统计数据
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endDate = `${year}-${String(month).padStart(2, '0')}-31`;

    const logs = await logRepository.findByUserId(userId, startDate, endDate);

    // 计算统计
    const totalLogs = logs.length;
    const totalDeliverables = logs.reduce((sum, log) => {
      try {
        const deliverables = JSON.parse(log.deliverables || '[]');
        return sum + deliverables.length;
      } catch {
        return sum;
      }
    }, 0);

    // 最活跃日期
    const dayCounts: { [key: string]: number } = {};
    logs.forEach(log => {
      const day = new Date(log.date).getDate().toString();
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    });

    let mostActiveDay = '1';
    let maxCount = 0;
    Object.keys(dayCounts).forEach(day => {
      if (dayCounts[day] > maxCount) {
        maxCount = dayCounts[day];
        mostActiveDay = day;
      }
    });

    // 工作分类统计（需要从work_items表中获取）
    const categoryCounts: { [key: string]: number } = {};
    // 这里应该查询work_items表，暂时使用默认数据

    const topCategories = Object.entries(categoryCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        count,
        color: getCategoryColor(name)
      }));

    // 每日活动
    const dailyActivity = [];
    for (let i = 1; i <= 31; i++) {
      const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      dailyActivity.push({
        date: dateStr,
        count: dayCounts[i.toString()] || 0
      });
    }

    return c.json({
      stats: {
        totalLogs,
        totalDeliverables,
        mostActiveDay,
        topCategories,
        dailyActivity,
        logs: logs.map(log => ({
          id: log.id,
          userId: log.user_id,
          dateTime: log.date,
          content: log.content_log,
          deliverables: log.deliverables ? JSON.parse(log.deliverables) : [],
          notes: log.notes
        }))
      }
    });
  } catch (error: any) {
    console.error('Monthly report error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// 生成月报接口
app.post("/make-server-e9f91fb9/monthly-report/generate", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');

    // 使用Supabase客户端验证token
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
    );

    let userInfo = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (!error && user) {
        userInfo = {
          userId: user.id,
          userEmail: user.email,
          userName: user.user_metadata?.name || user.email?.split('@')[0] || '用户'
        };
      }
    }

    if (!userInfo) {
      return c.json({ error: 'Unauthorized', message: 'Invalid or missing authentication token' }, 401);
    }

    const { userId, year, month } = await c.req.json();
    const targetUserId = userId || userInfo.userId;
    const reportYear = year || new Date().getFullYear();
    const reportMonth = month || new Date().getMonth() + 1;

    // 检查是否已存在该月报
    const existingReport = await reportRepository.findByUserYearMonth(targetUserId, reportYear, reportMonth);
    if (existingReport) {
      return c.json({
        report: existingReport,
        message: 'Report already exists'
      });
    }

    // 生成新的月报
    const { report, categories } = await reportRepository.generateMonthlyStats(targetUserId, reportYear, reportMonth);

    return c.json({
      report,
      categories,
      message: 'Monthly report generated successfully'
    });
  } catch (error: any) {
    console.error('Generate report error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// 获取团队月报接口
app.get("/make-server-e9f91fb9/team-monthly-report", async (c) => {
  try {
    const year = parseInt(c.req.query('year') || new Date().getFullYear().toString());
    const month = parseInt(c.req.query('month') || (new Date().getMonth() + 1).toString());

    const emailToId: { [key: string]: string } = {
      'liushuo@itcast.cn': '1',
      'wangjing@itcast.cn': '2',
      'lifanghua@itcast.cn': '3',
      'loujianghua@itcast.cn': '4',
      'muhaotian@itcast.cn': '5',
      'wuxue1@itcast.cn': '6'
    };

    // 获取所有日志
    const allLogs = await logRepository.findAll();

    const teamReports = teamMembers.map(member => {
      const memberLogs = allLogs.filter(log => {
        const logUserId = emailToId[log.user_id] || log.user_id;
        if (logUserId !== member.id) return false;
        const logDate = new Date(log.date);
        return logDate.getFullYear() === year && logDate.getMonth() + 1 === month;
      });

      const totalDeliverables = memberLogs.reduce((sum, log) => {
        try {
          const deliverables = JSON.parse(log.deliverables || '[]');
          return sum + deliverables.length;
        } catch {
          return sum;
        }
      }, 0);

      return {
        ...member,
        totalLogs: memberLogs.length,
        totalDeliverables: totalDeliverables,
        logs: memberLogs.map(log => ({
          id: log.id,
          userId: log.user_id,
          dateTime: log.date,
          content: log.content_log,
          deliverables: log.deliverables ? JSON.parse(log.deliverables) : []
        }))
      };
    });

    return c.json({ teamReports });
  } catch (error: any) {
    console.error('Team monthly report error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// 导出月报接口
app.get("/make-server-e9f91fb9/monthly-report/export", async (c) => {
  try {
    // 这里可以实现真实的PDF导出功能
    return c.json({
      success: true,
      message: 'PDF export simulated',
      downloadUrl: 'https://example.com/report.pdf'
    });
  } catch (error: any) {
    console.error('Export report error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// 获取团队成员列表
app.get("/make-server-e9f91fb9/team/members", (c) => {
  return c.json({ members: teamMembers });
});

// 辅助函数：获取分类颜色
function getCategoryColor(category: string): string {
  const categoryColors: { [key: string]: string } = {
    '功能开发': '#10b981',
    'Bug修复': '#f59e0b',
    '后端开发': '#3b82f6',
    'UI优化': '#8b5cf6',
    '性能优化': '#06b6d4',
    '测试': '#ef4444',
    '文档编写': '#6b7280',
    '需求沟通': '#f97316',
    'React': '#10b981',
    '富文本编辑': '#f59e0b',
    'API': '#3b82f6',
    '交互设计': '#8b5cf6',
    '代码重构': '#06b6d4',
    '质量保证': '#ef4444',
    '技术分享': '#6b7280',
    '项目管理': '#f97316'
  };
  return categoryColors[category] || '#6b7280';
}

Deno.serve(app.fetch);