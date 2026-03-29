# DeepyeVision 生产环境部署指南

## 快速部署

### 1. 构建生产版本
```bash
npm run build:prod
```

### 2. 启动生产服务器
```bash
npm start
```

### 3. 一键部署（构建 + 启动）
```bash
npm run serve
```

## 服务器配置

### 端口设置
- 默认端口：5000
- 可通过环境变量 `PORT` 修改
- 服务器监听所有网络接口（0.0.0.0）

### 环境变量
创建 `.env.production` 文件：
```bash
# 生产环境配置
NODE_ENV=production
PORT=5000
VITE_API_URL=/api
VITE_BASE_URL=/
```

## HTTPS 配置

### 使用反向代理（推荐）
使用 Nginx 或 Apache 作为反向代理：

#### Nginx 配置示例
```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 直接使用 HTTPS
如果需要直接在 Node.js 中启用 HTTPS：

```javascript
import https from 'https';
import fs from 'fs';

const options = {
    key: fs.readFileSync('/path/to/private-key.pem'),
    cert: fs.readFileSync('/path/to/certificate.pem')
};

https.createServer(options, app).listen(PORT, '0.0.0.0');
```

## 部署到云平台

### Vercel 部署
1. 安装 Vercel CLI: `npm i -g vercel`
2. 运行: `vercel --prod`

### Netlify 部署
1. 构建命令: `npm run build:prod`
2. 发布目录: `dist`

### Docker 部署
创建 `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build:prod
EXPOSE 5000
CMD ["npm", "start"]
```

构建并运行：
```bash
docker build -t deepyevision .
docker run -p 5000:5000 deepyevision
```

## 性能优化

### 静态资源缓存
- 启用 Gzip 压缩
- 设置适当的缓存头
- 使用 CDN 加速

### 安全配置
- 启用 Helmet 安全头
- 配置 CORS
- 设置速率限制

## 监控和维护

### 健康检查
访问 `/api/health` 端点检查服务状态

### 日志管理
- 生产环境启用日志记录
- 使用 PM2 进行进程管理

## 故障排除

### 常见问题
1. **端口占用**: 修改 PORT 环境变量
2. **文件权限**: 确保服务器有文件读取权限
3. **内存不足**: 增加服务器内存或使用集群

### 日志查看
```bash
# 查看应用日志
tail -f /var/log/deepyevision.log

# 查看系统日志
journalctl -u deepyevision
```

## 更新部署

### 版本更新流程
1. 拉取最新代码
2. 运行 `npm run build:prod`
3. 重启服务: `npm start`

### 零停机部署
使用 PM2 实现零停机部署：
```bash
pm2 start server/index.js --name deepyevision
pm2 reload deepyevision
```