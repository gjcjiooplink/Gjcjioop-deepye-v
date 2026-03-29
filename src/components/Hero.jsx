import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import BackgroundEffect from './BackgroundEffect'
import './Hero.css'

const Hero = () => {
  return (
    <section className="hero">
      <BackgroundEffect type="particles" color="#22c55e" intensity={0.1} />
      <div className="container">
        <div className="hero-content">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            DeepyeVision 游戏智能
            <span className="highlight">您的游戏专属助手</span>
          </motion.h1>
          
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            由GjcjioopOrg开发 | 官网：www.gjcjioop.com
          </motion.p>
          
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            基于YOLO26深度学习算法的革命性游戏辅助工具，让您的游戏体验更上一层楼
          </motion.p>
          
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link to="/download" className="btn btn-primary">
              立即下载
            </Link>
            <button className="btn btn-secondary">
              了解更多
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero