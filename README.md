# AI提效问卷系统（前台 + 管理后台 + 后端）

本仓库包含三部分：

- `survey-frontend/`：用户填写的 20 题诊断问卷（Vite + React）
- `survey-admin/`：管理后台（查看用户与诊断结果）（Vite + React）
- `survey-backend/`：后端接口与 SQLite 数据库（Express + sqlite3）

## 目录结构

```
survey-system/
  survey-frontend/   # 问卷前台
  survey-admin/      # 管理后台
  survey-backend/    # 后端 API + SQLite
```

## 本地运行

### 1) 启动后端（必选）

后端默认端口：`3000`

```bash
cd ai-efficiency-map/survey-system/survey-backend
npm i
node server.ts
```

数据库文件：`survey-backend/survey.db`（本地使用，不建议提交到 GitHub）

### 2) 启动问卷前台

前台默认端口：Vite 自动分配（常见为 `5173`）

```bash
cd ai-efficiency-map/survey-system/survey-frontend
npm i
npm run dev
```

### 3) 启动管理后台

管理后台默认端口：Vite 自动分配（常见为 `5174`）

```bash
cd ai-efficiency-map/survey-system/survey-admin
npm i
npm run dev
```

## 常见问题

### 为什么“数据看起来没了”？

请先确认后端 `http://localhost:3000` 是否在运行。管理后台与前台提交都依赖后端。

### SQLite 数据库路径

后端使用固定路径 `survey-backend/survey.db`（基于 `__dirname`），避免因启动目录不同导致读到空库。

