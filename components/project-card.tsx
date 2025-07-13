"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useTheme } from "@/contexts/theme-context"
import imagePreloader from "@/lib/image-preloader"
import { useLanguage } from "@/contexts/language-context"

interface ProjectCardProps {
  project: {
    id: string
    title: string
    tags: string[]
    company: string
    logo: string
    image: string
    description: string
    period: string
    role: string
  }
  index: number
  isHovered: boolean
  onHover: (index: number | null) => void
}

export default function ProjectCard({ project, index, isHovered, onHover }: ProjectCardProps) {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const { theme } = useTheme()
  const [imageLoaded, setImageLoaded] = useState(false)
  const { t, language } = useLanguage()

  useEffect(() => {
    setIsLoaded(true)
    // Check if the image is already preloaded
    if (imagePreloader.isLoaded(project.image)) {
      setImageLoaded(true)
    } else {
      // Preload this specific image with high priority
      imagePreloader.preload(project.image)
    }
  }, [project.image])

  const handleClick = () => {
    router.push(`/project/${project.id}`)
  }

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isLoaded ? 1 : 0,
        y: isLoaded ? 0 : 20,
      }}
      transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
      className={`group relative py-4 px-3 transition-all duration-300 cursor-pointer project-card ${
        theme === "yellow"
          ? `${isHovered ? "bg-[#F0F0F8]" : "bg-[#F8F8FA]"} rounded-[8px]`
          : `border-2 border-[#000000] ${isHovered ? "bg-[#f0f0f0]" : "bg-white"}`
      }`}
      style={{
        position: "relative",
        zIndex: 10,
        transform: theme === "brutalist" && isHovered ? "translateX(5px)" : "none",
        boxShadow: theme === "brutalist" && isHovered ? "5px 5px 0 #000000" : "none",
        transition: "all 0.3s ease-out",
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onClick={handleClick}
    >
      <div className="relative z-10">
        <div className="flex flex-col text-left">
          <h2
            className={`mb-2 ${theme === "yellow" ? "relative z-10" : ""}`}
            style={{
              transform: isHovered ? "translateX(8px)" : "translateX(0)",
              transition: "transform 0.3s ease-out",
              width: theme === "yellow" ? "fit-content" : "auto",
              position: theme === "yellow" ? "relative" : "static",
            }}
          >
            {getProjectTitle()}
            {theme === "yellow" && (
              <span
                className="absolute bottom-0 left-0 h-[8px] bg-[rgba(255,87,34,0.3)] -z-10 block"
                style={{
                  transform: "rotate(-1deg) translateY(2px)",
                  width: "100%",
                }}
              />
            )}
          </h2>

          <div className="flex items-center justify-between">
            <div className="flex-grow h-px bg-[#2D2D2D] project-line"></div>

            <div className="w-24 flex justify-end ml-4">
              <div
                className="h-8 w-20 flex items-center justify-end project-card-logo"
                style={{
                  transform: isHovered ? "translateX(-8px)" : "translateX(0)",
                  transition: "transform 0.3s ease-out",
                }}
              >
                {project.company === "Disneyland Paris" ? (
                  <img
                    src="/images/disney-logo.png"
                    alt="Disneyland Paris"
                    className="max-h-full object-contain"
                    style={{ filter: theme === "yellow" ? "none" : "grayscale(100%)" }}
                  />
                ) : project.logo ? (
                  <img
                    src={project.logo || "/placeholder.svg"}
                    alt={project.company}
                    className="max-h-full object-contain"
                    style={{ filter: theme === "yellow" ? "none" : "grayscale(100%)" }}
                  />
                ) : (
                  <img
                    src="/placeholder.svg"
                    alt={project.company}
                    className="max-h-full object-contain"
                    style={{ filter: theme === "yellow" ? "none" : "grayscale(100%)" }}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            className="regular-text flex flex-wrap gap-2 mt-2 project-tag text-[#FF5722]"
            style={{
              transform: isHovered ? "translateX(8px)" : "translateX(0)",
              transition: "transform 0.3s ease-out",
              color: "#FF5722" /* Ensuring the color is applied with inline style as well */,
            }}
          >
            {project.tags.map((tag, tagIndex) => (
              <span key={tagIndex}>
                {translateTag(tag)}
                {tagIndex < project.tags.length - 1 ? " | " : ""}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Importation des traductions directement dans le composant pour éviter les problèmes de référence
import { translations } from "@/lib/translations"
