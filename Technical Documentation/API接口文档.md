# TraceFlow 项目接口文档

## 一、项目概述

- **项目名称**: TraceFlow
- **项目 ID**: tmbyszphakxdifombuin
- **基础 URL**: `https://tmbyszphakxdifombuin.supabase.co`
- **API 前缀**: `/functions/v1/make-server-e9f91fb9`
- **最后更新**: 2026-04-23

---

## 二、项目页面/路由清单

| 路由路径 | 页面组件 | 功能描述 |
|---------|---------|---------|
| `/login` | Login.tsx | 用户登录/注册页面 |
| `/` | WorkLogBoard.tsx | 工作日志看板（首页） |
| `/create` | CreateWorkLog.tsx | 撰写工作日志 |
| `/monthly-report` | MonthlyReport.tsx | 个人月报统计页面 |
| `/monthly-report/view` | MonthlyReportView.tsx | 月报详细查看页面 |
| `/team-monthly-report` | TeamMonthlyReport.tsx | 团队月报看板 |

---

## 三、已实现的接口

### 3.1 健康检查接口

| 属性 | 值 |
|-----|-----|
| **方法** | GET |
| **路径** | `/make-server-e9f91fb9/health` |
| **认证** | 无需认证 |
| **功能** | 检查服务器运行状态 |

**请求示例**:
```bash
curl -X GET https://tmbyszphakxdifombuin.supabase.co/functions/v1/make-server-e9f91fb9/health
```

**响应示例**:
```json
{
  "status": "ok"
}
```

---

### 3.2 用户注册接口

| 属性 | 值 |
|-----|-----|
| **方法** | POST |
| **路径** | `/make-server-e9f91fb9/signup` |
| **认证** | 无需认证（使用服务角色密钥） |
| **功能** | 创建新用户并自动确认邮箱 |

**请求参数**:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "用户名"
}
```

| 参数 | 类型 | 必填 | 说明 |
|-----|------|------|------|
| email | string | 是 | 用户邮箱地址 |
| password | string | 是 | 密码（至少6位） |
| name | string | 是 | 用户姓名 |

**响应示例 - 成功**:
```json
{
  "user": {
    "id": "uuid-xxx",
    "email": "user@example.com",
    "user_metadata": {
      "name": "用户名"
    }
  }
}
```

**响应示例 - 失败**:
```json
{
  "error": "错误信息"
}
```

**前端调用位置**: `src/app/components/Login.tsx:53-60`

---

### 3.3 获取所有日志接口

| 属性 | 值 |
|-----|-----|
| **方法** | GET |
| **路径** | `/make-server-e9f91fb9/logs` |
| **认证** | 需要 Authorization header |
| **功能** | 获取所有工作日志（支持用户和日期过滤） |

**请求参数（Query）**:

| 参数 | 类型 | 必填 | 说明 |
|-----|------|------|------|
| userId | string | 否 | 用户 ID 过滤 |
| startDate | string | 否 | 开始日期（YYYY-MM-DD 格式） |
| endDate | string | 否 | 结束日期（YYYY-MM-DD 格式） |

**请求示例**:
```bash
# 获取所有日志
curl -X GET https://tmbyszphakxdifombuin.supabase.co/functions/v1/make-server-e9f91fb9/logs \
  -H "Authorization: Bearer {publicAnonKey}"

# 获取特定用户的日志
curl -X GET "https://tmbyszphakxdifombuin.supabase.co/functions/v1/make-server-e9f91fb9/logs?userId=user123" \
  -H "Authorization: Bearer {publicAnonKey}"

# 获取特定日期范围的日志
curl -X GET "https://tmbyszphakxdifombuin.supabase.co/functions/v1/make-server-e9f91fb9/logs?startDate=2026-04-01&endDate=2026-04-30" \
  -H "Authorization: Bearer {publicAnonKey}"
