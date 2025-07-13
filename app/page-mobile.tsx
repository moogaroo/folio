"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import ColoredLogo from "@/components/colored-logo"
import { projects } from "@/lib/projects-data"
import { useRouter } from "next/navigation"
import LoadingScreen from "@/components/loading-screen"
import { useTheme } from "@/contexts/theme-context"
import FontSwitcher from "@/components/font-switcher"
import { preloadProjectImages } from "@/lib/image-preloader"
import ProjectHeroImage from "@/components/project-hero-image"
import { useLanguage } from "@/contexts/language-context"
import LanguageToggle from "@/components/language-toggle"

export default function MobileHome() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { theme } = useTheme()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  // Hide loading screen after a short delay
  useEffect(() => {
    // Preload all project thumbnails
    preloadProjectImages(projects)

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Handle project click - navigate to project page
  const handleProjectClick = (index: number) => {
    if (index >= 0 && index < projects.length) {
      router.push(`/project/${projects[index].id}`)
    }
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {isLoading && <LoadingScreen />}

      {/* Main horizontal scrolling container */}
      <div
        className="flex-1 overflow-x-auto overflow-y-hidden px-4"
        style={{
          backgroundColor: "#F1F1F1",
        }}
        ref={scrollContainerRef}
      >
        <div className="flex h-full items-start px-4 pt-6 pb-2" style={{ paddingTop: "24px" }}>
          {/* Profile Card */}
          <div
            className="flex-shrink-0 mr-6 h-[70vh] w-[75vw] cursor-pointer"
            onClick={() => router.push("/me")}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "0",
              border: "2px solid #000000",
              boxShadow: "5px 5px 0 #000000",
            }}
          >
            <div className="flex flex-col h-full">
              {/* Profile Image */}
              <div className="w-full h-[45%] relative overflow-hidden">
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    backgroundColor: "#F1F1F1",
                    borderTopLeftRadius: "0",
                    borderTopRightRadius: "0",
                  }}
                >
                  <img
                    src="/images/profile-with-yellow-bg.png"
                    alt="Morgan Rosemberg"
                    className="h-[90%] w-auto object-contain"
                  />
                </div>
              </div>

              {/* Profile Content */}
              <div className="p-4 flex-1 flex flex-col">
                <h1 className="heading-text mb-1">Morgan Rosemberg</h1>
                <p className="secondary-text mb-2">{t("senior_product_designer")}</p>

                {/* Line divider */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-grow h-px bg-[#2D2D2D]"></div>
                </div>

                {/* Email and LinkedIn links moved here */}
                <div className="email-container mb-2">
                  <a
                    href="mailto:morgan.rosemberg@gmail.com"
                    className="regular-text inline-block transition-all hover:font-bold hover:text-[#FF5722] bg-[#FFC107] px-2 py-1"
                  >
                    morgan.rosemberg@gmail.com
                  </a>
                </div>
                <div className="linkedin-container">
                  <a
                    href="https://www.linkedin.com/in/morganrosemberg/"
                    className="regular-text inline-block transition-all hover:font-bold hover:text-[#607D8B] bg-[#FFC107] px-2 py-1"
                  >
                    <span className="font-bold">in</span> {t("linkedin")}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Project Cards */}
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex-shrink-0 mr-6 h-[70vh] w-[75vw] cursor-pointer"
              onClick={() => handleProjectClick(index)}
            >
              <div
                className="flex flex-col h-full"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "0",
                  border: "2px solid #000000",
                  boxShadow: "5px 5px 0 #000000",
                }}
              >
                {/* Project Image */}
                <div
                  className="w-full h-[60%] relative overflow-hidden flex items-center justify-center"
                  style={{
                    backgroundColor: "#F1F1F1",
                    borderTopLeftRadius: "0",
                    borderTopRightRadius: "0",
                  }}
                >
                  <ProjectHeroImage
                    src={project.image || "/placeholder.svg"}
                    alt={t(project.id) || project.title}
                    className="max-w-full max-h-full p-2"
                    priority={index < 2} // Only prioritize loading the first two images
                  />
                </div>

                {/* Project Content */}
                <div className="p-4 flex-1 flex flex-col">
                  <h2
                    className="subheading-text mb-2"
                    style={{
                      fontSize: "18px",
                      lineHeight: "1.3",
                      wordBreak: "break-word",
                    }}
                  >
                    {t(project.id) || project.title}
                  </h2>

                  {/* Line and Logo */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-grow h-px bg-[#2D2D2D]"></div>
                    <div className="w-16 flex justify-end ml-2">
                      {project.company === "Disneyland Paris" ? (
                        <img
                          src="/images/disney-logo.png"
                          alt="Disneyland Paris"
                          className="max-h-6 object-contain"
                          style={{ filter: "grayscale(100%)" }}
                        />
                      ) : project.company === "Speecheo" ? (
                        <img
                          src="/images/speecheo-logo.png"
                          alt="Speecheo"
                          className="max-h-6 object-contain"
                          style={{ filter: "grayscale(100%)" }}
                        />
                      ) : project.logo ? (
                        <img
                          src={project.logo || "/placeholder.svg"}
                          alt={project.company}
                          className="max-h-6 object-contain"
                          style={{ filter: "grayscale(100%)" }}
                        />
                      ) : (
                        <img
                          src="/placeholder.svg"
                          alt={project.company}
                          className="max-h-6 object-contain"
                          style={{ filter: "grayscale(100%)" }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="regular-text flex flex-wrap gap-1 text-[#607D8B]">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-sm">
                        {t(tag.toLowerCase().replace(/ /g, "_")) ||
                          (tag === "User Experience" ? "Continuous improvement" : tag)}
                        {tagIndex < project.tags.length - 1 ? " | " : ""}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add an explicit spacer element at the end */}
          <div className="flex-shrink-0 w-12 h-1"></div>
        </div>
      </div>

      {/* Bottom navigation bar */}
      <div
        className="fixed bottom-0 left-0 right-0 backdrop-blur-sm p-4 flex justify-between items-center z-20 border-t"
        style={{
          backgroundColor: "rgba(241, 241, 241, 0.9)",
          borderColor: "#2D2D2D",
        }}
      >
        <div className="flex items-center">
          <Link href="/" aria-label="Home" className="hover:bg-transparent border-0 hover:border-0 p-0">
            <ColoredLogo borderWidth="2px" />
          </Link>
        </div>

        <nav className="flex gap-4 items-center">
          <Link href="/testimonials" className="regular-text font-bold hover:opacity-70 transition-opacity">
            {t("testimonials")}
          </Link>
          <Link href="/me" className="regular-text font-bold hover:opacity-70 transition-opacity">
            {t("me")}
          </Link>
          <div className="ml-1 flex items-center gap-2">
            <LanguageToggle />
            <FontSwitcher />
          </div>
        </nav>
      </div>
    </div>
  )
}
