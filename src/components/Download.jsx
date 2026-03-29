import React, { useState } from 'react'
import { motion } from 'framer-motion'
import BackgroundEffect from './BackgroundEffect'
import './Download.css'

const Download = () => {
  // 下载方式选项
  const downloadMethods = [
    { id: 'server', name: '服务器直连', icon: '⚡' },
    { id: 'source', name: '源代码', icon: '📦' }
  ]

  // 渠道选项
  const channels = [
    { 
      id: 'alpha', 
      name: 'Alpha', 
      description: '较稳定版本，比较好的开发版本',
      versions: ['1.8', '1.7', '1.6', '1.5', '1.4']
    },
    { 
      id: 'beta', 
      name: 'Beta', 
      description: '抢先体验版本，需要安全审查',
      versions: ['1.9', '1.9.26', '2.0.1', '2.1', '2.1.3', '1.21', '0.465']
    },
    { 
      id: 'dev', 
      name: 'Dev', 
      description: '开发版本，仅供Gjcjioop员工使用',
      versions: ['D-EX', 'D-TEST', 'D-DEMO', 'D-DATABASE']
    }
  ]

  // 状态管理
  const [selectedMethod, setSelectedMethod] = useState('server')
  const [selectedChannel, setSelectedChannel] = useState('alpha')
  const [selectedVersion, setSelectedVersion] = useState('1.8')
  const [sourcePlatform, setSourcePlatform] = useState('github')
  const [sourceVersion, setSourceVersion] = useState('yolo26n-next')
  const [showSecurityModal, setShowSecurityModal] = useState(false)
  const [skCode, setSkCode] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // 获取当前渠道的版本列表
  const currentChannel = channels.find(channel => channel.id === selectedChannel)
  const currentVersions = currentChannel ? currentChannel.versions : []

  // 文件路径映射
  const getDownloadPath = () => {
    // 根据环境确定API基础路径
    const isDevelopment = process.env.NODE_ENV === 'development'
    const apiBaseUrl = isDevelopment ? 'http://localhost:5000' : ''
    
    if (selectedMethod === 'source') {
      // 源代码下载路径
      const versionMap = {
        'yolo26n-next': '1',
        'yolov8-community': '2', 
        'yolo-dev-community': '3'
      }
      const fileNumber = versionMap[sourceVersion] || '1'
      return `${apiBaseUrl}/api/download/source/${fileNumber}`
    }
    
    // 可执行文件下载路径 - 使用新的命名规范
    const fileName = `DeepyeVision-${selectedChannel}-${selectedVersion}.exe`
    return `${apiBaseUrl}/api/download/file/${selectedChannel}/${selectedVersion}`
  }

  // 处理下载
  const handleDownload = () => {
    // 检查是否选择了Dev版本
    if (selectedChannel === 'dev') {
      alert('您的设备不支持 WokerST Gjcjioop员工域！\n\nDev版本仅供Gjcjioop内部员工使用，请选择Alpha版本。')
      return
    }
    
    // 检查是否选择了Beta版本且未通过安全审查
    if (selectedChannel === 'beta' && !isAuthenticated) {
      setShowSecurityModal(true)
      return
    }
    
    const downloadUrl = getDownloadPath()
    
    // 生成下载文件名
    let downloadFilename = ''
    if (selectedMethod === 'source') {
      const versionNameMap = {
        'yolo26n-next': 'yolo26n Next',
        'yolov8-community': 'yolov8 Community',
        'yolo-dev-community': 'yolo-dev Community'
      }
      downloadFilename = `DeepyeVision-Source-${versionNameMap[sourceVersion] || 'yolo26n Next'}.zip`
    } else {
      // 使用新的命名规范
      downloadFilename = `DeepyeVision-${selectedChannel}-${selectedVersion}.exe`
    }
    
    // 创建临时链接进行下载（最简单的下载方式）
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = downloadFilename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // 处理依赖下载
  const handleDependencyDownload = () => {
    // 根据环境确定API基础路径
    const isDevelopment = process.env.NODE_ENV === 'development'
    const apiBaseUrl = isDevelopment ? 'http://localhost:5000' : ''
    
    const downloadUrl = `${apiBaseUrl}/api/download/dependency`
    const downloadFilename = 'DeepyeVision-Dependencies.zip'
    
    // 创建临时链接进行下载
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = downloadFilename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // 处理SK代码验证
  const handleSecurityCheck = () => {
    // 这里可以设置实际的SK代码验证逻辑
    const validSkCodes = ['GJCJIOOP2024', 'BETAACCESS', 'SECURE123']
    
    if (validSkCodes.includes(skCode.toUpperCase())) {
      setIsAuthenticated(true)
      setShowSecurityModal(false)
      setSkCode('')
      // 自动开始下载
      setTimeout(() => {
        const downloadUrl = getDownloadPath()
        const downloadFilename = `DeepyeVision-${selectedChannel}-${selectedVersion}${selectedMethod === 'server' ? '.exe' : '.bat'}`
        
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = downloadFilename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }, 500)
    } else {
      alert('SK代码验证失败！请检查代码是否正确。')
      setSkCode('')
    }
  }

  return (
    <section className="download">
      <BackgroundEffect type="particles" color="#22c55e" intensity={0.08} />
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>下载 DeepyeVision</h1>
          <p>选择适合您的下载方式和版本</p>
        </motion.div>

        {/* 下载方式选择 */}
        <motion.div
          className="download-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2>选择下载方式</h2>
          <div className="method-grid">
            {downloadMethods.map((method) => (
              <div
                key={method.id}
                className={`method-card ${selectedMethod === method.id ? 'active' : ''}`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="method-icon">{method.icon}</div>
                <h3>{method.name}</h3>
                {method.id === 'server' && <p>直接从服务器下载，速度最快</p>}
                {method.id === 'source' && <p>下载源代码，适合开发者使用。包含完整的项目结构、文档和构建脚本</p>}
              </div>
            ))}
          </div>
        </motion.div>

        {/* 源代码平台选择 */}
        {selectedMethod === 'source' && (
          <motion.div
            className="download-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2>选择源代码平台</h2>
            <div className="platform-grid">
              <div
                className={`platform-card ${sourcePlatform === 'github' ? 'active' : ''}`}
                onClick={() => setSourcePlatform('github')}
              >
                <div className="platform-icon">🐙</div>
                <h3>GitHub</h3>
                <p>从GitHub仓库下载源代码</p>
              </div>
              <div
                className={`platform-card ${sourcePlatform === 'gitlab' ? 'active' : ''}`}
                onClick={() => setSourcePlatform('gitlab')}
              >
                <div className="platform-icon">🦊</div>
                <h3>GitLab</h3>
                <p>从GitLab仓库下载源代码</p>
              </div>
              <div
                className={`platform-card ${sourcePlatform === 'direct' ? 'active' : ''}`}
                onClick={() => setSourcePlatform('direct')}
              >
                <div className="platform-icon">⚡</div>
                <h3>直连下载</h3>
                <p>直接从服务器下载源代码压缩包</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 源代码版本选择 */}
        {selectedMethod === 'source' && (
          <motion.div
            className="download-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2>选择源代码版本</h2>
            <div className="source-version-grid">
              <div
                className={`source-version-card ${sourceVersion === 'yolo26n-next' ? 'active' : ''}`}
                onClick={() => setSourceVersion('yolo26n-next')}
              >
                <h3>yolo26n Next</h3>
                <p>最新的YOLO26版本，包含最新功能</p>
              </div>
              <div
                className={`source-version-card ${sourceVersion === 'yolov8-community' ? 'active' : ''}`}
                onClick={() => setSourceVersion('yolov8-community')}
              >
                <h3>yolov8 Community</h3>
                <p>社区维护的YOLOv8版本，稳定可靠</p>
              </div>
              <div
                className={`source-version-card ${sourceVersion === 'yolo-dev-community' ? 'active' : ''}`}
                onClick={() => setSourceVersion('yolo-dev-community')}
              >
                <h3>yolo-dev Community</h3>
                <p>开发社区版本，包含实验性功能</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 渠道选择 - 仅在非源代码模式下显示 */}
        {selectedMethod !== 'source' && (
          <motion.div
            className="download-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2>选择渠道</h2>
            <div className="channel-grid">
              {channels.map((channel) => (
                <div
                key={channel.id}
                className={`channel-card ${selectedChannel === channel.id ? 'active' : ''} ${channel.id === 'dev' ? 'dev-channel' : ''} ${channel.id === 'beta' ? 'beta-channel' : ''}`}
                onClick={() => {
                  setSelectedChannel(channel.id)
                  setSelectedVersion(channel.versions[0])
                }}
              >
                <h3>{channel.name}</h3>
                <p>{channel.description}</p>
                {channel.id === 'dev' && <div className="dev-warning">仅限员工使用</div>}
                {channel.id === 'beta' && <div className="beta-warning">需要安全审查</div>}
              </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 版本选择 - 仅在非源代码模式下显示 */}
        {selectedMethod !== 'source' && (
          <motion.div
            className="download-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2>选择版本</h2>
            <div className="version-grid">
              {currentVersions.map((version) => (
                <div
                  key={version}
                  className={`version-card ${selectedVersion === version ? 'active' : ''}`}
                  onClick={() => setSelectedVersion(version)}
                >
                  <span>{version}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 下载信息显示和下载按钮 */}
        <motion.div
          className="download-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="selected-info">
            <h3>下载信息</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">下载方式:</span>
                <span className="value">{downloadMethods.find(m => m.id === selectedMethod)?.name}</span>
              </div>
              {selectedMethod === 'source' ? (
                <>
                  <div className="info-item">
                    <span className="label">平台:</span>
                    <span className="value">
                      {sourcePlatform === 'github' ? 'GitHub' : 
                       sourcePlatform === 'gitlab' ? 'GitLab' : '直连下载'}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">版本:</span>
                    <span className="value">
                      {sourceVersion === 'yolo26n-next' ? 'yolo26n Next' :
                       sourceVersion === 'yolov8-community' ? 'yolov8 Community' :
                       'yolo-dev Community'}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">文件类型:</span>
                    <span className="value">.zip</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="info-item">
                    <span className="label">渠道:</span>
                    <span className="value">{currentChannel?.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">版本:</span>
                    <span className="value">{selectedVersion}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">文件类型:</span>
                    <span className="value">{selectedMethod === 'server' ? '.exe' : '.bat'}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="download-buttons">
            <button 
              className="download-btn"
              onClick={handleDownload}
            >
              <span className="btn-icon">⬇️</span>
              立即下载
            </button>
            
            <button 
              className="dependency-btn"
              onClick={handleDependencyDownload}
            >
              <span className="btn-icon">📦</span>
              下载依赖
            </button>
          </div>
        </motion.div>
      </div>

      {/* 安全审查模态窗口 */}
      {showSecurityModal && (
        <motion.div
          className="security-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowSecurityModal(false)}
        >
          <motion.div
            className="security-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Gjcjioop安全域审查</h3>
              <button 
                className="close-btn"
                onClick={() => setShowSecurityModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <div className="security-icon">🔒</div>
              <p className="security-description">
                Beta版本需要经过Gjcjioop安全域审查后才能使用。
                请输入SK代码以继续下载。
              </p>
              
              <div className="input-group">
                <label htmlFor="sk-code">SK代码：</label>
                <input
                  id="sk-code"
                  type="text"
                  value={skCode}
                  onChange={(e) => setSkCode(e.target.value)}
                  placeholder="请输入SK代码"
                  className="sk-input"
                  onKeyPress={(e) => e.key === 'Enter' && handleSecurityCheck()}
                />
              </div>
              
              <div className="modal-buttons">
                <button 
                  className="btn-cancel"
                  onClick={() => setShowSecurityModal(false)}
                >
                  取消
                </button>
                <button 
                  className="btn-confirm"
                  onClick={handleSecurityCheck}
                >
                  验证并下载
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default Download