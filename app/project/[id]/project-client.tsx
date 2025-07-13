"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, X } from "lucide-react"
import { useMobileDetector } from "@/components/mobile-detector"
import ColoredLogo from "@/components/colored-logo"
import { projects } from "@/lib/projects-data"
import LoadingScreen from "@/components/loading-screen"
import { useTheme } from "@/contexts/theme-context"
import SpeecheoLayout from "@/components/speecheo-layout"
import ProjectHeroImage from "@/components/project-hero-image"
import "../carousel.css"
import "../cursor-transitions.css"
import "../project-cursor.css"
import FontSwitcher from "@/components/font-switcher"
import { useLanguage } from "@/contexts/language-context"
import LanguageToggle from "@/components/language-toggle"
import { translations } from "@/lib/translations"
import CovidDesignSprint from "@/components/covid-design-sprint"
import { useScrollSpy } from "@/hooks/use-scroll-spy"
import "./anchor-navigation.css"

interface ProjectClientProps {
  projectId: string
}

export default function ProjectClient({ projectId }: ProjectClientProps) {
  const router = useRouter()
  const isMobile = useMobileDetector()
  const [isLoading, setIsLoading] = useState(true)
  const [project, setProject] = useState<(typeof projects)[0] | null>(null)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [isLeftHanded, setIsLeftHanded] = useState(false)
  const { theme } = useTheme()
  const { t, language } = useLanguage()

  const [showAnchorNav, setShowAnchorNav] = useState(false)
  const [anchorLinks, setAnchorLinks] = useState([])

  // Get anchor links based on project ID
  const getAnchorLinks = (projectId: string, language: string) => {
    if (projectId === "addressing-crisis") {
      return [
        { id: "context-section", label: language === "fr" ? "Contexte" : "Context" },
        { id: "challenge-section", label: language === "fr" ? "Défi" : "Challenge" },
        { id: "approach-section", label: language === "fr" ? "Approche" : "Approach" },
        { id: "solution-section", label: language === "fr" ? "Solution" : "Solution" },
        { id: "learnings-section", label: language === "fr" ? "Enseignements" : "Learnings" },
      ]
    } else if (projectId === "edtech-pivot-design") {
      return [
        { id: "speecheo-context", label: language === "fr" ? "Contexte" : "Context" },
        { id: "speecheo-challenge", label: language === "fr" ? "Défi" : "Challenge" },
        { id: "speecheo-partners", label: language === "fr" ? "Partenaires" : "Partners" },
        { id: "speecheo-ideation", label: language === "fr" ? "Idéation" : "Ideation" },
        { id: "speecheo-my-work", label: language === "fr" ? "Mon Travail" : "My Work" },
        { id: "speecheo-user-testing", label: language === "fr" ? "Tests Utilisateurs" : "User Testing" },
        { id: "speecheo-product-evolution", label: language === "fr" ? "Évolution du Produit" : "Product Evolution" },
      ]
    }
    return []
  }

  // Use scroll spy to track active section
  const activeSection = useScrollSpy(
    anchorLinks.map((link) => link.id),
    100,
  )

  // Find the current project and its index
  useEffect(() => {
    const foundProject = projects.find((p) => p.id === projectId)
    const projectIndex = projects.findIndex((p) => p.id === projectId)

    if (foundProject) {
      setProject(foundProject)
      setCurrentProjectIndex(projectIndex !== -1 ? projectIndex : 0)

      // Preload the current project image
      if (foundProject.image) {
        const img = new Image()
        img.src = foundProject.image
      }

      // Only show anchor navigation for specific projects
      const shouldShowAnchorNav = ["addressing-crisis", "edtech-pivot-design"].includes(projectId)
      setShowAnchorNav(shouldShowAnchorNav && !isMobile)

      // Get anchor links for this project
      if (shouldShowAnchorNav) {
        setAnchorLinks(getAnchorLinks(projectId, language))
      } else {
        setAnchorLinks([])
      }
    } else {
      // Redirect to home if project not found
      router.push("/")
    }

    // Hide loading screen after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [projectId, router, language, isMobile])

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isMobile) {
        if (e.key === "ArrowLeft") {
          goToPrevProject()
        } else if (e.key === "ArrowRight") {
          goToNextProject()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [currentProjectIndex, isMobile])

  // Navigate to previous project
  const goToPrevProject = () => {
    const prevIndex = currentProjectIndex > 0 ? currentProjectIndex - 1 : projects.length - 1
    router.push(`/project/${projects[prevIndex].id}`)
  }

  // Navigate to next project
  const goToNextProject = () => {
    const nextIndex = (currentProjectIndex + 1) % projects.length
    router.push(`/project/${projects[nextIndex].id}`)
  }

  const toggleHandedness = () => {
    setIsLeftHanded(!isLeftHanded)
  }

  if (!project) return null

  // Check if this is the first project (big-picture)
  const isFirstProject = project.id === "big-picture"
  // Check if this is the Speecheo project
  const isSpeecheoProject = project.id === "edtech-pivot-design"
  // Check if this is the Proactive Solutionist project
  const isProactiveSolutionist = project.id === "proactive-solutionist"

  // Fonction pour obtenir le titre traduit du projet
  const getProjectTitle = () => {
    // Essayer d'abord avec l'ID exact du projet
    if (translations[project.id] && translations[project.id][language]) {
      return translations[project.id][language]
    }

    // Sinon, essayer avec les anciennes clés de traduction
    const legacyKey = project.id.replace(/-/g, "_")
    if (translations[legacyKey] && translations[legacyKey][language]) {
      return translations[legacyKey][language]
    }

    // Cas spécifiques
    if (isSpeecheoProject) {
      return translations.speecheo_title[language]
    } else if (isProactiveSolutionist) {
      return translations.business_oriented[language]
    }

    // Si aucune traduction n'est trouvée, utiliser le titre original
    return project.title
  }

  // Fonction pour traduire un tag
  const translateTag = (tag: string) => {
    // Convertir le tag en clé de traduction (remplacer les espaces par des underscores et mettre en minuscules)
    const tagKey = tag.toLowerCase().replace(/ /g, "_")

    // Essayer d'abord avec la clé exacte
    if (translations[tagKey] && translations[tagKey][language]) {
      return translations[tagKey][language]
    }

    // Sinon, essayer avec la clé originale
    if (translations[tag] && translations[tag][language]) {
      return translations[tag][language]
    }

    // Si aucune traduction n'est trouvée, utiliser le tag original
    return tag
  }

  // Custom project content based on project ID
  const getProjectContent = () => {
    if (project.id === "big-picture") {
      return (
        <div className="space-y-6">
          <ul className="list-disc pl-5 space-y-2">
            <li className="regular-text">{t("big_picture_bullet1")}</li>
            <li className="regular-text">{t("big_picture_bullet2")}</li>
          </ul>
          <p className="regular-text">{t("big_picture_prizes")}</p>
          <ul className="list-disc pl-5 space-y-2">
            <li className="regular-text">
              🥇 <strong>{t("contentsquare_award")}</strong> {t("contentsquare_desc")}
            </li>
            <li className="regular-text">
              🥇 <strong>{t("abtasty_award")}</strong> {t("abtasty_desc")}
            </li>
          </ul>
        </div>
      )
    } else if (project.id === "beauty-driven") {
      return (
        <div className="space-y-6">
          <h3>{t("hypothesis")}</h3>
          <p className="regular-text">{t("beauty_driven_hypothesis")}</p>

          <h3>{t("proposal_study")}</h3>
          <p className="regular-text">
            <strong>{t("reuse")}:</strong> {t("beauty_driven_reuse")}
          </p>
          <p className="regular-text">
            <strong>{t("track")}:</strong> {t("beauty_driven_track")}
          </p>

          <h3>{t("design_process")}</h3>
          <p className="regular-text">{t("beauty_driven_process1")}</p>
          <p className="regular-text">{t("beauty_driven_process2")}</p>

          <h3>{t("results")}</h3>
          <p className="regular-text">{t("beauty_driven_results")}</p>
        </div>
      )
    } else if (project.id === "addressing-crisis") {
      // Use our new component for the COVID Design Sprint case study
      return (
        <CovidDesignSprint
          context={project.fullContent.context}
          challenge={project.fullContent.challenge}
          approach={project.fullContent.approach}
          phases={project.fullContent.phases}
          solution={project.fullContent.solution}
          learnings={project.fullContent.learnings}
          images={project.fullContent.images}
        />
      )
    } else if (project.id === "data-driven") {
      return (
        <div className="space-y-6">
          <p className="regular-text">{t("data_driven_intro")}</p>
          <ul className="list-disc pl-5 space-y-2">
            <li className="regular-text">
              <strong>{t("quantitative")}</strong>, {t("data_driven_quant")}
            </li>
            <li className="regular-text">
              <strong>{t("usability_tests")}</strong> {t("data_driven_usability")}
            </li>
            <li className="regular-text">
              <strong>{t("iterative_tests")}</strong>: {t("data_driven_iterative")}
            </li>
          </ul>

          <h3 className="mt-8">{t("atomic_research")}</h3>
          <p className="regular-text">{t("data_driven_atomic")}</p>
          <ul className="list-disc pl-5 space-y-2">
            <li className="regular-text">{t("data_driven_atomic1")}</li>
            <li className="regular-text">{t("data_driven_atomic2")}</li>
            <li className="regular-text">{t("data_driven_atomic3")}</li>
          </ul>
        </div>
      )
    } else if (project.id === "design-ops") {
      return (
        <div className="space-y-6">
          <p className="regular-text">{t("design_ops_intro")}</p>
          <p className="regular-text">{t("design_ops_maturity")}</p>
          <ul className="list-disc pl-5 space-y-2">
            <li className="regular-text">{t("design_ops_bullet1")}</li>
            <li className="regular-text">{t("design_ops_bullet2")}</li>
            <li className="regular-text">{t("design_ops_bullet3")}</li>
            <li className="regular-text">{t("design_ops_bullet4")}</li>
            <li className="regular-text">{t("design_ops_bullet5")}</li>
          </ul>
        </div>
      )
    } else if (project.id === "proactive-solutionist") {
      return (
        <div className="space-y-6">
          <h2 className="mb-4">{t("pain_points")}</h2>
          <p className="regular-text">{t("proactive_pain1")}</p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li className="regular-text">{t("proactive_pain_bullet1")}</li>
            <li className="regular-text">{t("proactive_pain_bullet2")}</li>
          </ul>
          <p className="regular-text mb-6">{t("proactive_pain2")}</p>

          <h2 className="mb-4">{t("study_proposal")}</h2>
          <p className="regular-text mb-6">{t("proactive_study")}</p>

          <h2 className="mb-4">{t("results")} 🚀</h2>
          <p className="regular-text mb-6">{t("proactive_results")}</p>

          <h2 className="mb-4">{t("action")}</h2>
          <p className="regular-text">{t("proactive_action")}</p>
        </div>
      )
    } else {
      // For other Disneyland projects, use the original description but in a single column
      return (
        <div className="space-y-6">
          {project.description.split("\n\n").map((paragraph, index) => (
            <p key={index} className="regular-text">
              {t(`${project.id}_paragraph${index + 1}`) || paragraph}
            </p>
          ))}
        </div>
      )
    }
  }

  const handleAnchorClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className={`${showAnchorNav ? "page-with-anchors" : ""} ${isMobile ? "pb-24" : ""}`}>
      {isLoading && <LoadingScreen />}

      {/* Logo in center top for desktop only */}
      {!isMobile && (
        <div
          className="fixed w-full top-4 z-40 px-10 flex items-center justify-center"
          style={{ backgroundColor: "transparent" }}
        >
          <Link href="/" aria-label="Return to home page">
            <div className="cursor-pointer transition-transform hover:scale-105">
              <ColoredLogo />
            </div>
          </Link>
        </div>
      )}

      {/* Project subtitle - displayed above the image */}
      <div className="w-full px-6 pt-6 md:px-8 md:pt-8 bg-transparent">
        <div className="content-container">
          <p
            className="mb-2 text-[#2D2D2D]"
            style={{
              color: "#2D2D2D",
            }}
          >
            {isSpeecheoProject
              ? `${project.company || "Speecheo"} | ${String(currentProjectIndex + 1).padStart(2, "0")}`
              : `Disneyland Paris | ${String(currentProjectIndex + 1).padStart(2, "0")}`}
          </p>
        </div>
      </div>

      {/* Project image - full width with no margins */}
      <div
        className="w-full mt-0 hero-texture"
        style={{
          backgroundColor: "#F1F1F1",
          position: "relative",
        }}
      >
        <div className="w-full h-[40vh] md:h-[66vh] md:max-h-[66vh] relative">
          <ProjectHeroImage
            src={project.image || "/placeholder.svg"}
            alt={getProjectTitle()}
            className="z-10"
            priority={true}
          />
        </div>
      </div>

      {/* Project title and tags */}
      <div className="px-6 pt-8 pb-2 md:px-8 md:pt-12 md:pb-4 w-full">
        <div className="content-container">
          <h1>{getProjectTitle()}</h1>

          {/* Tags and logo with natural flexbox flow */}
          <div className="flex flex-wrap items-center gap-4 mt-4 mb-4">
            <div
              className="flex flex-wrap gap-x-2 regular-text"
              style={{
                color: "#FF5722",
              }}
            >
              {isSpeecheoProject
                ? project.tags.map((tag, index) => (
                    <span key={index}>
                      {index > 0 && " | "}
                      {index === 2 ? t("product_market_fit") : translateTag(tag)}
                    </span>
                  ))
                : isProactiveSolutionist
                  ? [t("proactive_solutionist"), t("data_driven"), t("collab_business")].map((tag, index) => (
                      <span key={index}>
                        {index > 0 && " | "}
                        {tag}
                      </span>
                    ))
                  : project.tags.map((tag, index) => (
                      <span key={index}>
                        {index > 0 && " | "}
                        {translateTag(tag)}
                      </span>
                    ))}
            </div>

            {project.logo && (
              <div className="mt-2 md:mt-0">
                <img
                  src={project.logo || "/placeholder.svg"}
                  alt={project.company}
                  className="h-10 object-contain"
                  style={{ filter: "grayscale(100%)" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Two-column layout for content */}
      <div className="flex flex-row">
        {/* Left column for anchor navigation - only visible on desktop */}
        {showAnchorNav && (
          <div className="hidden md:block w-[200px] flex-shrink-0 border-r border-[#e0e0e0]">
            <div className="sticky top-[120px] pl-8 pr-4 pt-4">
              <ul className="anchor-list">
                {anchorLinks.map((link) => (
                  <li key={link.id} className={`anchor-item ${activeSection === link.id ? "active" : ""}`}>
                    <button
                      onClick={() => handleAnchorClick(link.id)}
                      className="anchor-link"
                      aria-current={activeSection === link.id ? "true" : "false"}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Right column for main content */}
        <div className={`flex-1 px-6 pt-2 pb-8 md:px-8 md:pt-4 md:pb-12 ${showAnchorNav ? "" : "w-full"}`}>
          <div className="content-container">
            {/* Project description */}
            <div className="space-y-6 pb-10">
              {isSpeecheoProject ? (
                <SpeecheoLayout
                  images={project.fullContent?.carousel?.images || []}
                  chapters={project.fullContent?.chapters || []}
                  tools={project.tools || []}
                />
              ) : (
                <div className="grid grid-cols-1 gap-x-8 gap-y-6">{getProjectContent()}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Font switcher and language toggle buttons as separate elements outside the main structure */}
      {!isMobile && (
        <div className="fixed bottom-6 left-6 z-[9999] flex space-x-14">
          <FontSwitcher />
          <LanguageToggle />
        </div>
      )}

      {/* Desktop navigation buttons at bottom right */}
      {!isMobile && (
        <div className="fixed bottom-6 right-6 flex gap-4 z-40">
          <button
            onClick={goToPrevProject}
            aria-label={t("previous_project")}
            style={{
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F9C657",
              color: "black",
              border: "2px solid #000000",
              borderRadius: "0",
            }}
          >
            <ArrowLeft size={28} color="black" />
          </button>

          <Link href="/" aria-label={t("home")}>
            <div
              style={{
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#FFFFFF",
                color: "black",
                border: "2px solid #000000",
                borderRadius: "0",
              }}
            >
              <X size={28} color="#000000" />
            </div>
          </Link>

          <button
            onClick={goToNextProject}
            aria-label={t("next_project")}
            style={{
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FF5722",
              color: "black",
              border: "2px solid #000000",
              borderRadius: "0",
            }}
          >
            <ArrowRight size={28} color="black" />
          </button>
        </div>
      )}

      {/* Mobile navigation buttons */}
      {isMobile && (
        <div
          className="fixed bottom-0 left-0 right-0 p-4 flex justify-between items-center z-20 border-t"
          style={{
            backgroundColor: "#F1F1F1",
            borderColor: "#2D2D2D",
          }}
        >
          {isLeftHanded ? (
            <>
              {/* Navigation buttons on right side when left-handed */}
              <button
                onClick={toggleHandedness}
                className="p-3 flex items-center bg-white text-[#2D2D2D] border-2 border-[#2D2D2D] rounded-none"
              >
                <span className="mr-2">🫱</span>
                <span className="text-sm font-medium">{t("im_lefty")}</span>
              </button>

              <div className="flex gap-4">
                <button
                  onClick={goToPrevProject}
                  className="flex items-center justify-center nav-button-prev"
                  aria-label={t("previous_project")}
                  style={{ backgroundColor: "#F9C657", color: "black", border: "2px solid black", borderRadius: "0" }}
                >
                  <ArrowLeft size={24} color="black" />
                </button>

                <Link href="/" aria-label={t("home")} className="flex items-center justify-center">
                  <div
                    className="flex items-center justify-center nav-button-home"
                    style={{
                      backgroundColor: "#FFFFFF",
                      color: "black",
                      border: "2px solid black",
                      borderRadius: "0",
                      padding: "0.75rem",
                    }}
                  >
                    <X size={24} color="#000000" />
                  </div>
                </Link>

                <button
                  onClick={goToNextProject}
                  className="flex items-center justify-center nav-button-next"
                  aria-label={t("next_project")}
                  style={{
                    backgroundColor: "#FF5722",
                    color: "black",
                    border: "2px solid black",
                    borderRadius: "0",
                    padding: "0.75rem",
                  }}
                >
                  <ArrowRight size={24} color="black" />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Navigation buttons on left side when right-handed */}
              <div className="flex gap-4">
                <button
                  onClick={goToPrevProject}
                  className="flex items-center justify-center nav-button-prev"
                  aria-label={t("previous_project")}
                  style={{
                    backgroundColor: "#F9C657",
                    color: "black",
                    border: "2px solid black",
                    borderRadius: "0",
                    padding: "0.75rem",
                  }}
                >
                  <ArrowLeft size={24} color="black" />
                </button>

                <Link href="/" aria-label={t("home")} className="flex items-center justify-center">
                  <div
                    className="flex items-center justify-center nav-button-home"
                    style={{
                      backgroundColor: "#FFFFFF",
                      color: "black",
                      border: "2px solid black",
                      borderRadius: "0",
                      padding: "0.75rem",
                    }}
                  >
                    <X size={24} color="#000000" />
                  </div>
                </Link>

                <button
                  onClick={goToNextProject}
                  className="flex items-center justify-center nav-button-next"
                  aria-label={t("next_project")}
                  style={{
                    backgroundColor: "#FF5722",
                    color: "black",
                    border: "2px solid black",
                    borderRadius: "0",
                    padding: "0.75rem",
                  }}
                >
                  <ArrowRight size={24} color="black" />
                </button>
              </div>

              <div className="ml-auto">
                <button
                  onClick={toggleHandedness}
                  className="p-3 flex items-center bg-white text-[#2D2D2D] border-2 border-[#2D2D2D] rounded-none"
                >
                  <span className="mr-2">🫲</span>
                  <span className="text-sm font-medium">{t("im_righty")}</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