```

**响应示例**:
```json
{
  "logs": [
    {
      "id": "log-uuid-xxx",
      "userId": "user-uuid",
      "userName": "用户名",
      "userEmail": "user@example.com",
      "dateTime": "2026-04-22T16:30:00Z",
      "tags": ["功能开发", "React"],
      "content": "工作内容描述",
      "deliverables": [
        { "type": "CODE", "name": "文件.tsx", "url": "https://..." }
      ]
    }
  ]
}
```

**前端调用位置**:
- `src/app/components/WorkLogBoard.tsx:80-96`
- `src/app/components/MonthlyReport.tsx:53-72`

---

### 3.4 创建日志接口

| 属性 | 值 |
|-----|-----|
| **方法** | POST |
| **路径** | `/make-server-e9f91fb9/logs` |
| **认证** | 需要用户 JWT token |
| **功能** | 创建新的工作日志 |

**请求头**:
```
Authorization: Bearer {user_jwt_token}
Content-Type: application/json
```

**请求参数**:
```json
{
  "date": "2026-04-22",
  "workItems": [
    {
      "category": "功能开发",
      "description": "<p>富文本内容</p>",
      "files": [
        { "name": "文件.pdf", "type": "application/pdf", "size": 1024, "url": "https://..." }
      ]
    }
  ],
  "notes": "重点说明"
}
```

| 字段 | 类型 | 必填 | 说明 |
|-----|------|------|------|
| date | string | 是 | 日期（YYYY-MM-DD 格式） |
| workItems | array | 是 | 工作事项列表 |
| workItems[].category | string | 是 | 事项分类 |
| workItems[].description | string | 是 | 事项描述（HTML 格式） |
| workItems[].files | array | 否 | 关联文件列表 |
| notes | string | 否 | 重点说明 |

**响应示例 - 成功**:
```json
{
  "log": {
    "id": "new-log-uuid",
    "userId": "user-uuid",
    "userName": "用户名",
    "userEmail": "user@example.com",
    "dateTime": "2026-04-22T16:30:00Z",
    ...
  }
}
```

**前端调用位置**: `src/app/components/CreateWorkLog.tsx:324-347`

---

### 3.5 获取月报统计接口

| 属性 | 值 |
|-----|-----|
| **方法** | GET |
| **路径** | `/make-server-e9f91fb9/monthly-report` |
| **认证** | 需要 Authorization header |
| **功能** | 获取指定月份的月报统计数据 |

**请求参数（Query）**:

| 参数 | 类型 | 必填 | 说明 |
|-----|------|------|------|
| userId | string | 否 | 用户 ID（不传则获取所有用户） |
| year | number | 否 | 年份（默认当前年份） |
| month | number | 否 | 月份（1-12，默认当前月份） |

**请求示例**:
```bash
curl -X GET "https://tmbyszphakxdifombuin.supabase.co/functions/v1/make-server-e9f91fb9/monthly-report?userId=user123&year=2026&month=4" \
  -H "Authorization: Bearer {publicAnonKey}"
