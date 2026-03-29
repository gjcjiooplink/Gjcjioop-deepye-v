import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}))

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../dist')))

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'DeepyeVision API is running',
    timestamp: new Date().toISOString()
  })
})

app.get('/api/downloads', (req, res) => {
  const downloads = [
    {
      id: 1,
      version: '1.0.0',
      platform: 'Windows',
      size: '45.2 MB',
      downloadUrl: '/downloads/deepyevision-setup.exe',
      releaseDate: '2024-01-15'
    },
    {
      id: 2,
      version: '1.0.0',
      platform: 'macOS',
      size: '52.1 MB',
      downloadUrl: '/downloads/deepyevision.dmg',
      releaseDate: '2024-01-15'
    }
  ]
  res.json(downloads)
})

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body
  
  if (!name || !email || !message) {
    return res.status(400).json({ 
      error: '所有字段都是必填的' 
    })
  }
  
  console.log('收到联系信息:', { name, email, message })
  
  res.json({ 
    success: true, 
    message: '消息已收到，我们会尽快回复您！' 
  })
})

app.get('/api/statistics', (req, res) => {
  const stats = {
    totalDownloads: 15420,
    activeUsers: 8923,
    accuracyRate: 98.7,
    responseTime: '15ms',
    supportedGames: 8
  }
  res.json(stats)
})

// 下载API接口
app.get('/api/download/file/:channel/:version', (req, res) => {
  const { channel, version } = req.params
  
  // 验证渠道和版本
  const validChannels = ['alpha', 'beta', 'dev']
  const validVersions = {
    alpha: ['1.8', '1.7', '1.6', '1.5', '1.4'],
    beta: ['1.9', '1.9.26', '2.0.1', '2.1', '2.1.3', '1.21', '0.465'],
    dev: ['D-EX', 'D-TEST', 'D-DEMO', 'D-DATABASE']
  }
  
  if (!validChannels.includes(channel)) {
    return res.status(400).json({ error: '无效的渠道' })
  }
  
  if (!validVersions[channel].includes(version)) {
    return res.status(400).json({ error: '无效的版本' })
  }
  
  // 构建文件路径
  const fileName = `DeepyeVision-${channel}-${version}.exe`
  const filePath = path.join(__dirname, '../res/appdata', fileName)
  
  // 检查文件是否存在
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ 
      error: '文件不存在',
      message: `文件 ${fileName} 未找到，请检查文件是否已上传到服务器`
    })
  }
  
  // 设置下载头信息
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`)
  res.setHeader('Content-Type', 'application/octet-stream')
  
  // 发送文件
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('文件下载错误:', err)
      // 如果文件已经开始发送，不能再次设置状态码
      if (!res.headersSent) {
        res.status(500).json({ error: '文件下载失败' })
      }
    }
  })
})

// 源代码下载API接口
app.get('/api/download/source/:fileId', (req, res) => {
  const { fileId } = req.params
  
  // 验证文件ID
  const validFileIds = ['1', '2', '3']
  if (!validFileIds.includes(fileId)) {
    return res.status(400).json({ error: '无效的文件ID' })
  }
  
  // 构建文件路径
  const fileName = `${fileId}.zip`
  const filePath = path.join(__dirname, '../res/ds', fileName)
  
  // 检查文件是否存在
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ 
      error: '文件不存在',
      message: `源代码文件 ${fileName} 未找到`
    })
  }
  
  // 设置下载头信息
  const versionNames = {
    '1': 'yolo26n Next',
    '2': 'yolov8 Community',
    '3': 'yolo-dev Community'
  }
  const displayName = `DeepyeVision-Source-${versionNames[fileId]}.zip`
  
  res.setHeader('Content-Disposition', `attachment; filename="${displayName}"`)
  res.setHeader('Content-Type', 'application/zip')
  
  // 发送文件
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('源代码下载错误:', err)
      // 如果文件已经开始发送，不能再次设置状态码
      if (!res.headersSent) {
        res.status(500).json({ error: '源代码下载失败' })
      }
    }
  })
})

// 依赖文件下载API接口
app.get('/api/download/dependency', async (req, res) => {
  // 分卷文件列表（包含主文件和所有分卷）
  const splitFiles = [
    '_internal.zipx',  // 主文件
    '_internal.zx01',  // 分卷文件1
    '_internal.zx02',  // 分卷文件2
    '_internal.zx03',  // 分卷文件3
    '_internal.zx04',  // 分卷文件4
    '_internal.zx05'   // 分卷文件5
  ]
  
  // 检查所有分卷文件是否存在
  const missingFiles = []
  const filePaths = []
  
  for (const fileName of splitFiles) {
    const filePath = path.join(__dirname, '../res/appdata', fileName)
    if (!fs.existsSync(filePath)) {
      missingFiles.push(fileName)
    } else {
      filePaths.push(filePath)
    }
  }
  
  if (missingFiles.length > 0) {
    return res.status(404).json({ 
      error: '分卷文件不完整',
      message: `缺少以下分卷文件: ${missingFiles.join(', ')}`
    })
  }
  
  // 设置下载头信息
  const downloadFileName = 'DeepyeVision-Dependencies.zip'
  res.setHeader('Content-Disposition', `attachment; filename="${downloadFileName}"`)
  res.setHeader('Content-Type', 'application/zip')
  
  // 创建临时ZIP文件包含所有分卷文件
  const archiver = (await import('archiver')).default
  const archive = archiver('zip', {
    zlib: { level: 9 } // 最高压缩级别
  })
  
  // 设置响应流
  archive.pipe(res)
  
  // 添加所有分卷文件到ZIP
  for (let i = 0; i < filePaths.length; i++) {
    const filePath = filePaths[i]
    const fileName = splitFiles[i]
    archive.file(filePath, { name: fileName })
  }
  
  // 完成归档
  archive.finalize()
  
  // 错误处理
  archive.on('error', (err) => {
    console.error('ZIP创建错误:', err)
    if (!res.headersSent) {
      res.status(500).json({ error: 'ZIP文件创建失败' })
    }
  })
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 DeepyeVision服务器运行在端口 ${PORT}`)
  console.log(`📊 API地址: http://localhost:${PORT}/api`)
  console.log(`🌐 前端地址: http://localhost:${PORT}`)
  console.log(`🌍 生产环境: 可通过 https://your-domain.com 访问`)
})

export default app