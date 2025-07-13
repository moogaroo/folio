"use client"
import { useTheme } from "@/contexts/theme-context"
import { useMobileDetector } from "@/components/mobile-detector"
import ColoredLogo from "@/components/colored-logo"
import Link from "next/link"
import ClientFontSwitcher from "@/components/client-font-switcher"
import { useLanguage } from "@/contexts/language-context"
import LanguageToggle from "@/components/language-toggle"

export default function MePage() {
  const { theme } = useTheme()
  const isMobile = useMobileDetector()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* Main content */}
      <main
        className="flex-grow flex flex-col md:flex-row"
        style={{
          backgroundColor: "#FFFFFF",
        }}
      >
        {/* Left panel with profile image and tabs */}
        <div
          className="w-full md:w-1/2 p-6 md:p-12 flex flex-col items-center justify-start md:justify-center"
          style={{
            backgroundColor: "#FFFFFF",
          }}
        >
          <div className="max-w-md w-full flex flex-col items-center profile-container">
            {/* Profile image - moved higher up */}
            <div className="mb-8 mt-0">
              <div
                className="w-48 h-48 md:w-64 md:h-64 overflow-hidden"
                style={{
                  border: "none", // Removed border
                }}
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/picture%20with%20background-zJXby95EA4kvv6NLGLqFMfRWfAe6Wy.png"
                  alt="Morgan Rosemberg"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Name and title */}
            <h1 className="heading-text text-center mb-2">Morgan Rosemberg</h1>
            <p className="regular-text text-center mb-4">{t("senior_product_designer")}</p>

            {/* Add email and LinkedIn links */}
            <div className="text-center mb-4">
              <a
                href="mailto:morgan.rosemberg@gmail.com"
                className="regular-text inline-block transition-all hover:font-bold hover:text-[#FF5722] mb-2 bg-[#FFC107] px-2 py-1"
              >
                morgan.rosemberg@gmail.com
              </a>
              <div className="mt-2">
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

        {/* Right panel with content */}
        <div
          className="w-full md:w-1/2 p-6 md:p-12 flex items-center justify-center"
          style={{
            backgroundColor: "#F1F1F1",
          }}
        >
          <div className="space-y-8 w-full max-w-md">
            {/* Awards and Recognition section */}
            <div className="space-y-6">
              <h2 className="heading-text mb-4">{t("awards_recognition")}</h2>

              <ul className="space-y-4">
                <li className="regular-text">
                  <span className="font-medium">{t("ab_test")}</span> (AB Tasty)
                </li>
                <li className="regular-text">
                  <span className="font-medium">{t("ux_award")}</span> (Content Square)
                </li>
                <li className="regular-text">
                  <span className="font-medium">{t("event_tech")}</span> at IMEX Las Vegas
                </li>
                <li className="regular-text">
                  <span className="font-medium">{t("built_startup")}</span> incubated at Microsoft Ventures, Lisbon
                  European Challenge, Paris city incubator
                </li>
                <li className="regular-text">
                  <span className="font-medium">{t("hackathon")}</span> in 2013
                </li>
                <li className="regular-text">
                  <span className="font-medium">{t("film_award")}</span> at Paris Cinema Festival 2009
                </li>
              </ul>
            </div>

            {/* Personal section */}
            <div className="space-y-6">
              <h2 className="heading-text mb-4">{t("senior_product_designer")}</h2>

              <ul className="space-y-4">
                <li className="regular-text">
                  <span className="font-medium">{t("proactive_solutionist")}</span> – {t("proactive_desc")}
                </li>
                <li className="regular-text">
                  <span className="font-medium">{t("collaborative")}</span> – {t("collaborative_desc")}
                </li>
                <li className="regular-text">
                  <span className="font-medium">{t("rigorous")}</span> – {t("rigorous_desc")}
                </li>
                <li className="regular-text">
                  <span className="font-medium">{t("creative")}</span> – {t("creative_desc")}
                </li>
              </ul>

              <h3 className="heading-text mb-4">{t("skills")}</h3>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-4">
                <p className="regular-text">{t("design_thinking")}</p>
                <p className="regular-text">{t("figma")}</p>
                <p className="regular-text">{t("user_research")}</p>
                <p className="regular-text">{t("html_css")}</p>
                <p className="regular-text">{t("design_system")}</p>
                <p className="regular-text">{t("ai_tools")}</p>
                <p className="regular-text">{t("ux_data")}</p>
                <p className="regular-text">{t("3d_archi")}</p>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2">
                <p className="regular-text">{t("french")} &nbsp;&nbsp; native</p>
                <p className="regular-text">{t("english")} &nbsp;&nbsp; professional</p>
              </div>
            </div>
          </div>
        </div>
      </main>

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
            <Link
              href="/testimonials"
              className="regular-text font-bold hover:bg-black hover:text-white hover:px-2 hover:py-1 transition-all"
            >
              {t("testimonials")}
            </Link>
            <span className="regular-text font-bold bg-black text-white px-2 py-1">{t("me")}</span>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ClientFontSwitcher />
          </div>
        </div>
      </div>
    </div>
  )
}
