"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "@/contexts/theme-context"
import { useLanguage } from "@/contexts/language-context"

type TestimonialProps = {
  name: string
  title: string
  titleKey?: string
  quote: string
  quoteKey?: string
  avatar: string
  connection?: string
  connectionKey?: string
}

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hoveredTestimonial, setHoveredTestimonial] = useState<number | null>(null)
  const { theme } = useTheme()
  const { language, t } = useLanguage()
  const testimonialCardRef = useRef<HTMLDivElement>(null)

  const testimonials: TestimonialProps[] = [
    {
      name: "Marie Guillerm",
      title: "Head of Digital Experience - Disneyland Paris",
      titleKey: "head_digital_experience",
      connection: "PM of my squad during 5 years at Disneyland Paris (2019-2024)",
      connectionKey: "pm_squad_connection",
      quote:
        "I had the chance to work with Morgan for more than three years within the digital team at Disneyland Paris, and I can only recommend him. He was able to adapt to different business, technical, and organizational constraints, without ever losing sight of the user. On a subject as complex as the vacation booking funnel, he proposed solutions that were simple, effective, and well thought out. Always listening, always seeking the right balance, he led the UX from A to Z: research, mockups, tests... and behind it all, the KPIs spoke for themselves. Beyond his UX skills, he is also someone who is really pleasant to work with. Well integrated into the team, comfortable in exchanges with business, developers, or product teams - always with good energy and a real ability to move things forward.",
      quoteKey: "marie_guillerm_quote",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "George Kalmpourtzis, PhD",
      title: "UXR & Lead Learning Expert @EU Commission",
      titleKey: "uxr_lead_learning",
      connection: "UX Researcher at Disneyland (2019-2021)",
      connectionKey: "uxr_connection",
      quote:
        "I had the tremendous honour and pleasure of working with Morgan, during my mission at Disneyland Paris. Morgan was instrumental in the establishment of a design process, aiming to improve the usability and overall user experience of the Disneyland Paris' website, which was at that point going through an extensive revamping exercise. Morgan oversaw several initiatives, aiming to improve Information Architecture, user flows, while also addressing key usability issues that were identified. His capacity to work with different teams, including those of user research and analytics, helped reinforce design processes and rituals. He was a team player, highly professional and always kept an open mind (through a user-centered mindset), facilitating and unblocking the work of the team. For this reason, I strongly recommend Morgan for any UX and Product Design-related roles and I believe that he will be a strong asset for any design team he will be member of.",
      quoteKey: "george_kalmpourtzis_quote",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Mehdi Bargach",
      title: "Product Manager | Freelance | App & E-Commerce",
      titleKey: "product_manager",
      connection: "PO & PM at Disneyland (2019-2024)",
      connectionKey: "po_pm_connection",
      quote:
        "Morgan is one of the best Product Designers I've had the pleasure to work with. He is a creative yet pragmatic expert in designing experiences, able to address both user and business needs effectively. I've relied on his professionalism for many years at Disneyland Paris, especially for the continuous improvement of the Disneylandparis.com reservations site. Beyond his strong expertise, he is also a wonderful colleague to work with—always kind, supportive, and collaborative. His next team will be lucky to have him!",
      quoteKey: "mehdi_bargach_quote",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Kevin Tran",
      title: "Product Owner @ Disneyland Paris",
      titleKey: "product_owner",
      connection: "PO at Disneyland (2022-2024)",
      connectionKey: "po_connection",
      quote:
        "Morgan is amazing. That's the only line you really need to remember. From my first day at Disney, Morgan helped me understand the product through his design vision. Over time, we worked together on many projects, but one, in particular, stands out. Morgan initiated an A/B testing strategy for displaying prices per person and per night, which won us an AB Tasty award for the most ROI-driven campaign of the year, as well as a Contentsquare award. It's always a pleasure to collaborate, brainstorm, and spend time with Morgan. He's very open-minded and always in a good mood. He's exactly the kind of person every team is looking for!",
      quoteKey: "kevin_tran_quote",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Laura Duhommet",
      title: "Experimentation | CRO | CXL Certified | Data Manager",
      titleKey: "experimentation_cro",
      connection: "CRO at Disneyland (2019-2023)",
      connectionKey: "cro_connection",
      quote:
        "I had the opportunity to work with Morgan at Disneyland Paris, and it was a truly enriching experience, particularly when working on UX/UI issues as part of a CRO approach. Morgan is attentive and empathetic with everyone he works with, taking the time to understand the needs of different teams and clients, which really shows in his work. Thanks to this approach, he was able to deliver solutions perfectly aligned with our CRO goals while staying true to his UX expertise. He was an invaluable support, always present to share ideas, test new approaches, and, above all, collaborate with everyone in a spirit of kindness and efficiency. I highly recommend Morgan for any project and hope to cross paths with him again in the future. His professionalism, creativity, and way of working with others make him a true asset to any team.",
      quoteKey: "laura_duhommet_quote",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Joseph Honoré",
      title: "Directeur Commercial PME-PMI chez GazelEnergie",
      titleKey: "directeur_commercial",
      connection: "PM and client for 2 missions with Energy providers (2018-2019)",
      connectionKey: "pm_client_connection",
      quote:
        "I had the chance to work with Morgan for a mission in UX Design. Morgan has demonstrated exceptional adaptability during our collaboration. He's a very good professional, highly involved in his projects.",
      quoteKey: "joseph_honore_quote",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Raphaël Harmel",
      title: "Senior Web Developer @Livongo (US)",
      titleKey: "senior_web_developer",
      connection: "co-founder on Speecheo (2013-2017)",
      connectionKey: "cofounder_connection",
      quote:
        "Morgan is a natural-born problem solver who excels in creating user-friendly UX that helps users do their job more efficiently. He methodically uses ideation, customer discovery, and lean methodology to iterate until he finds the most optimal solution. It was a great learning experience to work with him.",
      quoteKey: "raphael_harmel_quote",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Lisa Barroux",
      title: "Product Owner @ Disneyland Paris",
      titleKey: "product_owner",
      connection: "PO at Disneyland (2022-2024)",
      connectionKey: "po_connection",
      quote:
        "Morgan has been a cornerstone of our team, and working together for over two years has been a true pleasure. His openness to suggestions and ability to incorporate new perspectives were essential in turning our ideas into real successes. Thanks to his dedication and drive to always go further, our team won the award for the 2nd best e-commerce purchasing flow! He knows how to listen, adapt, and guide the team with an expertise that truly elevates every new project. Morgan not only has a talent for design but also brings a positive and supportive energy to every team he works with. I highly recommend him!",
      quoteKey: "lisa_barroux_quote",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  // Custom cursor setup
  useEffect(() => {
    // Create cursor element if it doesn't exist
    let cursor = document.getElementById("carousel-cursor")
    if (!cursor) {
      cursor = document.createElement("div")
      cursor.id = "carousel-cursor"
      cursor.className = `fixed w-10 h-10 pointer-events-none z-50 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-200`
      cursor.style.opacity = "0"
      cursor.style.width = "40px"
      cursor.style.height = "40px"
      cursor.style.borderRadius = theme === "yellow" ? "50%" : "0"
      document.body.appendChild(cursor)
    }

    // Clean up
    return () => {
      if (cursor && document.body.contains(cursor)) {
        document.body.removeChild(cursor)
      }
    }
  }, [theme])

  const nextTestimonial = () => {
    const newIndex = (currentIndex + 1) % testimonials.length
    setCurrentIndex(newIndex)
    setHoveredTestimonial(newIndex)
  }

  const prevTestimonial = () => {
    const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length
    setCurrentIndex(newIndex)
    setHoveredTestimonial(newIndex)
  }

  // Send testimonial data to the left panel
  useEffect(() => {
    // Format the quote with line breaks if a testimonial is hovered
    let formattedQuote = ""
    if (hoveredTestimonial !== null) {
      // Get the translated quote if a quoteKey exists, otherwise use the original quote
      const quoteText = testimonials[hoveredTestimonial].quoteKey
        ? t(testimonials[hoveredTestimonial].quoteKey as string)
        : testimonials[hoveredTestimonial].quote

      // Split the quote into sentences and add paragraph breaks
      formattedQuote = quoteText
        .split(". ")
        .map((sentence, i, array) => {
          // Add paragraph break after every 2-3 sentences
          if ((i + 1) % 2 === 0 && i < array.length - 1) {
            return sentence + ".\n\n"
          } else if (i === array.length - 1) {
            return sentence + (sentence.endsWith(".") ? "" : ".")
          } else {
            return sentence + ". "
          }
        })
        .join("")
    }

    // Create a custom event to communicate with the page component
    const event = new CustomEvent("testimonialHover", {
      detail: {
        isHovered: hoveredTestimonial !== null,
        testimonial:
          hoveredTestimonial !== null
            ? {
                ...testimonials[hoveredTestimonial],
                // Include name and info explicitly to ensure they're sent to the left panel
                name: testimonials[hoveredTestimonial].name,
                title: testimonials[hoveredTestimonial].titleKey
                  ? t(testimonials[hoveredTestimonial].titleKey as string)
                  : testimonials[hoveredTestimonial].title,
                connection: testimonials[hoveredTestimonial].connectionKey
                  ? t(testimonials[hoveredTestimonial].connectionKey as string)
                  : testimonials[hoveredTestimonial].connection,
                // Use the formatted quote with line breaks
                quote: formattedQuote,
                // Add theme information for the quotation mark - use the same quoteColor variable
                themeColor: theme === "yellow" ? "#F9C657" : "#FF5722",
              }
            : null,
      },
    })
    window.dispatchEvent(event)
  }, [hoveredTestimonial, theme, language, t])

  // Direct DOM manipulation for testimonial scrolling
  useEffect(() => {
    // Function to handle mouse movement on testimonial card
    const handleMouseMove = (e: MouseEvent) => {
      if (!testimonialCardRef.current || hoveredTestimonial === null) return

      const rect = testimonialCardRef.current.getBoundingClientRect()
      const y = e.clientY - rect.top
      const scrollPercentage = Math.max(0, Math.min(1, y / rect.height))

      // Find the right panel element more reliably
      const rightPanel = document.querySelector(".right-panel")
      if (rightPanel) {
        // Find the testimonial quote paragraph within the right panel
        const quoteParagraph = rightPanel.querySelector(".regular-text.leading-relaxed.whitespace-pre-line")
        if (quoteParagraph) {
          // Get the parent container that has scrolling capability
          const scrollContainer = quoteParagraph.closest(".max-w-md")
          if (scrollContainer) {
            // Calculate the maximum scroll based on content height
            const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight

            // Apply the scroll position based on percentage
            if (maxScroll > 0) {
              scrollContainer.scrollTop = scrollPercentage * maxScroll
            }
          }
        }
      }
    }

    // Add event listener to testimonial card
    const testimonialCard = testimonialCardRef.current
    if (testimonialCard) {
      testimonialCard.addEventListener("mousemove", handleMouseMove)
    }

    // Clean up
    return () => {
      if (testimonialCard) {
        testimonialCard.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [hoveredTestimonial])

  const currentTestimonial = testimonials[currentIndex]

  const showCursor = (e: React.MouseEvent, isLeftSide: boolean) => {
    const cursor = document.getElementById("carousel-cursor")
    if (cursor) {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`
      cursor.style.opacity = "1"

      if (theme === "yellow") {
        // Yellow theme styling - circular buttons
        const width = "40px"
        const height = "40px"
        const borderRadius = "50%"
        const display = "flex"
        const alignItems = "center"
        const justifyContent = "center"
        const padding = "0"

        if (isLeftSide) {
          cursor.className = `fixed w-10 h-10 pointer-events-none z-50 flex items-center justify-center bg-[#8486DE] text-[#FFFCD2] transform -translate-x-1/2 -translate-y-1/2 opacity-1 transition-opacity duration-200 rounded-full`
          cursor.style.width = width
          cursor.style.height = height
          cursor.style.borderRadius = borderRadius
          cursor.style.display = display
          cursor.style.alignItems = alignItems
          cursor.style.justifyContent = justifyContent
          cursor.style.padding = padding
          cursor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFCD2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>`
        } else {
          cursor.className = `fixed w-10 h-10 pointer-events-none z-50 flex items-center justify-center bg-[#F9C657] text-[#FFFCD2] transform -translate-x-1/2 -translate-y-1/2 opacity-1 transition-opacity duration-200 rounded-full`
          cursor.style.width = width
          cursor.style.height = height
          cursor.style.borderRadius = borderRadius
          cursor.style.display = display
          cursor.style.alignItems = alignItems
          cursor.style.justifyContent = justifyContent
          cursor.style.padding = padding
          cursor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFCD2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>`
        }
      } else {
        // Brutalist theme styling - square buttons with borders
        const width = "40px"
        const height = "40px"
        const borderRadius = "0"
        const display = "flex"
        const alignItems = "center"
        const justifyContent = "center"
        const padding = "0"
        const border = "2px solid #000000"

        if (isLeftSide) {
          cursor.className = `fixed w-10 h-10 pointer-events-none z-50 flex items-center justify-center bg-[#F9C657] text-black transform -translate-x-1/2 -translate-y-1/2 opacity-1 transition-opacity duration-200`
          cursor.style.width = width
          cursor.style.height = height
          cursor.style.borderRadius = borderRadius
          cursor.style.display = display
          cursor.style.alignItems = alignItems
          cursor.style.justifyContent = justifyContent
          cursor.style.padding = padding
          cursor.style.border = border
          cursor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>`
        } else {
          cursor.className = `fixed w-10 h-10 pointer-events-none z-50 flex items-center justify-center bg-[#FF5722] text-black transform -translate-x-1/2 -translate-y-1/2 opacity-1 transition-opacity duration-200`
          cursor.style.width = width
          cursor.style.height = height
          cursor.style.borderRadius = borderRadius
          cursor.style.display = display
          cursor.style.alignItems = alignItems
          cursor.style.justifyContent = justifyContent
          cursor.style.padding = padding
          cursor.style.border = border
          cursor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>`
        }
      }
    }
  }

  // Handle cursor visibility
  const hideCursor = () => {
    const cursor = document.getElementById("carousel-cursor")
    if (cursor) cursor.style.opacity = "0"
  }

  // Get theme-specific styles - exact colors from the original versions
  const quoteColor = theme === "brutalist" ? "text-[#FF5722]" : theme === "yellow" ? "text-[#F9C657]" : "text-[#8A00FF]"
  const hoverBg = theme === "brutalist" ? "bg-[#F1F1F1]" : theme === "yellow" ? "bg-[#F8F8F8]" : "bg-[#F5F5F5]"
  const bulletBg = theme === "brutalist" ? "bg-[#2D2D2D]" : theme === "yellow" ? "bg-[#FFB096]" : "bg-[#737373]"
  const bulletInactiveBg = theme === "brutalist" ? "bg-[#F1F1F1]" : theme === "yellow" ? "bg-[#F8F8F8]" : "bg-[#F5F5F5]"
  const lineColor = theme === "brutalist" ? "bg-[#2D2D2D]" : theme === "yellow" ? "bg-[#DDDDDD]" : "bg-[#EEEEEE]"
  const connectionColor =
    theme === "brutalist" ? "text-[#FFC107]" : theme === "yellow" ? "text-[#444444]" : "text-[#0078FF]"

  return (
    <div className="mt-4 mb-2">
      <div className="relative" onMouseLeave={hideCursor}>
        <div
          ref={testimonialCardRef}
          className={`group relative pt-4 pb-0 px-6 transition-all duration-150 testimonial-card ${
            hoveredTestimonial === currentIndex ? (theme === "yellow" ? "bg-[#F0F0F8]" : "bg-[#f0f0f0]") : ""
          } cursor-none h-[180px] overflow-y-auto mb-0 ${
            theme === "yellow"
              ? "rounded-[8px] bg-[#F8F8FA] hover:transform hover:-translate-y-[2px] hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
              : "border-2 border-[#000000]"
          }`}
          onMouseEnter={() => setHoveredTestimonial(currentIndex)}
          onMouseLeave={() => {
            setHoveredTestimonial(null)
            hideCursor()
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = e.clientX - rect.left
            const isLeftSide = x < rect.width / 2
            showCursor(e, isLeftSide)
          }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = e.clientX - rect.left
            const isLeftSide = x < rect.width / 2

            if (isLeftSide) {
              prevTestimonial()
            } else {
              nextTestimonial()
            }
          }}
        >
          <div className="flex flex-col relative z-10">
            {/* Top container: quotation mark and name side by side */}
            <div className="flex mb-2">
              {/* Quotation mark */}
              <div className={`${quoteColor} mr-6 flex-shrink-0 flex items-center`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Name */}
              <h2
                className="subheading-text"
                style={{
                  transform: hoveredTestimonial === currentIndex ? "translateX(8px)" : "translateX(0)",
                  transition: "transform 0.3s ease-out",
                }}
              >
                {currentTestimonial.name}
              </h2>
            </div>

            {/* Title container - aligned with quotation mark */}
            <p
              className="regular-text mb-2"
              style={{
                transform: hoveredTestimonial === currentIndex ? "translateX(8px)" : "translateX(0)",
                transition: "transform 0.3s ease-out",
              }}
            >
              {currentTestimonial.titleKey ? t(currentTestimonial.titleKey) : currentTestimonial.title}
            </p>

            {/* Line divider - same as project cards */}
            <div className="flex items-center justify-between mb-2">
              <div className={`flex-grow h-px ${lineColor} project-line`}></div>
            </div>

            {/* Connection below the line, aligned left */}
            {currentTestimonial.connection && (
              <div
                className={`regular-text mb-2 connection-text ${connectionColor}`}
                style={{
                  transform: hoveredTestimonial === currentIndex ? "translateX(8px)" : "translateX(0)",
                  transition: "transform 0.3s ease-out",
                }}
              >
                <p>
                  {t("connection")}:{" "}
                  {currentTestimonial.connectionKey
                    ? t(currentTestimonial.connectionKey)
                    : currentTestimonial.connection}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Update carousel arrows to match brutalist style */}
        <div className="flex justify-center items-center mt-2 px-6">
          <div className="flex justify-center gap-1">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentIndex(index)
                  setHoveredTestimonial(index)
                }}
                className={`w-[6px] h-[6px] transform scale-[0.33] ${index === currentIndex ? "bg-[#000000]" : bulletInactiveBg}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
