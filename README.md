# TraceFlow - 团队工作流与月报系统

> 帮助团队高效记录日常工作，自动汇总月度总结，让工作有迹可循、汇报有据可依。

---

## ✨ 功能特性

- 📝 **工作日志** - 结构化记录每日工作，支持工作事项、交付物、重点说明
- 📊 **工作看板** - 横向看板展示团队成员的工作动态
- 📈 **个人月报** - 自动汇总月度工作，生成统计分析
- 👥 **团队月报** - 查看团队整体工作情况
- 🔐 **用户认证** - 安全的登录注册系统

---

## 🚀 快速开始

### 前置要求
- Node.js 18+
- npm 或 pnpm

### 安装依赖
```bash
npm install
# 或
pnpm install
```

### 开发运行
```bash
npm run dev
```

### 生产构建
```bash
npm run build
```

### 预览构建
```bash
npm run preview
```

---

## 🏗️ 技术栈

| 技术 | 说明 |
|------|------|
| React 18 | 前端框架 |
| TypeScript | 类型安全 |
| Vite | 构建工具 |
| Shadcn UI | UI 组件库 |
| Tailwind CSS | CSS 框架 |
| Hono | 后端框架 |
| Supabase | BaaS 平台（Auth + KV + Functions） |

---

## 📁 项目结构

```
TraceFlow/
├── src/                          # 前端源码
│   ├── app/
│   │   ├── components/
│   │   │   ├── ui/              # Shadcn UI 组件
│   │   │   ├── WorkLogBoard.tsx # 工作日志看板
│   │   │   ├── CreateWorkLog.tsx # 撰写日志
│   │   │   ├── MonthlyReport.tsx # 个人月报
│   │   │   ├── TeamMonthlyReport.tsx # 团队月报
│   │   │   ├── Login.tsx        # 登录页
│   │   │   └── ...
│   │   └── App.tsx              # 根组件（路由）
│   ├── styles/                  # 全局样式
│   └── main.tsx                 # 应用入口
├── supabase/
│   └── functions/server/        # 后端服务
│       ├── index.tsx            # API 路由
│       └── kv_store.tsx         # KV 存储封装
├── Technical Documentation/     # 完整文档
│   ├── README.md                # 文档总览
│   ├── PRD-产品需求文档.md
│   ├── 技术架构文档.md
│   ├── API接口文档.md
│   ├── 测试文档.md
│   ├── 产品经理工作清单.md
│   └── 工作日志转月报系统技术方案.md
└── package.json
```

---

## 📖 完整文档

详细文档请查看 [Technical Documentation/README.md](./Technical%20Documentation/README.md)

| 文档类型 | 文档 |
|---------|------|
| 📦 产品 | [PRD-产品需求文档.md](./Technical%20Documentation/PRD-产品需求文档.md) |
| 🔧 技术 | [技术架构文档.md](./Technical%20Documentation/技术架构文档.md) |
| 🔌 接口 | [API接口文档.md](./Technical%20Documentation/API接口文档.md) |
| 🧪 测试 | [测试文档.md](./Technical%20Documentation/测试文档.md) |
| 📋 任务 | [产品经理工作清单.md](./Technical%20Documentation/产品经理工作清单.md) |

---

## 👥 团队成员

| 姓名 | 角色 | 邮箱 |
|------|------|------|
| 刘硕 | 产品经理 | liushuo@itcast.cn |
| 王静 | 设计师 | wangjing@itcast.cn |
| 李方华 | 设计师 | lifanghua@itcast.cn |
| 娄江华 | 前端开发工程师 | loujianghua@itcast.cn |
| 牟浩天 | 后端开发工程师 | muhaotian@itcast.cn |
| 吴雪 | 项目部主管 | wuxue1@itcast.cn |

---

## 🎯 版本信息

**当前版本：v1.0**

### v1.0 已完成
- ✅ 用户登录与注册
- ✅ 工作日志看板
- ✅ 撰写工作日志
- ✅ 个人月报
- ✅ 团队月报

### 规划中
- 🔄 日志编辑功能
- 🔄 月报导出（PDF/Markdown）
- 🔄 AI 自动生成月报（v2.0）
- 🔄 团队协作增强

---

## 📝 许可证

本项目为内部团队使用项目。

---

**最后更新：2026-04-23**
