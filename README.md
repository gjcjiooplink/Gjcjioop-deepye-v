# DeepyeVision 游戏智能助手官网

基于React + Node.js的现代化游戏辅助工具官网，展示DeepyeVision基于YOLO26的游戏画面辅助瞄准系统。

## 技术栈

- **前端**: React 18 + Vite + Framer Motion
- **后端**: Node.js + Express
- **样式**: CSS3 + CSS变量 + 响应式设计
- **动画**: Framer Motion 动画库

## 功能特性

- 🎯 **智能瞄准** - 基于YOLO26深度学习算法
- ⚡ **实时处理** - 毫秒级响应速度
- 🛡️ **安全可靠** - 先进的防检测技术
- 🎮 **多游戏支持** - 支持主流FPS游戏

## 项目结构

```
DeepyeWEB/
├── src/                    # React前端源码
│   ├── components/        # React组件
│   │   ├── Header.jsx     # 导航头部
│   │   ├── Hero.jsx       # 英雄区域
│   │   ├── Features.jsx   # 功能特性
│   │   ├── Technology.jsx # 技术亮点
│   │   └── Footer.jsx     # 页脚
│   ├── App.jsx           # 主应用组件
│   ├── main.jsx          # 入口文件
│   └── index.css         # 全局样式
├── server/               # Node.js后端
│   └── index.js         # Express服务器
├── package.json         # 项目配置
├── vite.config.js       # Vite配置
└── index.html          # HTML模板
```

## 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 开发模式运行

同时启动前端和后端：

```bash
npm run dev
```

或者分别启动：

```bash
# 启动后端服务器 (端口5000)
npm run server

# 启动前端开发服务器 (端口3000)
npm run client
```

### 3. 生产构建

```bash
npm run build
```

### 4. 预览生产版本

```bash
npm run preview
```

## 访问地址

- **前端**: http://localhost:3000
- **后端API**: http://localhost:5000/api

## API接口

- `GET /api/health` - 健康检查
- `GET /api/downloads` - 获取下载信息
- `POST /api/contact` - 提交联系信息
- `GET /api/statistics` - 获取统计数据

## 动画效果

项目使用了丰富的动画效果：

- 页面加载动画
- 滚动触发动画
- 悬停交互动画
- 视差滚动效果
- 渐变背景动画

## 响应式设计

- 移动端优先设计
- 平板和桌面端优化
- 灵活的网格布局
- 自适应字体大小

## 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 开发团队

DeepyeVision开发团队 - 致力于为游戏玩家提供最智能的辅助工具。