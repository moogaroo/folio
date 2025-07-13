"use client"

import { useTheme } from "@/contexts/theme-context"

interface ColoredLogoProps {
  borderWidth?: string
}

export default function ColoredLogo({ borderWidth = "3px" }: ColoredLogoProps) {
  const { theme } = useTheme()

  return (
    <div className="flex items-center justify-center">
      <div
        className="relative"
        style={{
          width: "40px",
          height: "40px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: theme === "yellow" ? "#F9C657" : "#FF5722",
            border: `${borderWidth} solid #000000`,
            borderRadius: theme === "yellow" ? "50%" : "0",
            zIndex: 1,
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "30%",
            width: "70%",
            height: "70%",
            backgroundColor: theme === "yellow" ? "#8486DE" : "#607D8B",
            border: `${borderWidth} solid #000000`,
            borderRadius: theme === "yellow" ? "50%" : "0",
            zIndex: 2,
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: "60%",
            left: "60%",
            width: "40%",
            height: "40%",
            backgroundColor: theme === "yellow" ? "#FFB096" : "#FFC107",
            border: `${borderWidth} solid #000000`,
            borderRadius: theme === "yellow" ? "50%" : "0",
            zIndex: 3,
          }}
        ></div>
      </div>
    </div>
  )
}
