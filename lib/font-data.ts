export type FontCombination = {
  id: string
  name: string
  h1: string
  h2: string
  h3: string
  h4: string
  body: string
  h1Weight: string
  h2Weight: string
  h3Weight: string
  h4Weight: string
  bodyWeight: string
  h1Transform?: string
  h2Transform?: string
  h3Transform?: string
  h4Transform?: string
  bodyTransform?: string
}

export const fontCombinations: FontCombination[] = [
  {
    id: "courier",
    name: "Courier",
    h1: "'Courier New', monospace",
    h2: "'Courier New', monospace",
    h3: "'Courier New', monospace",
    h4: "'Courier New', monospace",
    body: "'Courier New', monospace",
    h1Weight: "700",
    h2Weight: "700",
    h3Weight: "700",
    h4Weight: "700",
    bodyWeight: "400",
  },
  {
    id: "oswald-montserrat",
    name: "Oswald / Montserrat",
    h1: "'Oswald', sans-serif",
    h2: "'Oswald', sans-serif",
    h3: "'Montserrat', sans-serif",
    h4: "'Montserrat', sans-serif",
    body: "'Montserrat', sans-serif",
    h1Weight: "700",
    h2Weight: "500",
    h3Weight: "500",
    h4Weight: "400",
    bodyWeight: "400",
    h3Transform: "uppercase",
    h4Transform: "uppercase",
  },
  {
    id: "bebas-merriweather",
    name: "Bebas / Merriweather",
    h1: "'Bebas Neue', sans-serif",
    h2: "'Bebas Neue', sans-serif",
    h3: "'Bebas Neue', sans-serif",
    h4: "'Bebas Neue', sans-serif",
    body: "'Merriweather', serif",
    h1Weight: "400",
    h2Weight: "400",
    h3Weight: "400",
    h4Weight: "400",
    bodyWeight: "300",
  },
  {
    id: "alfa-work",
    name: "Alfa Slab / Work Sans",
    h1: "'Alfa Slab One', cursive",
    h2: "'Work Sans', sans-serif",
    h3: "'Work Sans', sans-serif",
    h4: "'Work Sans', sans-serif",
    body: "'Work Sans', sans-serif",
    h1Weight: "400",
    h2Weight: "600",
    h3Weight: "500",
    h4Weight: "400",
    bodyWeight: "400",
  },
]
