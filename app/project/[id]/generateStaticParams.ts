import { projects } from '@/lib/projects-data'

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}
