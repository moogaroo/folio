"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import SnapCarousel from "@/components/snap-carousel"

interface Phase {
  title: { fr: string; en: string }
  content: {
    fr: string[]
    en: string[]
  }
}

interface CovidDesignSprintProps {
  context: { fr: string; en: string }
  challenge: { fr: string; en: string }
  approach: { fr: string; en: string }
  phases: Phase[]
  solution: {
    title: { fr: string; en: string }
    implementation: {
      title: { fr: string; en: string }
      content: { fr: string; en: string }
    }
    iteration: {
      title: { fr: string; en: string }
      content: { fr: string; en: string }
    }
  }
  learnings: { fr: string; en: string }
  images: {
    overview: string
    reassuranceMap: string
    mappingView: string
    kickoffBriefing: string
    customerInsight: string
    userBehavior: string
    usabillaFeedback: string
    benchmark: string
    visualIdentity: string
    crazy8s: string
    mapping: string
    userJourneys: string
    newUserflow: string
    questionnaire1: string
    questionnaire2: string
    questionnaire3: string
    mockups: string
    testAnalysis: string
    lightningJam1: string
    lightningJam2: string
    lightningJam3: string
    lightningJam4: string
  }
}

export default function CovidDesignSprint({
  context,
  challenge,
  approach,
  phases,
  solution,
  learnings,
  images,
}: CovidDesignSprintProps) {
  const { language } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)

  // Helper function to split text into paragraphs
  const renderParagraphs = (text: string) => {
    return text.split("\n\n").map((paragraph, index) => (
      <p key={index} className="mb-4">
        {paragraph}
      </p>
    ))
  }

  // Helper function to split text evenly between columns
  const splitTextEvenly = (text: string) => {
    const paragraphs = text.split("\n\n")
    const midpoint = Math.ceil(paragraphs.length / 2)

    return {
      firstHalf: paragraphs.slice(0, midpoint).join("\n\n"),
      secondHalf: paragraphs.slice(midpoint).join("\n\n"),
    }
  }

  return (
    <div className="covid-design-sprint mt-8 space-y-10 md:space-y-16">
      {/* Context Section */}
      <section id="context-section" className="mb-10">
        <h3 className="text-xl font-semibold mb-4">{language === "fr" ? "Contexte" : "Context"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="md:pr-4 md:border-r-2 md:border-gray-300">
            {renderParagraphs(splitTextEvenly(language === "fr" ? context.fr : context.en).firstHalf)}
          </div>
          <div className="md:pl-4">
            {renderParagraphs(splitTextEvenly(language === "fr" ? context.fr : context.en).secondHalf)}
          </div>
        </div>
      </section>

      {/* Overview Image */}
      <div className="mt-8 mx-auto" style={{ width: "70%" }}>
        <img
          src={images.overview || "/placeholder.svg"}
          alt={language === "fr" ? "Vue globale du sprint design" : "Global view of the design sprint"}
          className="w-full rounded-lg shadow-md"
        />
        <p className="text-sm text-gray-600 mt-2 text-center">
          {language === "fr"
            ? "Vue globale du sprint design avec les différentes phases"
            : "Global view of the design sprint with different phases"}
        </p>
      </div>

      {/* Challenge Section */}
      <section id="challenge-section" className="mb-10">
        <h3 className="text-xl font-semibold mb-4">{language === "fr" ? "Défi" : "Challenge"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="md:pr-4 md:border-r-2 md:border-gray-300">
            {renderParagraphs(splitTextEvenly(language === "fr" ? challenge.fr : challenge.en).firstHalf)}
          </div>
          <div className="md:pl-4">
            {renderParagraphs(splitTextEvenly(language === "fr" ? challenge.fr : challenge.en).secondHalf)}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section id="approach-section" className="mb-10">
        <h3 className="text-xl font-semibold mb-4">
          {language === "fr" ? "Approche méthodologique" : "Methodological Approach"}
        </h3>
        <div className="mb-6">{renderParagraphs(language === "fr" ? approach.fr : approach.en)}</div>

        {/* Phases */}
        <div id="phases-section">
          {phases.map((phase, index) => (
            <div key={index} className="mb-10">
              <h4 className="font-bold mb-3">{language === "fr" ? phase.title.fr : phase.title.en}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                <div className="md:pr-4 md:border-r-2 md:border-gray-300">
                  {(language === "fr" ? phase.content.fr : phase.content.en)
                    .slice(0, Math.ceil((language === "fr" ? phase.content.fr : phase.content.en).length / 2))
                    .map((item, i) => (
                      <p key={i} className="mb-2">
                        {item}
                      </p>
                    ))}
                </div>
                <div className="md:pl-4">
                  {(language === "fr" ? phase.content.fr : phase.content.en)
                    .slice(Math.ceil((language === "fr" ? phase.content.fr : phase.content.en).length / 2))
                    .map((item, i) => (
                      <p key={i} className="mb-2">
                        {item}
                      </p>
                    ))}
                </div>
              </div>

              {/* Phase-specific images */}
              {index === 0 && (
                <div className="mt-6 mx-auto" style={{ width: "70%" }}>
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9.Kickoff%20-%20product%20brief%20together-guFnEXCgciu6D9AVZOOJ1k2AYfYYbp.png"
                    alt={language === "fr" ? "Kickoff Briefing" : "Kickoff Briefing"}
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    {language === "fr"
                      ? "Kickoff Briefing - préparation et cadrage du sprint"
                      : "Kickoff Briefing - preparation and framing of the sprint"}
                  </p>
                </div>
              )}

              {index === 1 && (
                <div className="mt-6">
                  <SnapCarousel
                    images={[
                      {
                        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.Vue%20globale%20mapping%20touchpoint-5qAgEXuCalNBflOklKd2jbTTRY8sdd.png",
                        alt:
                          language === "fr" ? "Présentation du Reassurance MAP" : "Presentation of the Reassurance MAP",
                        caption:
                          language === "fr" ? "Présentation du Reassurance MAP" : "Presentation of the Reassurance MAP",
                      },
                      {
                        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3.vue%20moyenne%20du%20mapping-2jwUAnyUQ5jsWGL8z1KH7NJSqomGwi.png",
                        alt:
                          language === "fr"
                            ? "Cartographie complète des points de friction"
                            : "Complete mapping of friction points",
                        caption:
                          language === "fr"
                            ? "Cartographie complète des points de friction"
                            : "Complete mapping of friction points",
                      },
                      {
                        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5.Pre%CC%81senation%20Etude%20conso-6Gwv5U0xtidtThkcxautLtHO5fdoGA.png",
                        alt: language === "fr" ? "Présentation des insights clients" : "Customer Insight presentation",
                        caption:
                          language === "fr" ? "Présentation des insights clients" : "Customer Insight presentation",
                      },
                      {
                        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6.Data%20brief-RFXX6IG2pB811J2F64unnD3gz71lWI.png",
                        alt:
                          language === "fr"
                            ? "Analyse détaillée des comportements utilisateurs"
                            : "Detailed analysis of user behaviors",
                        caption:
                          language === "fr"
                            ? "Analyse détaillée des comportements utilisateurs"
                            : "Detailed analysis of user behaviors",
                      },
                      {
                        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7.Retours%20utilisateurs-Jf3SW7NZtOEDmJczD9gUaxKbXWBjO9.png",
                        alt: language === "fr" ? "Données de feedback Usabilla" : "Usabilla feedback data",
                        caption: language === "fr" ? "Données de feedback Usabilla" : "Usabilla feedback data",
                      },
                    ]}
                    shadowClass="shadow-md"
                  />
                </div>
              )}

              {index === 2 && (
                <div className="mt-6">
                  <SnapCarousel
                    images={[
                      {
                        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10.Problem%20statement%20-%201%20%26%202-T6TKjKuv0UZS9oWYH9vCZZ1UB5K9Ux.png",
                        alt:
                          language === "fr"
                            ? "Lightning Decision Jam - vue générale"
                            : "Lightning Decision Jam - general view",
                        caption:
                          language === "fr"
                            ? "Lightning Decision Jam - vue générale"
                            : "Lightning Decision Jam - general view",
                      },
                      {
                        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/11.Problem%20statement%20-%201st-Y4RCjcD4j14m01Zh6uHpEGAGSV1arp.png",
                        alt: language === "fr" ? "Note-taking space du jam" : "Note-taking space of the jam",
                        caption: language === "fr" ? "Note-taking space du jam" : "Note-taking space of the jam",
                      },
                      {
                        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/13.From%20problem%20to%20solution%20ideation-jxMQS7W3NmxWpF1eUzT6ftvqpAikHP.png",
                        alt:
                          language === "fr"
                            ? "Définir-Co-créer-Prioriser-Décider"
                            : "Define-Co-create-Prioritize-Decide",
                        caption:
                          language === "fr"
                            ? "Définir-Co-créer-Prioriser-Décider"
                            : "Define-Co-create-Prioritize-Decide",
                      },
                    ]}
                    shadowClass="shadow-md"
                  />
                </div>
              )}

              {index === 3 && (
                <div className="mt-6">
                  <SnapCarousel
                    images={[
                      {
                        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8.Benchmark.jpg-s8eCkQhQrsuscGDgeZXwVhJfKUaZNH.jpeg",
                        alt:
                          language === "fr" ? "Benchmark des pratiques existantes" : "Benchmark of existing practices",
                        caption:
                          language === "fr" ? "Benchmark des pratiques existantes" : "Benchmark of existing practices",
                      },
                      {
                        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14.%20Presentation%20de%20la%20charte%20de%20de%CC%81part-j2qD0G6WPfh41vLU3VRtcw8eYL0O4C.png",
                        alt: language === "fr" ? "Visual Identity" : "Visual Identity",
                        caption: language === "fr" ? "Visual Identity" : "Visual Identity",
                      },
                      {
                        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/15.Solution%20sketching-7Fa6OhUfT59ezxwEyqasPmQ6NfFCzt.png",
                        alt: language === "fr" ? "Solution sketching" : "Solution sketching",
                        caption: language === "fr" ? "Solution sketching" : "Solution sketching",
                      },
                      {
                        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/16.%20Mapping%20solution%20with%20datas-Ea0yG26DlpB5EgehSdNus1a7AkPbBw.png",
                        alt:
                          language === "fr" ? "Exercice de mapping et formulation" : "Mapping exercise and formulation",
                        caption:
                          language === "fr" ? "Exercice de mapping et formulation" : "Mapping exercise and formulation",
                      },
                      {
                        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/19.Versions%20de%20wireframes-VGeFMJK5wM3Hd9wNG5ElhigvTbAEyD.png",
                        alt:
                          language === "fr"
                            ? "Exploratory solutions with detailed mockups"
                            : "Exploratory solutions with detailed mockups",
                        caption:
                          language === "fr"
                            ? "Exploratory solutions with detailed mockups"
                            : "Exploratory solutions with detailed mockups",
                      },
                      {
                        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/18.%20Userflows%20finaux-c4yCthAxH7YMhKHF4pglgb68xFnWSv.png",
                        alt: language === "fr" ? "Nouveau userflow proposé" : "New proposed userflow",
                        caption: language === "fr" ? "Nouveau userflow proposé" : "New proposed userflow",
                      },
                      {
                        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/17.%20Pre%CC%81cision%20de%20la%20solution-49Xt8isU04ECil5O7rmr9dDNtHArQI.png",
                        alt:
                          language === "fr"
                            ? "Content sorting according to analytics"
                            : "Content sorting according to analytics",
                        caption:
                          language === "fr"
                            ? "Content sorting according to analytics"
                            : "Content sorting according to analytics",
                      },
                    ]}
                    shadowClass="shadow-md"
                  />
                </div>
              )}

              {index === 4 && (
                <div className="mt-6">
                  <SnapCarousel
                    images={[
                      {
                        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/21.Redaction%20questionnaire-aCJxC4uZMK0qJmA3kL6ViNqV2lNlbR.png",
                        alt: language === "fr" ? "Questions à poser et stratégie" : "Questions strategy",
                        caption: language === "fr" ? "Questions à poser et stratégie" : "Questions strategy",
                      },
                      {
                        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/22.Analyse%20questionnaire-MfXTw20E70R4kupQsj8HZMSaZD90ap.png",
                        alt:
                          language === "fr"
                            ? "Résultats du questionnaire et analyse"
                            : "Questionnaire results and analysis",
                        caption:
                          language === "fr"
                            ? "Résultats du questionnaire et analyse"
                            : "Questionnaire results and analysis",
                      },
                    ]}
                    shadowClass="shadow-md"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution-section" className="mb-10">
        <h3 className="text-xl font-semibold mb-4">{language === "fr" ? solution.title.fr : solution.title.en}</h3>

        {/* Implementation */}
        <div className="mb-8">
          <h4 className="font-bold mb-3">
            {language === "fr" ? solution.implementation.title.fr : solution.implementation.title.en}
          </h4>

          <div className="mb-6">
            <p className="mb-4">
              {language === "fr"
                ? "Suite au design sprint, nous avons pu lancer rapidement une première version et avons continué d'itérer sur la solution, notamment en adaptant l'identité visuelle de Zootopia, aux besoins spécifiques du digital."
                : "Following the design sprint, we were able to quickly launch a first version and continued to iterate on the solution, particularly by adapting the Zootopia visual identity to the specific needs of digital platforms."}
            </p>

            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>
                {language === "fr"
                  ? "Refonte des cartes hôtel avec une présentation plus claire des éléments de réassurance"
                  : "Redesign of hotel cards with clearer presentation of reassurance elements"}
              </li>
              <li>
                {language === "fr"
                  ? "Hiérarchisation visuelle facilitant la comparaison entre offres"
                  : "Visual hierarchy facilitating comparison between offers"}
              </li>
              <li>
                {language === "fr"
                  ? "Exploration de différentes variations pour optimiser la conversion"
                  : "Exploration of different variations to optimize conversion"}
              </li>
            </ul>
          </div>

          {/* Implementation carousel with hotel cards */}
          <div className="mt-8">
            <SnapCarousel
              images={[
                {
                  src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Zoo%20-1-%20tests%20recap-fDqVb5uwwuUUZMhYvttVtKBu3n7qhN.png",
                  alt: language === "fr" ? "Tests récapitulatifs des options" : "Test recap of options",
                  caption: language === "fr" ? "Tests récapitulatifs des options" : "Test recap of options",
                },
                {
                  src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Zoo%20-X-%20UI%20versions-fFfQ3FL6zaQ218t28prNwqtO9i1QNJ.png",
                  alt: language === "fr" ? "Versions UI des cartes hôtel" : "UI versions of hotel cards",
                  caption: language === "fr" ? "Versions UI des cartes hôtel" : "UI versions des cartes hôtel",
                },
                {
                  src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Zoo%20-4-%20UI%20v1-8bVTnvMuFdVMSGpWKkYEuzSbHHTQGy.png",
                  alt: language === "fr" ? "Design Review des cartes hôtel" : "Design Review of hotel cards",
                  caption: language === "fr" ? "Design Review des cartes hôtel" : "Design Review of hotel cards",
                },
                {
                  src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Zoo-version%20dans%20la%20page.jpg-S7t8dfQadNx0WuyMs6dOTWMGBgckMk.jpeg",
                  alt: language === "fr" ? "Une des implémentations" : "One of the implementation",
                  caption: language === "fr" ? "Une des implémentations" : "One of the implementation",
                },
                {
                  src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3.vue%20moyenne%20du%20mapping-2jwUAnyUQ5jsWGL8z1KH7NJSqomGwi.png",
                  alt:
                    language === "fr"
                      ? "Rappel : tous ces éléments nécessitent des ajustements design"
                      : "Remember : all there need design adjustments",
                  caption:
                    language === "fr"
                      ? "Rappel : tous ces éléments nécessitent des ajustements design"
                      : "Remember : all there need design adjustments",
                },
              ]}
              shadowClass="shadow-md"
            />
          </div>
        </div>

        {/* Iteration */}
        <div>
          <h4 className="font-bold mb-3">
            {language === "fr" ? solution.iteration.title.fr : solution.iteration.title.en}
          </h4>

          <div className="space-y-4">
            <p>
              {language === "fr"
                ? "Réalisation d'un premier test utilisateur modéré pour valider le concept."
                : "Conducting an initial moderated user test to validate the concept."}
            </p>
            <p>
              {language === "fr"
                ? "Mise en place d'une stratégie de tracking avec l'équipe CRO pour mesurer l'impact."
                : "Implementation of a tracking strategy with the CRO team to measure impact."}
            </p>
            <p>
              {language === "fr"
                ? "Ajustements continus du design en fonction des retours et des métriques."
                : "Continuous design adjustments based on feedback and metrics."}
            </p>
            <p>{language === "fr" ? "Quelques résultats (taux confidentiels)" : "Some results (confidential rates)"}</p>
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>
                {language === "fr"
                  ? "le paiement en plusieurs fois a été largement plébiscité"
                  : "installment payment was widely praised"}
              </li>
              <li>
                {language === "fr"
                  ? "nombreux retours positifs dans les commentaires sur les fonctionnalités"
                  : "numerous positive comments on the features"}
              </li>
              <li>
                {language === "fr"
                  ? "diminution significative des appels au service client concernant l'annulation / modification des réservations"
                  : "significant decrease in customer service calls regarding cancellation/modification of reservations"}
              </li>
              <li>
                {language === "fr"
                  ? "une légère diminution des abandons dans le tunnel d'achat à proximité du checkout"
                  : "a slight decrease in abandonment in the purchasing funnel near checkout"}
              </li>
              <li>
                {language === "fr"
                  ? "des retours négatifs sur le MVP d'un composant perturbant la navigation"
                  : "negative feedback on the MVP of a component disrupting navigation"}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Learnings Section */}
      <section id="learnings-section" className="mb-10">
        <h3 className="text-xl font-semibold mb-4">{language === "fr" ? "Enseignements clés" : "Key Learnings"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="md:pr-4 md:border-r-2 md:border-gray-300">
            {renderParagraphs(splitTextEvenly(language === "fr" ? learnings.fr : learnings.en).firstHalf)}
          </div>
          <div className="md:pl-4">
            {renderParagraphs(splitTextEvenly(language === "fr" ? learnings.fr : learnings.en).secondHalf)}
          </div>
        </div>
      </section>
    </div>
  )
}
