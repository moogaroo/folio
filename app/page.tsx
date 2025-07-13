"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import ColoredLogo from "@/components/colored-logo"
import TestimonialCarousel from "@/components/testimonial-carousel"
import { useMobileDetector } from "@/components/mobile-detector"
import MobileHome from "./page-mobile"
import { projects } from "@/lib/projects-data"
import ProjectCard from "@/components/project-card"
import LoadingScreen from "@/components/loading-screen"
import { useTheme } from "@/contexts/theme-context"
import { useLanguage } from "@/contexts/language-context"
import LanguageToggle from "@/components/language-toggle"
// import ParallaxBrutalistTexture from "@/components/parallax-brutalist-texture"
import VintageTVEffect from "@/components/vintage-tv-effect"

// Client-only component that safely uses the font context
import ClientFontSwitcher from "@/components/client-font-switcher"

export default function Home() {
  const isMobile = useMobileDetector()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [windowWidth, setWindowWidth] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: string]: boolean }>({})
  const [hoveredTestimonialData, setHoveredTestimonialData] = useState<{
    isHovered: boolean
    testimonial: any
  } | null>(null)
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const lastScrollY = useRef(0)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const leftPanelRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  // Update window width on client side
  useEffect(() => {
    setWindowWidth(window.innerWidth)

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Preload all project images for quicker display
  useEffect(() => {
    const imagePromises = projects.map((project, index) => {
      return new Promise<void>((resolve) => {
        const img = new Image()
        img.src = project.image
        img.onload = () => {
          setImagesLoaded((prev) => ({ ...prev, [index]: true }))
          resolve()
        }
        img.onerror = () => {
          resolve()
        }
      })
    })

    Promise.all(imagePromises).then(() => {
      console.log("All project images preloaded")
    })

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    const handleTestimonialHover = (event: any) => {
      // Ne pas changer l'état si un projet est en hover
      if (hoveredProject !== null) {
        return
      }

      setHoveredTestimonialData(event.detail)
    }

    window.addEventListener("testimonialHover", handleTestimonialHover)
    return () => {
      window.removeEventListener("testimonialHover", handleTestimonialHover)
    }
  }, [hoveredProject]) // Ajouter hoveredProject comme dépendance

  useEffect(() => {
    const handleScroll = () => {}

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleProjectHover = (index: number | null) => {
    console.log("Project hover:", index) // Debug log

    // Toujours mettre à jour l'état du projet en hover
    setHoveredProject(index)

    // Si on hover un projet, réinitialiser les témoignages
    if (index !== null) {
      setHoveredTestimonialData(null)
    }
  }

  const handleBalloonPop = (id: number) => {
    setScore((prevScore) => prevScore + 1)
  }

  // Logique simplifiée pour déterminer ce qui doit s'afficher
  const getRightPanelContent = () => {
    // Priorité 1: Si un projet est en hover, afficher l'image du projet
    if (hoveredProject !== null && projects[hoveredProject]) {
      console.log("Showing project:", hoveredProject, projects[hoveredProject].title) // Debug log
      return "project"
    }

    // Priorité 2: Si un témoignage est en hover, afficher le témoignage
    if (hoveredTestimonialData?.isHovered) {
      console.log("Showing testimonial") // Debug log
      return "testimonial"
    }

    // Priorité 3: Afficher le contenu du profil par défaut
    console.log("Showing profile") // Debug log
    return "profile"
  }

  const rightPanelContent = getRightPanelContent()

  if (isMobile) {
    return (
      <>
        {isLoading && <LoadingScreen />}
        <MobileHome />
      </>
    )
  }

  if (!mounted && !isMobile) {
    // Return a minimal loading state when not mounted on desktop
    return <main className="min-h-screen flex flex-col md:flex-row">{isLoading && <LoadingScreen />}</main>
  }

  return (
    <>
      <main className="min-h-screen flex flex-col md:flex-row">
        {isLoading && <LoadingScreen />}

        <div
          className="hidden md:block md:fixed md:right-0 md:w-1/2 md:h-screen flex flex-col right-panel"
          style={{
            backgroundColor: "#F8F8F8",
          }}
        >
          <div className="flex-1 flex flex-col items-start justify-start w-full h-full relative right-panel-content">
            <AnimatePresence mode="wait">
              {rightPanelContent === "testimonial" ? (
                <motion.div
                  key="testimonial-quote"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex items-center justify-center p-8"
                >
                  <div className="max-w-md max-h-[80vh] overflow-y-auto">
                    <div className="text-[#F9C657] opacity-80 mb-4">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    <p className="regular-text leading-relaxed whitespace-pre-line text-black">
                      {hoveredTestimonialData?.testimonial?.quote}
                    </p>
                  </div>
                </motion.div>
              ) : rightPanelContent === "profile" ? (
                <motion.div
                  key="profile-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex items-center justify-center p-8"
                >
                  <div className="max-w-md">
                    <h2 className="text-[16px] md:text-[18px] font-normal mb-4 font-serif text-[#0000FF]">
                      {t("senior_product_designer")}
                    </h2>
                    <ul className="space-y-4 mb-8">
                      <li className="regular-text text-black">
                        <span className="font-medium text-[#0000FF]">{t("proactive_solutionist")}</span> –{" "}
                        {t("proactive_desc")}
                      </li>
                      <li className="regular-text text-black">
                        <span className="font-medium text-[#0000FF]">{t("collaborative")}</span> –{" "}
                        {t("collaborative_desc")}
                      </li>
                      <li className="regular-text text-black">
                        <span className="font-medium text-[#0000FF]">{t("rigorous")}</span> – {t("rigorous_desc")}
                      </li>
                      <li className="regular-text text-black">
                        <span className="font-medium text-[#0000FF]">{t("creative")}</span> – {t("creative_desc")}
                      </li>
                    </ul>

                    <h2 className="text-[16px] md:text-[18px] font-normal mb-4 font-serif text-[#0000FF]">
                      {t("skills")}
                    </h2>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-4">
                      <p className="regular-text text-black">{t("design_thinking")}</p>
                      <p className="regular-text text-black">{t("figma")}</p>
                      <p className="regular-text text-black">{t("user_research")}</p>
                      <p className="regular-text text-black">{t("html_css")}</p>
                      <p className="regular-text text-black">{t("design_system")}</p>
                      <p className="regular-text text-black">{t("ai_tools")}</p>
                      <p className="regular-text text-black">{t("ux_data")}</p>
                      <p className="regular-text text-black">{t("3d_archi")}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2">
                      <p className="regular-text text-black">{t("french")} &nbsp;&nbsp; native</p>
                      <p className="regular-text text-black">{t("english")} &nbsp;&nbsp; professional</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={`project-${hoveredProject}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full flex items-center justify-center relative"
                >
                  <VintageTVEffect
                    isActive={hoveredProject !== null}
                    imageUrl={
                      hoveredProject !== null
                        ? projects[hoveredProject]?.image || "/placeholder.svg"
                        : "/placeholder.svg"
                    }
                    onClose={() => setHoveredProject(null)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="hidden md:flex fixed w-full top-2 z-50 px-10 items-center justify-center">
          <Link href="/" aria-label="Home" className="hover:bg-transparent border-0 hover:border-0 p-0">
            <div className="transform scale-120">
              <ColoredLogo />
            </div>
          </Link>
        </div>

        <div
          ref={leftPanelRef}
          className="w-full md:w-1/2 relative left-panel-bg overflow-hidden"
          style={{
            backgroundColor: "#E5E5E5",
            position: "relative",
          }}
        >
          {/* <ParallaxBrutalistTexture /> */}
          <div className="relative" style={{ zIndex: 2 }}>
            {/* New profile container at the top */}
            <div className="px-10 pt-10">
              <div
                className="profile-container brutalist-profile"
                style={{
                  marginBottom: "2rem",
                  width: "100%",
                  maxWidth: "600px",
                }}
              >
                <div className="flex" style={{ backgroundColor: "#FFFFFF", border: "2px solid #000000" }}>
                  <div style={{ width: "30%", maxWidth: "180px" }}>
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/profile%20picture-9vBUPjS1g6sldbaxULRjEkbKloq03L.png"
                      alt="Morgan Rosemberg"
                      className="w-full h-auto object-cover"
                    />
                    <div style={{ height: "10px", backgroundColor: "#FF5722" }}></div>
                  </div>
                  <div className="p-4" style={{ width: "70%" }}>
                    <h1 className="heading-text mb-1">Morgan Rosemberg</h1>
                    <p className="secondary-text mb-4">{t("senior_product_designer")}</p>

                    <div className="mt-2">
                      <a
                        href="mailto:morgan.rosemberg@gmail.com"
                        className="regular-text group inline-block"
                        style={{
                          padding: "2px 4px",
                          transition: "all 0.2s ease",
                          backgroundColor: "#FFC107",
                          maxWidth: "100%",
                          wordBreak: "break-word",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = "#000000"
                          e.currentTarget.style.color = "#FFFFFF"
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = "#FFC107"
                          e.currentTarget.style.color = ""
                        }}
                      >
                        <span className="group-hover:text-white">morgan.rosemberg@gmail.com</span>
                      </a>
                    </div>

                    <div className="mt-3">
                      <a
                        href="https://www.linkedin.com/in/morganrosemberg/"
                        className="regular-text group inline-block"
                        style={{
                          padding: "2px 4px",
                          transition: "all 0.2s ease",
                          backgroundColor: "#FFC107",
                          maxWidth: "100%",
                          wordBreak: "break-word",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = "#000000"
                          e.currentTarget.style.color = "#FFFFFF"
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = "#FFC107"
                          e.currentTarget.style.color = ""
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="font-bold group-hover:text-white">in</span>
                        <span className="group-hover:text-white">&nbsp;{t("linkedin")}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-[#2D2D2D] pb-6">
                <div className="brutalist-accent mb-6 inline-block">
                  <h1 className="heading-text">{t("testimonials")}</h1>
                </div>
                <TestimonialCarousel />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-6 space-y-6 pb-20"
              >
                <div className="brutalist-accent mb-6 inline-block">
                  <h1 className="heading-text">{t("works")}</h1>
                </div>
                {projects.map((project, index) => (
                  <div key={index} className="block pb-6">
                    <ProjectCard
                      project={project}
                      index={index}
                      isHovered={hoveredProject === index}
                      onHover={handleProjectHover}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Boutons en bas à gauche */}
      {!isMobile && mounted && (
        <div className="fixed bottom-6 left-6 z-[9999] flex space-x-14">
          <ClientFontSwitcher />
          <LanguageToggle />
        </div>
      )}
    </>
  )
}
