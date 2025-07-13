"use client"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ProjectHeroImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

export default function ProjectHeroImage({ src, alt, className, priority = true }: ProjectHeroImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  // For hero images, we'll use a standard img tag with no compression
  // This ensures maximum quality for these important showcase images
  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      {/* Use a standard img tag for maximum quality */}
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className={cn(
          "w-full h-full object-contain transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
        )}
        onLoad={() => setIsLoaded(true)}
        loading={priority ? "eager" : "lazy"}
      />

      {/* Show a loading state until the image is loaded */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}