```

**响应示例**:
```json
{
  "stats": {
    "totalLogs": 12,
    "totalDeliverables": 8,
    "mostActiveDay": "15",
    "topCategories": [
      { "name": "功能开发", "count": 5, "color": "#10b981" },
      { "name": "Bug修复", "count": 3, "color": "#f59e0b" }
    ],
    "dailyActivity": [
      { "date": "2026-04-01", "count": 1 },
      { "date": "2026-04-02", "count": 0 }
    ],
    "logs": [
      {
        "id": "log-uuid-xxx",
        "dateTime": "2026-04-15T16:30:00Z",
        "tags": ["功能开发"],
        "content": "工作内容",
        "deliverables": []
      }
    ]
  }
}
```

**前端调用位置**: `src/app/components/MonthlyReport.tsx:53-72`

---

### 3.6 生成月报接口

| 属性 | 值 |
|-----|-----|
| **方法** | POST |
| **路径** | `/make-server-e9f91fb9/monthly-report/generate` |
| **认证** | 需要用户 JWT token |
| **功能** | 生成指定月份的月报 |

**请求头**:
```
Authorization: Bearer {user_jwt_token}
Content-Type: application/json
```

**请求参数**:
```json
{
  "userId": "user-uuid",
  "year": 2026,
  "month": 4
}
```

| 字段 | 类型 | 必填 | 说明 |
|-----|------|------|------|
| userId | string | 否 | 用户 ID（默认当前用户） |
| year | number | 否 | 年份（默认当前年份） |
| month | number | 否 | 月份（默认当前月份） |

**响应示例 - 成功**:
```json
{
  "report": {
    "id": "report-uuid",
    "userId": "user-uuid",
    "year": 2026,
    "month": 4,
    "createdAt": "2026-04-23T16:30:00Z",
    "status": "generated"
  }
}
```

---

### 3.7 获取团队月报接口

| 属性 | 值 |
|-----|-----|
| **方法** | GET |
| **路径** | `/make-server-e9f91fb9/team-monthly-report` |
| **认证** | 需要 Authorization header |
| **功能** | 获取团队成员的月报数据 |

**请求参数（Query）**:

| 参数 | 类型 | 必填 | 说明 |
|-----|------|------|------|
| year | number | 否 | 年份（默认当前年份） |
| month | number | 否 | 月份（1-12，默认当前月份） |

**请求示例**:
```bash
curl -X GET "https://tmbyszphakxdifombuin.supabase.co/functions/v1/make-server-e9f91fb9/team-monthly-report?year=2026&month=4" \
  -H "Authorization: Bearer {publicAnonKey}"
```

**响应示例**:
```json
{
  "teamReports": [
    {
      "id": "1",
      "name": "刘硕",
      "role": "产品经理",
      "email": "liushuo@itcast.cn",
      "totalLogs": 12,
      "totalDeliverables": 8,
      "logs": []
    }
  ]
}
```

**前端调用位置**: `src/app/components/TeamMonthlyReport.tsx:61-80`

---

### 3.8 导出月报接口

| 属性 | 值 |
|-----|-----|
| **方法** | GET |
| **路径** | `/make-server-e9f91fb9/monthly-report/export` |
| **认证** | 需要 Authorization header |
| **功能** | 导出月报 PDF（模拟实现） |

**请求示例**:
```bash
curl -X GET "https://tmbyszphakxdifombuin.supabase.co/functions/v1/make-server-e9f91fb9/monthly-report/export" \
  -H "Authorization: Bearer {publicAnonKey}"
