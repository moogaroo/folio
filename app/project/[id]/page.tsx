import { projects } from '@/lib/projects-data'
import ProjectClient from './project-client'

// Génération des pages statiques pour l'export
export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

// Composant serveur qui passe l'ID au composant client
export default function ProjectPage({ params }: { params: { id: string } }) {
  return <ProjectClient projectId={params.id} />
}
