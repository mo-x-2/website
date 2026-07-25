import { notFound } from 'next/navigation'
import Navbar from '@/app/components/common/Navbar'
import ProjectDetail from '@/app/components/sections/ProjectDetail'
import { PROJECT_DATA } from '@/app/data/project'

export function generateStaticParams() {
  return Object.keys(PROJECT_DATA).map((id) => ({ id }))
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const projectId = Number(id)

  if (!PROJECT_DATA[projectId]) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <ProjectDetail projectId={projectId} />
    </>
  )
}
