"use client"

import { useEffect, useState } from "react"

export default function BrutalistTexture() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate opacity based on scroll position (0.1 to 0.6)
  const opacity = Math.min(0.6, 0.1 + (scrollY / 1000) * 0.5)

  // Calculate parallax offsets for different layers
  const gridOffset = scrollY * 0.02
  const diagonalOffset = scrollY * 0.05
  const dotsOffset = scrollY * 0.03
  const shapesOffset = scrollY * 0.07

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      {/* Grid Pattern with Parallax */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          transform: `translateY(${gridOffset}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Diagonal Lines with Parallax */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              rgba(255, 87, 34, 0.1) 20px,
              rgba(255, 87, 34, 0.1) 22px
            )
          `,
          transform: `translateY(${-diagonalOffset}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Dots Pattern with Parallax */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0,0,0,0.15) 2px, transparent 2px)`,
          backgroundSize: "60px 60px",
          backgroundPosition: "30px 30px",
          transform: `translate(${dotsOffset}px, ${dotsOffset * 0.5}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Geometric Shapes with Parallax */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translate(${-shapesOffset * 0.5}px, ${shapesOffset}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <svg className="absolute inset-0 w-full h-full" style={{ mixBlendMode: "multiply" }}>
          <defs>
            <pattern id="brutalistPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="200" height="200" fill="transparent" />
              <rect x="20" y="20" width="40" height="40" fill="rgba(255, 193, 7, 0.1)" transform="rotate(45 40 40)" />
              <rect x="120" y="80" width="30" height="30" fill="rgba(96, 125, 139, 0.1)" />
              <circle cx="160" cy="40" r="15" fill="rgba(255, 87, 34, 0.1)" />
              <polygon points="60,160 80,120 100,160" fill="rgba(0, 0, 255, 0.1)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#brutalistPattern)" />
        </svg>
      </div>
    </div>
  )
}
