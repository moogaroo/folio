"use client"

class ImagePreloader {
  private loadedImages: Set<string> = new Set()

  isLoaded(src: string): boolean {
    return this.loadedImages.has(src)
  }

  preload(sources: string | string[]): void {
    const urls = Array.isArray(sources) ? sources : [sources]

    urls.forEach((url) => {
      if (!url || url.includes("placeholder") || this.loadedImages.has(url)) return

      const img = new Image()
      img.onload = () => {
        this.loadedImages.add(url)
        this.notifyProgress()
      }
      img.onerror = () => {
        console.error("Failed to load image:", url)
        this.notifyProgress()
      }
      img.src = url
    })
  }

  preloadProjectImages(projects: any[]): void {
    const imagesToPreload = projects.filter((project) => project && project.image).map((project) => project.image)

    this.preload(imagesToPreload)
  }

  private progressListeners: ((progress: number) => void)[] = []

  onProgress(listener: (progress: number) => void): () => void {
    this.progressListeners.push(listener)
    return () => {
      this.progressListeners = this.progressListeners.filter((l) => l !== listener)
    }
  }

  private notifyProgress(): void {
    const totalImages = this.loadedImages.size
    let loadedCount = 0

    document.querySelectorAll("img").forEach((img) => {
      if (img.complete && img.naturalWidth > 0) {
        loadedCount++
      }
    })

    const progress = Math.min(1, loadedCount / totalImages)

    this.progressListeners.forEach((listener) => listener(progress))
  }
}

const imagePreloader = new ImagePreloader()

export const preloadProjectImages = (projects: any[]) => {
  imagePreloader.preloadProjectImages(projects)
}

export default imagePreloader
