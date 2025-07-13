"use client"

import { useEffect } from "react"
import { useTheme } from "@/contexts/theme-context"

export default function LogoBalloons() {
  const { theme } = useTheme()

  useEffect(() => {
    // Ne rien afficher en mode brutalist
    if (theme === "brutalist") return

    // Configuration
    const config = {
      circleCount: 15,
      // Couleurs extraites de l'image partagée
      yellowThemeColors: ["#F9C657", "#8486DE", "#FFFCD2", "#FF9A56"],
      defaultThemeColors: ["#F9C657", "#8486DE", "#FFFCD2", "#FF9A56"],
      zIndex: -1, // IMPORTANT: Valeur négative pour être derrière tout contenu
      minSize: 15,
      maxSize: 40,
      parallaxFactors: [0.5, 0.7, 0.9, 1.1, 1.3], // Facteurs plus élevés pour un effet plus visible
    }

    // IMPORTANT: Trouver le panneau de gauche qui défile pour y attacher les cercles
    // Cela garantit que les cercles n'apparaîtront que dans le panneau gauche
    const leftPanel = document.querySelector(".left-panel-bg")
    if (!leftPanel) {
      console.error("Panneau de gauche non trouvé, impossible d'ajouter les cercles")
      return
    }

    // S'assurer que le panneau a une position relative pour le positionnement des cercles
    leftPanel.style.position = "relative"

    // Créer le conteneur des cercles dans le panneau de gauche uniquement
    const container = document.createElement("div")
    Object.assign(container.style, {
      position: "absolute", // Absolu par rapport au panneau gauche
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden",
      pointerEvents: "none",
      zIndex: config.zIndex,
    })
    leftPanel.appendChild(container)

    // Création des cercles
    const circles = []
    for (let i = 0; i < config.circleCount; i++) {
      const colors = theme === "yellow" ? config.yellowThemeColors : config.defaultThemeColors
      const color = colors[Math.floor(Math.random() * colors.length)]

      const size = config.minSize + Math.random() * (config.maxSize - config.minSize)
      const x = Math.random() * 100
      const y = 50 + Math.random() * 100 // Commencer plus bas dans la page

      // Facteur de parallax aléatoire
      const parallaxFactor = config.parallaxFactors[Math.floor(Math.random() * config.parallaxFactors.length)]

      const circle = document.createElement("div")
      Object.assign(circle.style, {
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        borderRadius: "50%",
        border: "2px solid #000000",
        boxShadow: "inset 0px 0px 8px rgba(0, 0, 0, 0.3), 0px 3px 5px rgba(0, 0, 0, 0.2)",
        willChange: "transform", // Optimisation de performance
        transform: "translateY(0)", // Position initiale
      })

      circle.dataset.initialY = y.toString()
      circle.dataset.parallaxFactor = parallaxFactor.toString()

      container.appendChild(circle)
      circles.push(circle)
    }

    // Fonction pour mettre à jour la position des cercles lors du défilement
    // MODIFICATION IMPORTANTE: Utilisation directe du scrollY sans calcul complexe
    function handleScroll() {
      // Position de défilement actuelle
      const scrollY = window.scrollY || window.pageYOffset

      circles.forEach((circle) => {
        const factor = Number.parseFloat(circle.dataset.parallaxFactor)

        // Calcul simple: plus le facteur est élevé, plus le mouvement est important
        const yOffset = scrollY * factor

        // Appliquer le mouvement vers le haut au défilement
        circle.style.transform = `translateY(-${yOffset}px)`
      })
    }

    // Animation flottante en plus de l'effet parallax
    const style = document.createElement("style")
    style.textContent = `
      @keyframes float-vertical {
        0% { margin-top: 0px; }
        100% { margin-top: -10px; }
      }
    `
    document.head.appendChild(style)

    circles.forEach((circle) => {
      const duration = 2 + Math.random() * 3
      const delay = Math.random() * 2
      circle.style.animation = `float-vertical ${duration}s ease-in-out ${delay}s infinite alternate`
    })

    // Initialiser et ajouter les écouteurs d'événements
    handleScroll() // Position initiale en fonction du défilement
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Nettoyage
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (leftPanel && leftPanel.contains(container)) {
        leftPanel.removeChild(container)
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [theme])

  return null
}
