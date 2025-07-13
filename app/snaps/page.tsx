"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { formatDate } from "@/lib/utils"

export default function Snaps() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <main className="min-h-screen flex flex-col bg-[#FFFEF4]">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        <div className="p-10 flex flex-col justify-between bg-[#f2f2f2]">
          <div className="text-[#888888] text-sm whitespace-pre-line">{formatDate(currentTime)}</div>
          <div className="flex justify-center items-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl"
            >
              📸
            </motion.div>
          </div>
        </div>

        <div className="p-10 flex flex-col">
          <div className="sticky top-0 flex justify-between items-center py-4 z-10 bg-[#FFFEF4]/80 backdrop-blur-sm">
            <Link href="/" className="flex items-center gap-2 text-sm hover:opacity-50 transition-opacity">
              <ArrowLeft size={16} />
              back
            </Link>
          </div>

          <div className="mb-20 mt-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[22px] mb-1"
            >
              snaps
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[#888888] text-[15px]"
            >
              moments captured
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                className="aspect-square bg-[#f8f8f8] rounded-lg hover:opacity-80 transition-opacity"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  )
}
