"use client"

import { useEffect, useState } from "react"

export const useScrollSpy = (sectionIds: string[], offset = 100) => {
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    // Cleanup function
    const cleanup = () => {
      observers.forEach((observer) => observer.disconnect())
    }

    // Check if we're on the client side
    if (typeof window === "undefined") return cleanup

    // Store all observers for cleanup
    const observers: IntersectionObserver[] = []

    // Track all visible sections
    const visibleSections = new Set<string>()

    // Function to determine which section should be active
    const determineActiveSection = () => {
      if (visibleSections.size === 0) return

      // If we have visible sections, find the one closest to the top
      const visibleSectionsArray = Array.from(visibleSections)

      // Sort sections by their position from top
      const sortedSections = visibleSectionsArray.sort((a, b) => {
        const aEl = document.getElementById(a)
        const bEl = document.getElementById(b)
        if (!aEl || !bEl) return 0
        return aEl.getBoundingClientRect().top - bEl.getBoundingClientRect().top
      })

      // The first one (closest to top) should be active
      setActiveSection(sortedSections[0])
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.add(entry.target.id)
        } else {
          visibleSections.delete(entry.target.id)
        }
      })

      determineActiveSection()
    }

    // Create an observer for each section
    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        const observer = new IntersectionObserver(handleIntersection, {
          rootMargin: `-${offset}px 0px -50% 0px`,
          threshold: 0.1,
        })
        observer.observe(element)
        observers.push(observer)
      }
    })

    // Also update active section on scroll to handle edge cases
    const handleScroll = () => {
      determineActiveSection()
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      cleanup()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [sectionIds, offset])

  return activeSection
}
