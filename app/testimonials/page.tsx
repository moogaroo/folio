"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useMobileDetector } from "@/components/mobile-detector"
import ColoredLogo from "@/components/colored-logo"
import { useTheme } from "@/contexts/theme-context"
import ClientFontSwitcher from "@/components/client-font-switcher"
import { useLanguage } from "@/contexts/language-context"
import LanguageToggle from "@/components/language-toggle"

export default function Testimonials() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [expandedTestimonial, setExpandedTestimonial] = useState<number | null>(null)
  const isMobile = useMobileDetector()
  const { theme } = useTheme()
  const { language, t } = useLanguage()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  // Liste des témoignages
  const testimonialKeys = [
    "marie_guillerm_quote",
    "george_kalmpourtzis_quote",
    "mehdi_bargach_quote",
    "kevin_tran_quote",
    "laura_duhommet_quote",
    "joseph_honore_quote",
    "raphael_harmel_quote",
    "lisa_barroux_quote",
  ]

  const testimonials = [
    {
      name: "Marie Guillerm",
      title: "Head of Digital Experience - Disneyland Paris",
      connection: "PM of Morgan's squad during his 5 years at Disneyland Paris (2019-2024)",
      quoteKey: "marie_guillerm_quote",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "George Kalmpourtzis, PhD",
      title: "UXR & Lead Learning Expert @EU Commission",
      connection: "UX Researcher at Disneyland (2019-2021)",
      quoteKey: "george_kalmpourtzis_quote",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Mehdi Bargach",
      title: "Product Manager | Freelance | App & E-Commerce",
      connection: "PO & PM at Disneyland (2019-2024)",
      quoteKey: "mehdi_bargach_quote",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Kevin Tran",
      title: "Product Owner @ Disneyland Paris",
      quoteKey: "kevin_tran_quote",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Laura Duhommet",
      title: "Experimentation | CRO | CXL Certified | Data Manager",
      connection: "CRO at Disneyland (2019-2023)",
      quoteKey: "laura_duhommet_quote",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Joseph Honoré",
      title: "Directeur Commercial PME-PMI chez GazelEnergie",
      connection: "PM and client for 2 missions with Energy providers (2018-2019)",
      quoteKey: "joseph_honore_quote",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Raphaël Harmel",
      title: "Senior Web Developer @Livongo (US)",
      connection: "co-founder on Speecheo (2013-2017)",
      quoteKey: "raphael_harmel_quote",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Lisa Barroux",
      title: "Product Owner @Disneyland Paris",
      quoteKey: "lisa_barroux_quote",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  const transition = { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }

  return (
    <main className="min-h-screen p-10 pb-32 md:pb-24 md:pt-24" style={{ backgroundColor: "#F1F1F1" }}>
      {/* Desktop-only header - sticky at the top of the window */}
      {!isMobile && (
        <div
          className="fixed top-0 left-0 right-0 flex justify-between items-center py-4 px-10 z-50"
          style={{ backgroundColor: "#F1F1F1" }}
        >
          <Link href="/" className="flex items-center gap-2 regular-text hover:text-[#607D8B] transition-opacity">
            <ArrowLeft size={16} />
            {t("back")}
          </Link>
          <Link href="/" aria-label="Home" className="hover:bg-transparent border-0 hover:border-0 p-0">
            <ColoredLogo />
          </Link>
          <nav className="flex gap-4 items-center">
            <span className="regular-text opacity-50">{t("testimonials")}</span>
            <Link href="/me" className="regular-text hover:text-[#607D8B] transition-opacity">
              {t("me")}
            </Link>
          </nav>
        </div>
      )}

      <div className="mb-10 mt-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="heading-text mb-1"
        >
          {t("testimonials_title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="secondary-text"
        >
          {t("awards_recognition")}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4 mb-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="regular-text"
        >
          - {t("ab_test")}
          <br />- {t("ux_award")}
          <br />- {t("linkedin_recommendations")}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
            className="p-6 cursor-pointer bg-[#F8F8F8] border border-[#DDDDDD] rounded-[2px]"
            onClick={() => setExpandedTestimonial(expandedTestimonial === index ? null : index)}
          >
            <div className="flex items-start mb-2">
              <div className="text-[#FF5722] mr-4 flex-shrink-0">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 491.202 491.202"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M97.714,232.08v37.867c0,5.137-4.164,9.304-9.304,9.304c-18.326,0-28.289,18.79-29.669,55.88H88.41
c5.14,0,9.304,4.162,9.304,9.305v79.954c0,5.137-4.164,9.298-9.304,9.298H9.304c-5.14,0-9.304-4.161-9.304-9.298v-79.954
c0-17.78,1.791-34.105,5.32-48.516c3.621-14.766,9.176-27.681,16.506-38.385c7.548-10.994,16.991-19.627,28.067-25.638
c11.148-6.046,24.107-9.115,38.523-9.115C93.55,222.782,97.714,226.947,97.714,232.08z M217.646,222.782
c-14.411,0-27.376,3.068-38.523,9.115c-11.077,6.011-20.52,14.644-28.067,25.638c-7.335,10.71-12.886,23.619-16.512,38.396
c-3.529,14.41-5.314,30.724-5.314,48.504v79.954c0,5.137,4.165,9.298,9.298,9.298h79.113c5.133,0,9.297-4.161,9.297-9.298v-79.954
c0-5.143-4.164-9.305-9.297-9.305h-29.252c1.362-37.09,11.186-55.88,29.252-55.88c5.133,0,9.297-4.167,9.297-9.304V232.08
C226.944,226.947,222.78,222.782,217.646,222.782z M481.904,57.515h-79.109c-5.136,0-9.304,4.164-9.304,9.304v79.949
c0,5.139,4.161,9.304,9.304,9.304h29.666c-1.377,37.09-11.343,55.877-29.666,55.877c-5.136,0-9.304,4.164-9.304,9.304v37.867
c0,5.137,4.161,9.304,9.304,9.304c14.411,0,27.373-3.074,38.521-9.114c11.071-6.018,20.517-14.639,28.059-25.645
c7.329-10.701,12.886-23.61,16.509-38.384c3.528-14.411,5.319-30.73,5.319-48.513V66.818
C491.208,61.679,487.035,57.515,481.904,57.515z M352.672,57.515h-79.109c-5.131,0-9.298,4.164-9.298,9.304v79.949
c0,5.139,4.167,9.304,9.298,9.304h29.252c-1.365,37.09-11.188,55.877-29.252,55.877c-5.131,0-9.298,4.164-9.298,9.304v37.867
c0,5.137,4.167,9.304,9.298,9.304c14.41,0,27.378-3.074,38.526-9.114c11.076-6.018,20.516-14.639,28.058-25.645
c7.342-10.701,12.897-23.61,16.521-38.39c3.523-14.405,5.309-30.724,5.309-48.5V66.818
C361.976,61.679,357.809,57.515,352.672,57.515z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="subheading-text">{testimonial.name}</h2>
                <p className="regular-text">{testimonial.title}</p>
              </div>
            </div>

            {/* Line divider */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex-grow h-px bg-[#DDDDDD] project-line"></div>
            </div>

            {/* Connection below the line */}
            {testimonial.connection && (
              <div className="regular-text mb-4 text-[#FF5722]">
                <p>
                  {t("connection")}: {testimonial.connection}
                </p>
              </div>
            )}

            <div className="mb-4">
              {expandedTestimonial === index ? (
                <div className="regular-text leading-relaxed">
                  "
                  {t(testimonial.quoteKey)
                    .split(". ")
                    .map((sentence, i, array) => {
                      // Group sentences into paragraphs (roughly 2-3 sentences per paragraph)
                      if ((i + 1) % 3 === 0 && i < array.length - 1) {
                        return (
                          <p key={i}>
                            {sentence}. <br />
                            <br />
                          </p>
                        )
                      } else if (i === array.length - 1) {
                        return (
                          <span key={i}>
                            {sentence}
                            {sentence.endsWith(".") ? "" : "."}
                          </span>
                        )
                      } else {
                        return <span key={i}>{sentence}. </span>
                      }
                    })}
                  "
                </div>
              ) : (
                <div className="relative">
                  <p className="text-[#2D2D2D] text-base leading-relaxed">
                    "{t(testimonial.quoteKey).substring(0, 120)}..."
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#F8F8F8] to-transparent"></div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

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

        <div className="flex items-center gap-4">
          <nav className="flex gap-4 items-center">
            <span className="regular-text font-bold bg-black text-white px-2 py-1">{t("testimonials")}</span>
            <Link
              href="/me"
              className="regular-text font-bold hover:bg-black hover:text-white hover:px-2 hover:py-1 transition-all"
            >
              {t("me")}
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ClientFontSwitcher />
          </div>
        </div>
      </div>
    </main>
  )
}
