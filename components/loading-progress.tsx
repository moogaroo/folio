"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import imagePreloader from "@/lib/image-preloader"

interface LoadingProgressProps {
  onComplete?: () => void
  className?: string
}

export default function LoadingProgress({ onComplete, className = "" }: LoadingProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const unsubscribe = imagePreloader.onProgress((value) => {
      setProgress(value)
      if (value >= 1 && onComplete) {
        onComplete()
      }
    })

    return () => unsubscribe()
  }, [onComplete])

  return (
    <div className={`w-full ${className}`}>
      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#FF5722]"
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
