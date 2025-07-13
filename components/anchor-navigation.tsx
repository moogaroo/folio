"use client"

import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { useEffect, useState } from "react"

interface AnchorLink {
  id: string
  label: string
}

interface AnchorNavigationProps {
  links: AnchorLink[]
}

export default function AnchorNavigation({ links }: AnchorNavigationProps) {
  const activeSection = useScrollSpy(links.map((link) => link.id))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || links.length === 0) return null

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      // Prevent focus state from interfering with active state
      const button = document.querySelector(`button[data-section="${id}"]`) as HTMLElement
      if (button) {
        // Blur the button after clicking to avoid focus state
        setTimeout(() => button.blur(), 100)
      }

      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "200px",
        left: "40px",
        width: "180px",
        zIndex: 20,
        backgroundColor: "#f1f1f1",
        padding: "20px 0",
      }}
    >
      <nav>
        <ul className="anchor-list">
          {links.map((link) => (
            <li key={link.id} className={`anchor-item ${activeSection === link.id ? "active" : ""}`}>
              <button
                onClick={() => handleClick(link.id)}
                className="anchor-link"
                data-section={link.id}
                aria-current={activeSection === link.id ? "true" : "false"}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
