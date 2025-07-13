"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/contexts/theme-context"

export default function LoadingScreen() {
  const { theme } = useTheme()

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 mb-4 relative">
          <motion.div
            className={`w-full h-full rounded-full border-4 border-t-transparent ${
              theme === "yellow" ? "border-[#F9C657]" : "border-[#2D2D2D]"
            }`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          ></motion.div>
        </div>
        <motion.p
          className="text-lg font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading...
        </motion.p>
      </div>
    </motion.div>
  )
}
