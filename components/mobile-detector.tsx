"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"

// Create a context to share the mobile detection state
const MobileContext = createContext<boolean>(false)

// Custom hook to use the mobile detector
export function useMobileDetector() {
  return useContext(MobileContext)
}

export default function MobileDetector({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Function to check if the device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
      const mobileRegex =
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i
      const tabletRegex = /android|ipad|playbook|silk/i

      // Check if the user agent matches mobile or tablet regex
      const isMobileDevice = mobileRegex.test(userAgent) || (tabletRegex.test(userAgent) && "ontouchend" in document)

      // Also check screen width for responsive design
      const isSmallScreen = window.innerWidth < 768

      setIsMobile(isMobileDevice || isSmallScreen)
    }

    // Check on mount
    checkMobile()

    // Check on resize
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return <MobileContext.Provider value={isMobile}>{children}</MobileContext.Provider>
}
