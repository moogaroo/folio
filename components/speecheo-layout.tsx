"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { getTranslation } from "@/lib/translations"
import YouTubeEmbed from "@/components/youtube-embed"
import SnapCarousel from "@/components/snap-carousel"

interface CarouselImage {
  src: string
  alt: string
  caption: string
}

interface Chapter {
  title: string
  content: string[]
  additionalImages?: CarouselImage[]
}

interface SpeecheoLayoutProps {
  images?: string[]
  chapters?: {
    title: string
    content: string
    videoId?: string
  }[]
  tools?: string[]
}

export default function SpeecheoLayout({ images = [], chapters = [], tools = [] }: SpeecheoLayoutProps) {
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(key, language)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= 768)
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768)
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Helper function to split text evenly between columns
  const splitTextEvenly = (text: string) => {
    // Split the text into individual lines
    const lines = text.split("\n").filter((line) => line.trim() !== "")
    const midpoint = Math.ceil(lines.length / 2)

    return {
      firstHalf: lines.slice(0, midpoint).join("\n"),
      secondHalf: lines.slice(midpoint).join("\n"),
    }
  }

  // Helper function to render paragraphs
  const renderParagraphs = (text: string) => {
    return text.split("\n").map((paragraph, index) => (
      <p key={index} className="mb-4">
        {paragraph}
      </p>
    ))
  }

  return (
    <div className="speecheo-layout mt-8 space-y-10 md:space-y-10">
      {/* Tools section */}
      {tools && tools.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">{t("speecheo_tools")}</h3>
          <div className="flex flex-wrap gap-3">
            {tools.map((tool, index) => (
              <span key={index} className="px-3 py-1 text-sm bg-[#f8f8f8] text-[#444444] rounded-full">
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Introduction section with images */}
      <section id="speecheo-context" className="mb-10">
        <h3 className="text-xl font-semibold mb-4">{t("speecheo_context")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="md:pr-4 md:border-r-2 md:border-gray-300">
            {renderParagraphs(splitTextEvenly(t("speecheo_context_p1") + "\n" + t("speecheo_context_p2")).firstHalf)}
          </div>
          <div className="md:pl-4">
            {renderParagraphs(splitTextEvenly(t("speecheo_context_p1") + "\n" + t("speecheo_context_p2")).secondHalf)}
          </div>
        </div>

        {/* Context carousel with Microsoft Techdays image and new screenshots */}
        <div className="mt-8">
          <SnapCarousel
            images={[
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.jpg-zAqOAUsog4wZrsVOW6FlkaWkhccwy3.jpeg",
                alt: t("speecheo_microsoft_techdays"),
                caption: t("speecheo_microsoft_techdays"),
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Speecheo%20screen-2013-0FS4KFZ6HdBrAJrIDlHmNcw1nApi2Q.png",
                alt: t("speecheo_platform_2013"),
                caption: t("speecheo_platform_2013"),
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Speecheo%20screen-2014-lRB2n5ZTvOrpMqfQcMRjzPV3UvR6N5.png",
                alt: t("speecheo_note_taking"),
                caption: t("speecheo_note_taking"),
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Speecheo%20in%20class-7hvaTFPKmUHhEsICPxMVJMLAOvwBBl.png",
                alt: t("speecheo_classroom"),
                caption: t("speecheo_classroom"),
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Speecheo%20screen-2016.jpg-poa2qZi4UXth6udE4ayz0j1pSi9k1g.jpeg",
                alt: t("speecheo_platform_2016"),
                caption: t("speecheo_platform_2016"),
              },
            ]}
            shadowClass="shadow-md"
          />
        </div>
      </section>

      {/* Challenge section */}
      <section id="speecheo-challenge" className="mb-10">
        <h3 className="text-xl font-semibold mb-4">{t("speecheo_challenge")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="md:pr-4 md:border-r-2 md:border-gray-300">
            {renderParagraphs(splitTextEvenly(t("speecheo_challenge_text")).firstHalf)}
          </div>
          <div className="md:pl-4">{renderParagraphs(splitTextEvenly(t("speecheo_challenge_text")).secondHalf)}</div>
        </div>

        {/* YouTube video remains separate */}
        <div className="my-16">
          <YouTubeEmbed videoId="nadeyw25v-Y" caption={t("speecheo_sorbonne")} />
        </div>
      </section>

      {/* Partner brands carousel */}
      <section id="speecheo-partners" className="mb-10">
        <h3 className="text-xl font-semibold mb-4">{t("speecheo_partners")}</h3>
        <div className="mt-8 mb-12">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brands-P2XtinXmVX5jnO0uFKQrQYN2f1rn5x.png"
            alt="Partner brands including Microsoft Ventures, Sorbonne, IMEX, France Congrès, PSL, VIVA Technology, and others"
            className="w-full object-contain max-h-48 rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* Ideation section with images */}
      <section id="speecheo-ideation" className="mb-10">
        <h3 className="text-xl font-semibold mb-4">{t("speecheo_ideation")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="p-4 md:border-r-2 md:border-gray-300">
            <h4 className="font-bold mb-2">{t("speecheo_problem_definition")}</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>{t("speecheo_market_evolution")}</li>
              <li>{t("speecheo_interviews")}</li>
              <li>{t("speecheo_update_problems")}</li>
              <li>{t("speecheo_pivot_definition")}</li>
            </ul>
          </div>

          <div className="p-4">
            <h4 className="font-bold mb-2">{t("speecheo_solution_alignment")}</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>{t("speecheo_brainstorming")}</li>
              <li>{t("speecheo_preparing_design_system")}</li>
              <li>{t("speecheo_rebranding")}</li>
            </ul>
          </div>
        </div>

        {/* Image carousel for all images */}
        <div className="mt-8">
          <SnapCarousel
            images={[
              {
                src: "/images/speecheo-ideation.jpg",
                alt: t("speecheo_ideation_process"),
                caption: t("speecheo_ideation_process"),
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6361.jpg-j6fraqoWV4cFRVqIcfbhLuV9Z3yH8n.jpeg",
                alt: t("speecheo_classroom_lecture"),
                caption: t("speecheo_classroom_lecture"),
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8839.jpg-DOP8ifNRRC9ZEJ0uHQQRT3Ib0gP35s.jpeg",
                alt: t("speecheo_user_testing"),
                caption: t("speecheo_user_testing"),
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3170.jpg-sevNP9TvzBrtQ0mVtqOifE3of2MchO.jpeg",
                alt: t("speecheo_mash_up"),
                caption: t("speecheo_mash_up"),
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.png-RccieZTVKbhETSRK4iUpMRICCgm6yA.jpeg",
                alt: t("speecheo_booth"),
                caption: t("speecheo_booth"),
              },
            ]}
            shadowClass="shadow-md"
          />
        </div>
      </section>

      {/* Approach section - renamed to "My work" */}
      <section id="speecheo-my-work" className="mb-10">
        <h3 className="text-xl font-semibold mb-4">{t("speecheo_my_work")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="md:pr-4 md:border-r-2 md:border-gray-300">
            {renderParagraphs(splitTextEvenly(t("speecheo_my_work_p1") + "\n" + t("speecheo_my_work_p2")).firstHalf)}
          </div>
          <div className="md:pl-4">
            {renderParagraphs(splitTextEvenly(t("speecheo_my_work_p1") + "\n" + t("speecheo_my_work_p2")).secondHalf)}
          </div>
        </div>
      </section>

      {/* User testing section */}
      <section id="speecheo-user-testing" className="mb-10">
        <h3 className="text-xl font-semibold mb-4">{t("speecheo_user_testing_title")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="md:pr-4 md:border-r-2 md:border-gray-300">
            {renderParagraphs(
              splitTextEvenly(t("speecheo_user_testing_p1") + "\n" + t("speecheo_user_testing_p2")).firstHalf,
            )}
          </div>
          <div className="md:pl-4">
            {renderParagraphs(
              splitTextEvenly(t("speecheo_user_testing_p1") + "\n" + t("speecheo_user_testing_p2")).secondHalf,
            )}
          </div>
        </div>
      </section>

      {/* Product Evolution section */}
      <section id="speecheo-product-evolution" className="mb-10">
        <h3 className="text-xl font-semibold mb-4">{t("speecheo_product_evolution")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="md:pr-4 md:border-r-2 md:border-gray-300">
            {renderParagraphs(
              splitTextEvenly(t("speecheo_product_evolution_p1") + "\n" + t("speecheo_product_evolution_p2")).firstHalf,
            )}
          </div>
          <div className="md:pl-4">
            {renderParagraphs(
              splitTextEvenly(t("speecheo_product_evolution_p1") + "\n" + t("speecheo_product_evolution_p2"))
                .secondHalf,
            )}
          </div>
        </div>
      </section>

      {/* Carousel with NO custom cursor navigation */}
      <section id="speecheo-gallery" className="mt-16">
        <h3 className="text-xl font-semibold mb-6">{t("speecheo_project_gallery")}</h3>
        <SnapCarousel
          images={[
            {
              src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Prolifi-M-v2.jpg-KjcffyVCrDS56sWLXShIlVj4YoqGkB.jpeg",
              alt: t("speecheo_prolifi_interface"),
              caption: t("speecheo_prolifi_interface"),
            },
            {
              src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/UI-guideline.jpg-npTJh1nHxi15jbPkKxV9SLUv8lqxij.jpeg",
              alt: t("speecheo_ui_guideline"),
              caption: t("speecheo_ui_guideline"),
            },
            {
              src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/01-VYxixBCTTk5qApaCHhlA8NbkEH3m3F.png",
              alt: t("speecheo_proli_fi_interface"),
              caption: t("speecheo_proli_fi_interface"),
            },
            {
              src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/02-HQmsEy7o0saPsWY7HoSH4aZcXwiB67.png",
              alt: t("speecheo_platform_mockups"),
              caption: t("speecheo_platform_mockups"),
            },
            {
              src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/04-AkfA8HDpjd9QgveruW5uj2SwsgJ2Kb.png",
              alt: t("speecheo_evolution"),
              caption: t("speecheo_evolution"),
            },
          ]}
          shadowClass="shadow-md"
        />
      </section>
    </div>
  )
}
