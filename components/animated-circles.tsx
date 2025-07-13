"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

interface Circle {
  id: number
  x: number
  y: number
  size: number
  color: string
  speed: number
  direction: { x: number; y: number }
  isPopped: boolean
  isHidden: boolean
}

interface AnimatedCirclesProps {
  images?: string[]
  onPop?: (id: number) => void
}

export default function AnimatedCircles({ images = [], onPop }: AnimatedCirclesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [circles, setCircles] = useState<Circle[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const animationRef = useRef<number>()

  // Logo colors with more variations
  const colors = ["#FF5722", "#607D8B", "#FFC107", "#F1F1F1", "#2D2D2D"]

  useEffect(() => {
    if (!containerRef.current) return

    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    // Initialize circles - now 8 instead of 3
    const initialCircles: Circle[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      size: 80 + Math.random() * 120, // Circles between 80px and 200px
      color: colors[i % colors.length],
      speed: 1 + Math.random() * 1, // Faster movement (1-2 instead of 0.5-1)
      direction: {
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
      },
      isPopped: false,
      isHidden: false,
    }))

    setCircles(initialCircles)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (circles.length === 0 || dimensions.width === 0) return

    // Update the animate function to ensure circles bounce only within the right panel
    const animate = () => {
      setCircles((prevCircles) =>
        prevCircles.map((circle) => {
          if (circle.isPopped || circle.isHidden) return circle

          // Calculate new position
          let newX = circle.x + circle.direction.x * circle.speed
          let newY = circle.y + circle.direction.y * circle.speed

          // Bounce off walls - all walls of the right panel
          let newDirectionX = circle.direction.x
          let newDirectionY = circle.direction.y

          if (newX <= 0 || newX >= dimensions.width - circle.size) {
            newDirectionX = -newDirectionX
            newX = Math.max(0, Math.min(newX, dimensions.width - circle.size))
          }

          if (newY <= 0 || newY >= dimensions.height - circle.size) {
            newDirectionY = -newDirectionY
            newY = Math.max(0, Math.min(newY, dimensions.height - circle.size))
          }

          // Occasionally change direction slightly for more natural movement
          if (Math.random() < 0.02) {
            newDirectionX += Math.random() * 0.2 - 0.1
            newDirectionY += Math.random() * 0.2 - 0.1

            // Normalize direction vector
            const magnitude = Math.sqrt(newDirectionX * newDirectionX + newDirectionY * newDirectionY)
            newDirectionX /= magnitude
            newDirectionY /= magnitude
          }

          return {
            ...circle,
            x: newX,
            y: newY,
            direction: {
              x: newDirectionX,
              y: newDirectionY,
            },
          }
        }),
      )

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [circles, dimensions])

  const handleClick = (id: number) => {
    setCircles((prevCircles) =>
      prevCircles.map((circle) => (circle.id === id ? { ...circle, isPopped: true } : circle)),
    )

    // After a short delay, remove the popped balloon
    setTimeout(() => {
      setCircles((prevCircles) => prevCircles.filter((circle) => circle.id !== id))
      if (onPop) onPop(id)
    }, 500) // Longer delay for explosion animation
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {circles.map((circle, index) => (
        <motion.div
          key={circle.id}
          className="absolute rounded-full overflow-hidden flex items-center justify-center cursor-pointer"
          style={{
            width: circle.size,
            height: circle.size,
            backgroundColor: circle.color,
            left: circle.x,
            top: circle.y,
            opacity: circle.isPopped || circle.isHidden ? 0 : 1,
            transform: circle.isPopped ? "scale(1.5)" : "scale(1)",
            transition: "opacity 0.3s, transform 0.3s",
            display: circle.isHidden ? "none" : "flex",
          }}
          initial={false}
          animate={{
            x: circle.x,
            y: circle.y,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
          }}
          onClick={() => handleClick(circle.id)}
        >
          {images[index % images.length] && (
            <img
              src={images[index % images.length] || "/placeholder.svg"}
              alt={`Circle content ${index}`}
              className="w-full h-full object-cover"
            />
          )}
          {!images[index % images.length] && index === 0 && <div className="text-4xl"></div>}

          {/* Explosion particles - only visible when popping */}
          {circle.isPopped && (
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: circle.color,
                    boxShadow: "0 0 10px rgba(255,255,255,0.8)",
                  }}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: [0, Math.cos((i * Math.PI) / 4) * 100],
                    y: [0, Math.sin((i * Math.PI) / 4) * 100],
                    opacity: [1, 0],
                  }}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}