```

**响应示例**:
```json
{
  "success": true,
  "message": "PDF export simulated",
  "downloadUrl": "https://example.com/report.pdf"
}
```

**前端调用位置**:
- `src/app/components/MonthlyReport.tsx:83-117`
- `src/app/components/TeamMonthlyReport.tsx:83-146`

---

### 3.9 获取团队成员接口

| 属性 | 值 |
|-----|-----|
| **方法** | GET |
| **路径** | `/make-server-e9f91fb9/team/members` |
| **认证** | 无需认证 |
| **功能** | 获取团队成员列表 |

**响应示例**:
```json
{
  "members": [
    { "id": "1", "name": "刘硕", "role": "产品经理", "email": "liushuo@itcast.cn" },
    { "id": "2", "name": "王静", "role": "设计师", "email": "wangjing@itcast.cn" },
    { "id": "3", "name": "李方华", "role": "设计师", "email": "lifanghua@itcast.cn" },
    { "id": "4", "name": "娄江华", "role": "前端开发工程师", "email": "loujianghua@itcast.cn" },
    { "id": "5", "name": "牟浩天", "role": "后端开发工程师", "email": "muhaotian@itcast.cn" },
    { "id": "6", "name": "吴雪", "role": "项目部主管", "email": "wuxue1@itcast.cn" }
  ]
}
```

---

## 四、团队成员列表

团队成员信息在前端写死配置，无需API获取：

| ID | 姓名 | 职位 | 邮箱 |
|----|------|------|------|
| 1 | 刘硕 | 产品经理 | liushuo@itcast.cn |
| 2 | 王静 | 设计师 | wangjing@itcast.cn |
| 3 | 李方华 | 设计师 | lifanghua@itcast.cn |
| 4 | 娄江华 | 前端开发工程师 | loujianghua@itcast.cn |
| 5 | 牟浩天 | 后端开发工程师 | muhaotian@itcast.cn |
| 6 | 吴雪 | 项目部主管 | wuxue1@itcast.cn |

---

## 五、数据存储

### 5.1 KV 存储表

**表名**: `kv_store_e9f91fb9`

**结构**:
```sql
CREATE TABLE kv_store_e9f91fb9 (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);
```

### 5.2 KV 存储接口

| 方法 | 函数 | 说明 |
|-----|------|------|
| 设置 | `kv.set(key, value)` | 存储键值对 |
| 获取 | `kv.get(key)` | 获取键值对 |
| 删除 | `kv.del(key)` | 删除键值对 |
| 批量设置 | `kv.mset(keys, values)` | 批量存储 |
| 批量获取 | `kv.mget(keys)` | 批量获取 |
| 批量删除 | `kv.mdel(keys)` | 批量删除 |
| 前缀查询 | `kv.getByPrefix(prefix)` | 按前缀查询 |

### 5.3 数据 Key 命名规范

| 数据类型 | Key 格式 | 示例 |
|---------|---------|------|
| 工作日志 | `log:{uuid}` | `log:550e8400-e29b-41d4-a716-446655440000` |
| 月报 | `report:{uuid}` | `report:550e8400-e29b-41d4-a716-446655440000` |

---

## 六、接口调用示例

### 6.1 使用 JavaScript/Fetch 调用

```javascript
const PROJECT_ID = 'tmbyszphakxdifombuin';
const PUBLIC_ANON_KEY = 'your-anon-key';

const baseUrl = `https://${PROJECT_ID}.supabase.co/functions/v1/make-server-e9f91fb9`;

// 获取所有日志
async function fetchLogs() {
  const res = await fetch(`${baseUrl}/logs`, {
    headers: {
      'Authorization': `Bearer ${PUBLIC_ANON_KEY}`
    }
  });
  return res.json();
}

// 获取用户日志
async function fetchUserLogs(userId) {
  const res = await fetch(`${baseUrl}/logs?userId=${userId}`, {
    headers: {
      'Authorization': `Bearer ${PUBLIC_ANON_KEY}`
    }
  });
  return res.json();
}

// 获取月报统计
async function fetchMonthlyReport(userId, year, month) {
  const res = await fetch(`${baseUrl}/monthly-report?userId=${userId}&year=${year}&month=${month}`, {
    headers: {
      'Authorization': `Bearer ${PUBLIC_ANON_KEY}`
    }
  });
  return res.json();
}

// 创建日志
async function createLog(logData, userToken) {
  const res = await fetch(`${baseUrl}/logs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    },
    body: JSON.stringify(logData)
  });
  return res.json();
}
```

### 6.2 使用 Supabase 客户端

```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://tmbyszphakxdifombuin.supabase.co',
  'your-anon-key'
);

// 用户登录
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
});

// 获取当前会话
const { data: { session } } = await supabase.auth.getSession();
```

---

## 七、错误码说明

| HTTP 状态码 | 说明 |
|------------|------|
| 200 | 请求成功 |
| 400 | 请求参数错误 |
| 401 | 未授权（缺少或无效的认证信息） |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

---

## 八、接口文档变更记录

| 日期 | 版本 | 变更内容 | 作者 |
|-----|------|---------|------|
| 2026-04-23 | v1.0 | 初始文档创建 | AI Assistant |
| 2026-04-23 | v1.1 | 更新团队成员配置为写死方式，移除团队成员API需求 | AI Assistant |
| 2026-04-23 | v2.0 | 添加所有缺失接口实现文档：日志过滤、月报统计、团队月报、PDF导出等 | AI Assistant |