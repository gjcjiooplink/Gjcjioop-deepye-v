import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import BackgroundEffect from './BackgroundEffect'
import './Research.css'

const Research = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })

  const researchPapers = [
    {
      id: 1,
      title: "DeepyeVision实时视觉推理系统性能优化研究",
      authors: "GjcjioopOrg研究团队",
      date: "2024年",
      cover: "/res/doc/05716ec091b676f486858cfd020bdbc7.jpg",
      pdf: "/res/doc/DeepyeVision_1.76.311_Alpha_版本实时视觉推理系统性能优化研究.pdf",
      word: null,
      abstract: "本研究针对DeepyeVision系统的实时视觉推理性能进行深度优化，提出了一系列创新性的算法改进方案。"
    },
    {
      id: 2,
      title: "基于YOLOv8的实时目标识别跟踪系统优化设计",
      authors: "GjcjioopOrg研究团队",
      date: "2024年",
      cover: "/res/doc/9b4eda52887554670687ffc6d49b7dab.jpg",
      pdf: "/res/doc/基于YOLOv8的实时目标识别跟踪系统优化设计与阶段性实验研究报告.pdf",
      word: null,
      abstract: "本文详细介绍了基于YOLOv8架构的目标识别跟踪系统优化设计，包括算法改进和实验验证。"
    },
    {
      id: 3,
      title: "基于YOLOv8姿态估计与卷积神经网络的智能视觉跟踪系统研究",
      authors: "GjcjioopOrg研究团队",
      date: "2024年",
      cover: "/res/doc/bf936b4649a42d9289e121185aa2ffe0.jpg",
      pdf: null,
      word: "/res/doc/基于YOLOv8姿态估计与卷积神经网络的智能视觉跟踪系统研究(1).docx",
      abstract: "结合YOLOv8姿态估计技术与卷积神经网络，构建了高效的智能视觉跟踪系统。"
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

  const handlePaperClick = (paper) => {
    // 这里可以打开论文详情页面
    console.log('打开论文详情:', paper.title)
  }

  return (
    <section id="research" className="research" ref={ref}>
      <BackgroundEffect type="particles" color="#22c55e" intensity={0.06} />
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>研究成果</h2>
          <p>GjcjioopOrg研究团队的最新科研成果</p>
        </motion.div>

        <motion.div
          className="research-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {researchPapers.map((paper) => (
            <motion.div
              key={paper.id}
              className="paper-card"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              onClick={() => handlePaperClick(paper)}
            >
              <div className="paper-cover">
                <img src={paper.cover} alt={paper.title} />
                <div className="paper-overlay">
                  <span className="view-more">and more</span>
                </div>
              </div>
              <div className="paper-content">
                <h3>{paper.title}</h3>
                <div className="paper-meta">
                  <span className="authors">{paper.authors}</span>
                  <span className="date">{paper.date}</span>
                </div>
                <p className="paper-abstract">{paper.abstract}</p>
                <div className="paper-actions">
                  {paper.pdf && (
                    <a href={paper.pdf} target="_blank" rel="noopener noreferrer" className="btn-download">
                      PDF文档
                    </a>
                  )}
                  {paper.word && (
                    <a href={paper.word} target="_blank" rel="noopener noreferrer" className="btn-download">
                      WORD文档
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="research-footer"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>更多研究成果正在持续更新中...</p>
        </motion.div>
      </div>
    </section>
  )
}

export default Research