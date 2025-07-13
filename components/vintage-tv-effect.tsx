"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface VintageTVEffectProps {
  isActive: boolean
  imageUrl: string
  onClose: () => void
}

export default function VintageTVEffect({ isActive, imageUrl, onClose }: VintageTVEffectProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isActive) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isActive])

  if (!isVisible && !isActive) return null

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.05 }}
          className="absolute inset-0 w-full h-full overflow-hidden"
        >
          {/* Image container - with padding for image visibility */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center p-6 z-10">
            <div className="tv-container-new w-full h-full relative">
              <img src={imageUrl || "/placeholder.svg"} alt="Project preview" className="tv-image-new" />

              {/* Scanlines opaques qui vont de bord à bord */}
              <div className="tv-scanlines-breakout"></div>

              {/* Static noise overlay on image */}
              <div className="tv-static-new"></div>

              {/* Gentle glitch overlay on image */}
              <div className="tv-glitch-gentle"></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
