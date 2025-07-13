import type React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@/contexts/theme-context"
import { FontProvider } from "@/contexts/font-context"
import { LanguageProvider } from "@/contexts/language-context"
import MobileDetector from "@/components/mobile-detector"
import TransitionManager from "@/components/TransitionManager"
import "./globals.css"
import "./theme-styles.css"
import "./layout-styles.css"
import "./balloon-styles.css"
import "./project-hero-texture.css"
import "./cursor-transitions.css"
import "./project-page.css"
import "./vintage-tv.css"
import "./transition.css"
import "./carousel.css"
import "./fonts.css"

export const metadata: Metadata = {
  title: "Morgan R. Portfolio",
  description: "Senior Product Designer",
  icons: {
    icon: "/favicon.png", // Updated to use the local file
  },
  openGraph: {
    title: "Morgan R. Portfolio",
    description: "Senior Product Designer",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Morgan R. Portfolio - Brutalist Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morgan R. Portfolio",
    description: "Senior Product Designer",
    images: ["/og-image.png"],
    creator: "@morgan_r",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link
          href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Abril+Fatface&family=Open+Sans:wght@300;400;500;600;700&family=Oswald:wght@400;500;700&family=Montserrat:wght@300;400;500;700&family=Sacramento&family=Cinzel:wght@400;700&family=Quattrocento:wght@400;700&family=Lora:wght@400;700&family=Merriweather:wght@300;400;700&family=Bebas+Neue&family=Bodoni+Moda:ital,wght@0,400;0,700;1,400&family=Coustard&family=Nixie+One&family=Six+Caps&family=Archivo+Narrow:wght@400;700&family=Source+Sans+Pro:wght@300;400;700&family=Alfa+Slab+One&family=Work+Sans:wght@300;400;500;700&display=swap"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ThemeProvider>
          <FontProvider>
            <LanguageProvider>
              <MobileDetector>
                <TransitionManager />
                {children}
              </MobileDetector>
            </LanguageProvider>
          </FontProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
