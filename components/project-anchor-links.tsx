export default function getProjectAnchorLinks(projectId: string, translations: any) {
  if (projectId === "addressing-crisis") {
    return [
      { id: "context-section", label: translations.context || "Context" },
      { id: "challenge-section", label: translations.challenge || "Challenge" },
      { id: "approach-section", label: translations.approach || "Approach" },
      { id: "phases-section", label: translations.phases || "Phases" },
      { id: "solution-section", label: translations.solution || "Solution" },
      { id: "learnings-section", label: translations.learnings || "Learnings" },
    ]
  } else if (projectId === "edtech-pivot-design") {
    return [
      { id: "overview", label: translations.context || "Overview" },
      { id: "ideation", label: translations.ideation || "Ideation" },
      { id: "design-system", label: translations.design_system || "Design System" },
      { id: "interfaces", label: translations.interfaces || "Interfaces" },
      { id: "resources", label: translations.resources || "Resources" },
      { id: "gallery", label: translations.gallery || "Gallery" },
    ]
  }

  return []
}
