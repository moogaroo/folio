"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  className?: string
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"
  quality?: number
  sizes?: string
  onLoad?: () => void
  preload?: boolean
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className,
  objectFit = "cover",
  quality = 85,
  sizes = "100vw",
  onLoad,
  preload = false,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [imgSrc, setImgSrc] = useState(src)

  // Preload image if specified
  useEffect(() => {
    if (preload && src) {
      const img = new Image()
      img.src = src
      img.onload = () => {
        setImgSrc(src)
        setIsLoading(false)
        if (onLoad) onLoad()
      }
      img.onerror = () => {
        console.error("Failed to load image:", src)
        setImgSrc("/placeholder.svg")
        setIsLoading(false)
      }
    }
  }, [src, preload, onLoad])

  const handleImageLoad = () => {
    setIsLoading(false)
    if (onLoad) onLoad()
  }

  // For project hero images, we'll use a regular img tag for now to ensure compatibility
  if (src && src.includes("/images/") && fill) {
    return (
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className={cn("absolute inset-0 w-full h-full object-contain", className)}
      />
    )
  }

  return (
    <div className={cn("relative", className, fill ? "w-full h-full" : "")}>
      {fill ? (
        <Image
          src={imgSrc || "/placeholder.svg"}
          alt={alt}
          fill={true}
          priority={priority || true}
          quality={quality}
          sizes={sizes}
          className={cn(
            "transition-opacity duration-300",
            objectFit === "contain"
              ? "object-contain"
              : objectFit === "cover"
                ? "object-cover"
                : objectFit === "fill"
                  ? "object-fill"
                  : objectFit === "none"
                    ? "object-none"
                    : "object-scale-down",
          )}
          onLoad={handleImageLoad}
        />
      ) : (
        <Image
          src={imgSrc || "/placeholder.svg"}
          alt={alt}
          width={width || 800}
          height={height || 600}
          priority={priority}
          quality={quality}
          sizes={sizes}
          className={cn(
            "transition-opacity duration-300",
            objectFit === "contain"
              ? "object-contain"
              : objectFit === "cover"
                ? "object-cover"
                : objectFit === "fill"
                  ? "object-fill"
                  : objectFit === "none"
                    ? "object-none"
                    : "object-scale-down",
          )}
          onLoad={handleImageLoad}
        />
      )}
    </div>
  )
}
