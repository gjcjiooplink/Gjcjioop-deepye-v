import React from 'react'
import { motion } from 'framer-motion'
import './Footer.css'

const Footer = () => {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="footer-background">
        <div className="footer-particles">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="footer-particle"
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container">
        <div className="footer-content">
          <motion.div
            className="footer-brand"
            whileHover={{ scale: 1.02 }}
          >
            <h3>DeepyeVision</h3>
            <p>由GjcjioopOrg开发</p>
            <p className="website-link">
              <a href="http://www.gjcjioop.com" target="_blank" rel="noopener noreferrer">
                www.gjcjioop.com
              </a>
            </p>
            <p className="brand-description">
              致力于为游戏玩家提供最智能的辅助工具，
              基于前沿AI技术打造革命性的游戏体验。
            </p>
          </motion.div>
          
          <div className="footer-links">
            <div className="link-group">
              <h4>产品特性</h4>
              <motion.a href="#features" whileHover={{ x: 5 }}>智能瞄准系统</motion.a>
              <motion.a href="#features" whileHover={{ x: 5 }}>实时处理引擎</motion.a>
              <motion.a href="#features" whileHover={{ x: 5 }}>安全防护机制</motion.a>
              <motion.a href="#features" whileHover={{ x: 5 }}>多游戏兼容</motion.a>
            </div>
            
            <div className="link-group">
              <h4>技术支持</h4>
              <motion.a href="#" whileHover={{ x: 5 }}>使用教程</motion.a>
              <motion.a href="#" whileHover={{ x: 5 }}>常见问题</motion.a>
              <motion.a href="#" whileHover={{ x: 5 }}>更新日志</motion.a>
              <motion.a href="#" whileHover={{ x: 5 }}>API文档</motion.a>
            </div>
            
            <div className="link-group">
              <h4>关于我们</h4>
              <motion.a href="#" whileHover={{ x: 5 }}>开发团队</motion.a>
              <motion.a href="#" whileHover={{ x: 5 }}>技术博客</motion.a>
              <motion.a href="#" whileHover={{ x: 5 }}>加入我们</motion.a>
              <motion.a href="#" whileHover={{ x: 5 }}>合作伙伴</motion.a>
            </div>
          </div>
        </div>
        
        <motion.div
          className="footer-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
        />
        
        <div className="footer-bottom">
          <div className="copyright">
            <p>&copy; 2024 DeepyeVision. 由GjcjioopOrg开发，保留所有权利。</p>
            <p className="tech-info">
              基于YOLO26深度学习算法 | TensorRT加速 | OpenCV图像处理
            </p>
          </div>
          
          <motion.div
            className="social-links"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.2, y: -2 }}
              className="social-link github"
            >
              GitHub
            </motion.a>
            <motion.a 
              href="https://h5.dingtalk.com/invite-page/index.html?corpId=ding66fb26f5d0a47b3824f2f5cc6abecb85&inviteCode=t8lXpwrN26UBsPh&dtaction=os&org_name=Gjcjioop" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -2 }}
              className="social-link dingtalk"
            >
              钉钉
            </motion.a>
            <motion.a 
              href="https://www.douyin.com/user/MS4wLjABAAAAZCXpvgDCUZ_fyfJztVgB-WKP17PlYX9mtazHFBJ8-BE?from_tab_name=main" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -2 }}
              className="social-link douyin"
            >
              抖音
            </motion.a>
            <motion.a 
              href="http://www.gjcjioop.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -2 }}
              className="social-link website"
            >
              官网
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer