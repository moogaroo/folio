"use client"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface HeroImageProps {
  src: string
  alt: string
  className?: string
}

export default function HeroImage({ src, alt, className }: HeroImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [imageSrc, setImageSrc] = useState(src)

  useEffect(() => {
    // Update image source when prop changes
    setImageSrc(src)
    setIsLoading(true)
  }, [src])

  // For now, we'll use a standard img tag with high quality settings
  // This ensures maximum quality without any compression
  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* Fallback for immediate display */}
      <img
        src={imageSrc || "/placeholder.svg"}
        alt={alt}
        className={cn("absolute inset-0 w-full h-full object-contain z-10", isLoading ? "opacity-50" : "opacity-100")}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}
