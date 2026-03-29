import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import BackgroundEffect from './BackgroundEffect'
import './Features.css'

const Features = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })

  const advantages = [
    {
      icon: "🎯",
      title: "智能瞄准系统",
      description: "基于YOLO26深度学习算法，实时识别游戏目标，提供精准辅助瞄准。",
      details: [
        "采用最新的YOLO26目标检测算法，识别准确率高达98%",
        "实时处理游戏画面，毫秒级响应速度",
        "支持多种游戏场景，包括复杂背景和动态目标",
        "智能预测目标移动轨迹，提高瞄准精度"
      ]
    },
    {
      icon: "⚡",
      title: "实时处理引擎",
      description: "毫秒级响应速度，确保游戏过程中无延迟，保持流畅体验。",
      details: [
        "优化的图像处理流水线，处理速度提升300%",
        "多线程并行计算，充分利用硬件资源",
        "智能资源管理，避免系统资源占用过高",
        "自适应算法，根据硬件性能自动调整处理策略"
      ]
    },
    {
      icon: "🛡️",
      title: "安全防护机制",
      description: "采用先进的防检测技术，确保使用安全，避免账号风险。",
      details: [
        "多层加密保护，防止数据泄露和恶意检测",
        "行为模式模拟，与正常玩家操作无差异",
        "定期更新防护策略，应对最新检测技术",
        "本地化处理，所有数据均在本地计算，不上传云端"
      ]
    },
    {
      icon: "🎮",
      title: "多游戏兼容",
      description: "支持主流FPS游戏，持续更新适配更多游戏类型。",
      details: [
        "已支持《绝地求生》、《使命召唤》、《CS:GO》等主流游戏",
        "自动识别游戏版本，无需手动配置",
        "定期更新游戏适配库，支持最新版本",
        "自定义配置功能，满足个性化需求"
      ]
    },
    {
      icon: "🤖",
      title: "AI智能学习",
      description: "持续学习用户操作习惯，提供个性化辅助体验。",
      details: [
        "机器学习算法分析用户操作模式",
        "自适应调整辅助参数，匹配个人游戏风格",
        "智能推荐最佳设置方案",
        "持续优化算法，提升用户体验"
      ]
    },
    {
      icon: "🔧",
      title: "专业技术支持",
      description: "GjcjioopOrg专业团队提供持续技术支持和更新。",
      details: [
        "24小时在线技术支持服务",
        "定期功能更新和性能优化",
        "用户反馈快速响应机制",
        "专业的技术文档和教程"
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="features" className="features" ref={ref}>
      <BackgroundEffect type="lines" color="#10b981" intensity={0.08} />
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>我们的优势</h2>
          <p>DeepyeVision的核心技术优势与独特价值</p>
        </motion.div>

        <motion.div
          className="advantages-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              className="advantage-card"
              variants={itemVariants}
            >
              <div className="advantage-icon">{advantage.icon}</div>
              <h3>{advantage.title}</h3>
              <p className="advantage-description">{advantage.description}</p>
              <div className="advantage-details">
                {advantage.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="detail-item">
                    <span className="detail-marker">•</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Features