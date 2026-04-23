import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";
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
app.get("/make-server-e9f91fb9/health", (c) => {
  return c.json({ status: "ok" });
});

// 用户注册接口
app.post("/make-server-e9f91fb9/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    if (!email || !password || !name) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
    );

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error("Signup error:", error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ user: data.user });
  } catch (error: any) {
    console.error("Signup exception:", error);
    return c.json({ error: error.message }, 500);
  }
});

// 获取所有日志（支持userId、startDate、endDate查询参数）
app.get("/make-server-e9f91fb9/logs", async (c) => {
  const userId = c.req.query('userId');
  const startDate = c.req.query('startDate');
  const endDate = c.req.query('endDate');
  
  const allLogsRaw = await kv.getByPrefix("log:");
  let allLogs = allLogsRaw.map(v => v.value);
  
  // 过滤用户
  if (userId) {
    allLogs = allLogs.filter(log => log.userId === userId);
  }
  
  // 过滤日期范围
  if (startDate || endDate) {
    allLogs = allLogs.filter(log => {
      const logDate = new Date(log.dateTime);
      if (startDate && logDate < new Date(startDate)) return false;
      if (endDate && logDate > new Date(endDate + 'T23:59:59')) return false;
      return true;
    });
  }
  
  return c.json({ logs: allLogs });
});

// 创建日志接口
app.post("/make-server-e9f91fb9/logs", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const userInfo = getUserFromToken(authHeader);
    if (!userInfo) return c.json({ error: 'Unauthorized' }, 401);

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
      userId: userInfo.userId,
      userName: userInfo.userName,
      userEmail: userInfo.userEmail,
      dateTime: body.date ? new Date(body.date).toISOString() : new Date().toISOString(),
      tags: tags.length > 0 ? tags : ['工作记录'],
      content: content || '无具体内容',
      deliverables: deliverables,
      rawData: body // 保存原始数据以便后续处理
    };

    await kv.set(`log:${logId}`, newLog);

    return c.json({ log: newLog });
  } catch (error: any) {
    console.error('Server error in /logs POST:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

// 获取月报统计接口
app.get("/make-server-e9f91fb9/monthly-report", async (c) => {
  const userId = c.req.query('userId');
  const year = parseInt(c.req.query('year') || new Date().getFullYear().toString());
  const month = parseInt(c.req.query('month') || (new Date().getMonth() + 1).toString()) - 1;
  
  const allLogsRaw = await kv.getByPrefix("log:");
  let allLogs = allLogsRaw.map(v => v.value);
  
  // 过滤用户
  if (userId) {
    allLogs = allLogs.filter(log => log.userId === userId);
  }
  
  // 过滤月份
  const filteredLogs = allLogs.filter(log => {
    const logDate = new Date(log.dateTime);
    return logDate.getFullYear() === year && logDate.getMonth() === month;
  });
  
  // 计算统计
  const totalLogs = filteredLogs.length;
  const totalDeliverables = filteredLogs.reduce((sum, log) => sum + (log.deliverables?.length || 0), 0);
  
  // 最活跃日期
  const dayCounts: { [key: string]: number } = {};
  filteredLogs.forEach(log => {
    const day = new Date(log.dateTime).getDate().toString();
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
  
  // 工作分类统计
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
  const categoryCounts: { [key: string]: number } = {};
  filteredLogs.forEach(log => {
    if (log.tags) {
      log.tags.forEach((tag: string) => {
        categoryCounts[tag] = (categoryCounts[tag] || 0) + 1;
      });
    }
  });
  const topCategories = Object.entries(categoryCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      count,
      color: categoryColors[name] || '#6b7280'
    }));
  
  // 每日活动
  const dailyActivity = [];
  for (let i = 1; i <= 31; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
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
      logs: filteredLogs
    }
  });
});

// 生成月报接口
app.post("/make-server-e9f91fb9/monthly-report/generate", async (c) => {
  const authHeader = c.req.header('Authorization');
  const userInfo = getUserFromToken(authHeader);
  if (!userInfo) return c.json({ error: 'Unauthorized' }, 401);
  
  const { userId, year, month } = await c.req.json();
  const targetUserId = userId || userInfo.userId;
  
  const reportId = crypto.randomUUID();
  const report = {
    id: reportId,
    userId: targetUserId,
    year: year || new Date().getFullYear(),
    month: month || new Date().getMonth() + 1,
    createdAt: new Date().toISOString(),
    status: 'generated'
  };
  
  await kv.set(`report:${reportId}`, report);
  
  return c.json({ report });
});

// 获取团队月报接口
app.get("/make-server-e9f91fb9/team-monthly-report", async (c) => {
  const year = parseInt(c.req.query('year') || new Date().getFullYear().toString());
  const month = parseInt(c.req.query('month') || (new Date().getMonth() + 1).toString()) - 1;
  
  const allLogsRaw = await kv.getByPrefix("log:");
  const allLogs = allLogsRaw.map(v => v.value);
  
  const emailToId: { [key: string]: string } = {
    'liushuo@itcast.cn': '1',
    'wangjing@itcast.cn': '2',
    'lifanghua@itcast.cn': '3',
    'loujianghua@itcast.cn': '4',
    'muhaotian@itcast.cn': '5',
    'wuxue1@itcast.cn': '6'
  };
  
  const teamReports = teamMembers.map(member => {
    const memberLogs = allLogs.filter(log => {
      const logUserId = emailToId[log.userEmail] || log.userId;
      if (logUserId !== member.id) return false;
      const logDate = new Date(log.dateTime);
      return logDate.getFullYear() === year && logDate.getMonth() === month;
    });
    
    return {
      ...member,
      totalLogs: memberLogs.length,
      totalDeliverables: memberLogs.reduce((sum, log) => sum + (log.deliverables?.length || 0), 0),
      logs: memberLogs
    };
  });
  
  return c.json({ teamReports });
});

// 导出月报接口
app.get("/make-server-e9f91fb9/monthly-report/export", async (c) => {
  return c.json({
    success: true,
    message: 'PDF export simulated',
    downloadUrl: 'https://example.com/report.pdf'
  });
});

// 获取团队成员列表
app.get("/make-server-e9f91fb9/team/members", (c) => {
  return c.json({ members: teamMembers });
});

Deno.serve(app.fetch);