 import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container">
        <nav className="nav">
          <motion.div
            className="logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="logo-text">DeepyeVision</span>
          </motion.div>
          
          <div className="nav-links">
            <motion.a href="#features" whileHover={{ scale: 1.1 }}>功能特性</motion.a>
            <motion.a href="#research" whileHover={{ scale: 1.1 }}>研究成果</motion.a>
            <motion.a href="/download" whileHover={{ scale: 1.1 }}>下载</motion.a>
          </div>
        </nav>
      </div>
    </motion.header>
  )
}

export default Header