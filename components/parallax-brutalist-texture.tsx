"use client"

import { useEffect, useState, useRef } from "react"

export default function ParallaxBrutalistTexture() {
  const [opacity, setOpacity] = useState(0.8) // Opacité plus forte
  const circlesRef = useRef<HTMLDivElement>(null)
  const blobsRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)
  const shapesRef = useRef<HTMLDivElement>(null)

  // Store the animation frame ID for cleanup
  const animationRef = useRef<number | null>(null)

  // Store the last known scroll position
  const lastScrollY = useRef(0)

  // Use RAF for smooth animation
  const animate = () => {
    const scrollY = window.scrollY

    // Update opacity based on scroll (0.8 to 0.4 - plus fort)
    const newOpacity = Math.max(0.4, 0.8 - (scrollY / 1000) * 0.4)
    setOpacity(newOpacity)

    // Calculate parallax offsets with different speeds for brutalist shapes
    if (circlesRef.current) {
      circlesRef.current.style.transform = `translateY(${scrollY * 0.06}px) rotate(${scrollY * 0.02}deg)`
    }

    if (blobsRef.current) {
      blobsRef.current.style.transform = `translate(${-scrollY * 0.08}px, ${scrollY * 0.12}px)`
    }

    if (shapesRef.current) {
      shapesRef.current.style.transform = `translate(${scrollY * 0.1}px, ${scrollY * 0.15}px) rotate(${-scrollY * 0.01}deg)`
    }

    // Store the current scroll position
    lastScrollY.current = scrollY

    // Continue the animation loop
    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    // Start the animation loop
    animationRef.current = requestAnimationFrame(animate)

    // Clean up the animation frame on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        opacity,
        width: "100%",
        maxWidth: "50vw",
        left: 0,
        right: "auto",
      }}
    >
      {/* Bold Circles Pattern - Plus brutalist */}
      <div
        ref={circlesRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(255, 87, 34, 0.15) 80px, transparent 80px),
            radial-gradient(circle at 80% 70%, rgba(96, 125, 139, 0.12) 120px, transparent 120px),
            radial-gradient(circle at 60% 20%, rgba(255, 193, 7, 0.18) 60px, transparent 60px),
            radial-gradient(circle at 40% 90%, rgba(0, 0, 0, 0.08) 90px, transparent 90px)
          `,
          willChange: "transform",
        }}
      />

      {/* Strong Geometric Blobs - Plus contrastées */}
      <div
        ref={blobsRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 150px 80px at 25% 60%, rgba(76, 175, 80, 0.12) 70%, transparent 70%),
            radial-gradient(ellipse 100px 120px at 75% 40%, rgba(156, 39, 176, 0.10) 60%, transparent 60%),
            radial-gradient(ellipse 80px 100px at 40% 80%, rgba(255, 87, 34, 0.14) 65%, transparent 65%),
            radial-gradient(ellipse 120px 60px at 10% 10%, rgba(0, 0, 0, 0.06) 80%, transparent 80%)
          `,
          willChange: "transform",
        }}
      />

      {/* Brutalist Geometric Shapes - Plus marquées */}
      <div ref={shapesRef} className="absolute inset-0 w-full h-full" style={{ willChange: "transform" }}>
        <svg className="absolute inset-0 w-full h-full" style={{ mixBlendMode: "multiply" }}>
          <defs>
            <pattern id="brutalistPattern" x="0" y="0" width="180" height="180" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="180" height="180" fill="transparent" />

              {/* Bold rounded rectangles */}
              <rect x="15" y="25" width="50" height="25" rx="12" ry="12" fill="rgba(255, 193, 7, 0.16)" />
              <rect x="100" y="70" width="35" height="35" rx="17" ry="17" fill="rgba(96, 125, 139, 0.14)" />
              <rect x="120" y="20" width="40" height="15" rx="7" ry="7" fill="rgba(0, 0, 0, 0.12)" />

              {/* Strong circles */}
              <circle cx="140" cy="35" r="16" fill="rgba(255, 87, 34, 0.18)" />
              <circle cx="45" cy="130" r="14" fill="rgba(76, 175, 80, 0.15)" />
              <circle cx="120" cy="140" r="10" fill="rgba(156, 39, 176, 0.13)" />
              <circle cx="30" cy="80" r="8" fill="rgba(0, 0, 0, 0.10)" />

              {/* Bold organic shapes */}
              <path d="M70,100 Q90,85 110,100 Q90,115 70,100" fill="rgba(255, 87, 34, 0.12)" />
              <path d="M25,160 Q45,145 65,160 Q45,170 25,160" fill="rgba(96, 125, 139, 0.14)" />

              {/* Strong pill shapes */}
              <ellipse cx="150" cy="100" rx="22" ry="8" fill="rgba(255, 193, 7, 0.13)" />
              <ellipse cx="80" cy="50" rx="18" ry="6" fill="rgba(76, 175, 80, 0.11)" />

              {/* Additional brutalist elements */}
              <rect x="5" y="5" width="20" height="20" rx="10" ry="10" fill="rgba(0, 0, 0, 0.08)" />
              <rect x="160" y="160" width="15" height="15" rx="7" ry="7" fill="rgba(255, 87, 34, 0.10)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#brutalistPattern)" />
        </svg>
      </div>
    </div>
  )
}
