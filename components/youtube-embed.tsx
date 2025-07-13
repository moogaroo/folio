"use client"

import { useState, useEffect } from "react"

interface YouTubeEmbedProps {
  videoId: string
  caption?: string
}

export default function YouTubeEmbed({ videoId, caption }: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handlePlay = () => {
    setIsPlaying(true)
  }

  return (
    <div className="youtube-embed-container">
      <div className="youtube-embed-wrapper">
        {!isLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={handlePlay}
          ></iframe>
        )}
      </div>
      {caption && <p className="text-center mt-2 text-sm text-gray-600">{caption}</p>}
    </div>
  )
}
