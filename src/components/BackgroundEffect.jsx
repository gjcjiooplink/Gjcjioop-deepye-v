import React, { useEffect, useRef } from 'react'

const BackgroundEffect = ({ type = 'particles', color = '#22c55e', intensity = 0.1 }) => {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []

    // 设置canvas尺寸
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    // 鼠标移动事件
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    // 粒子类
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
        this.color = color
        this.opacity = Math.random() * 0.5 + 0.1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // 边界检查
        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height

        // 鼠标影响
        const dx = mouseRef.current.x - this.x
        const dy = mouseRef.current.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          this.speedX += dx * 0.0005
          this.speedY += dy * 0.0005
        }
      }

      draw() {
        ctx.fillStyle = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // 线条类
    class Line {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.history = [{ x: this.x, y: this.y }]
        this.maxLength = 20
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
        this.life = 1
        this.decay = 0.002
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // 边界检查
        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height

        // 鼠标影响
        const dx = mouseRef.current.x - this.x
        const dy = mouseRef.current.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          this.speedX += dx * 0.0003
          this.speedY += dy * 0.0003
        }

        // 添加历史点
        this.history.push({ x: this.x, y: this.y })
        if (this.history.length > this.maxLength) {
          this.history.shift()
        }

        this.life -= this.decay
      }

      draw() {
        if (this.history.length < 2) return

        ctx.strokeStyle = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${this.life * 0.3})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(this.history[0].x, this.history[0].y)

        for (let i = 1; i < this.history.length; i++) {
          ctx.lineTo(this.history[i].x, this.history[i].y)
        }
        ctx.stroke()
      }

      isDead() {
        return this.life <= 0
      }
    }

    // 初始化粒子/线条
    const init = () => {
      particles = []
      const count = type === 'particles' ? 50 : 30

      for (let i = 0; i < count; i++) {
        if (type === 'particles') {
          particles.push(new Particle())
        } else {
          particles.push(new Line())
        }
      }
    }

    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 更新和绘制粒子/线条
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update()
        particles[i].draw()

        // 移除死亡的线条
        if (type === 'lines' && particles[i].isDead()) {
          particles.splice(i, 1)
          particles.push(new Line())
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    // 设置事件监听器
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    canvas.addEventListener('mousemove', handleMouseMove)

    // 初始化并开始动画
    init()
    animate()

    // 清理函数
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [type, color, intensity])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none'
      }}
    />
  )
}

export default BackgroundEffect