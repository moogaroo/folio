"use client"

import SnapCarousel from "./snap-carousel"

interface ImageCarouselProps {
  images: {
    src: string
    alt: string
    caption?: string
    size?: "small" | "medium" | "large"
  }[]
  groupId?: string
}

export default function ImageCarousel({ images, groupId = "default" }: ImageCarouselProps) {
  // Simply use the SnapCarousel component
  return <SnapCarousel images={images} />
}
