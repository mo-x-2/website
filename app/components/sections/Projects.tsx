'use client'

import AnimatedText from '../common/AnimatedText'
import Image from 'next/image'
import Bubbles from "../common/Bubbles"
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/app/context/LanguageContext'
import { t, ui } from '@/app/data/i18n'

type Project = {
  id: number
  title: string
  description: string
  period: string
  image: string
  skills?: string[]
  link?: string
  tag?: string
  state?: "On Going" | "Finished"
}

export const projects: Project[] = [
  {
    id: 8, 
    title: "RecallMe",
    description: "a", 
    period: "Oct 2025 - Current",
    tag: "Research",
    image: "/project/8-1.JPG",
  },
  {
    id: 7, 
    title: "Ben10 Watch",
    description: "a", 
    period: "Aug 2025 - Nov 2025",
    tag: "Project",
    image: "/project/7.gif",
  },
  {
    id: 6, 
    title: "AwaseKagami",
    description: "a",
    period: "Jul 2025",
    tag: "Work",
    image: "/project/6-1.gif",
  },
  {
    id: 5, 
    title: "Remora Barrette",
    description: "aa",
    period: "Feb 2025",
    tag: "Work",
    image: "/project/5-1.gif",
  },
  {
    id: 4, 
    title: "ParaTalk",
    description: "aa",
    period: "Sep 2024 - Current",
    tag: "Research",
    image: "/project/4-2.gif",
  },
  {
    id: 3, 
    title: "Parkour Sim2Real",
    description: "aa",
    period: "Jul 2024 - Dec 2024",
    tag: "Project",
    image: "/project/3.jpeg",
  },
  {
    id: 2, 
    title: "Robot Acceptance in Public",
    description: "aa",
    period: "Apr 2024 - Mar 2025",
    tag: "Research",
    image: "/project/2.jpeg",
  },
  {
    id: 1,
    title: "Auto Wheelchair",
    description: "aa",
    period: "Apr 2023 - Dec 2023",
    tag: "Project",
    image: "/project/1.jpg", 
  }
];

export default function Projects() {
  const router = useRouter()
  const { locale } = useLanguage()

  return (
    <section id="projects" className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 bg-[var(--background)] text-[var(--foreground)]">
      <div className="
        min-h-screen
        flex flex-col items-center justify-center
        py-4 md:py-8
        relative
        overflow-hidden
        z-0
      ">

        <Bubbles 
          sectionId="projects"
          bubbleCount={0}
          backgroundColor="rgba(255, 255, 255, 1)"
          strokeStyle = 'rgba(192, 0, 0, 0.5)'
        />

        <div className="relative z-10 w-full flex flex-col items-center">
          <AnimatedText>
            <h1 className="section-heading mb-8 text-center text-[var(--foreground)]">
              {t(ui.projects.title, locale)}
            </h1>
          </AnimatedText>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
            {projects.map((project) => (
              <AnimatedText key={project.id}>
                <div 
                  onClick={() => router.push(`/projects/${project.id}`)}
                  className="
                    bg-white/[0.1] dark:bg-black/[0.2]
                    backdrop-blur-[20px]
                    rounded-none
                    border border-white/[0.1] dark:border-white/[0.1]
                    p-6
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                    cursor-pointer
                    h-full
                    flex flex-col
                    group
                  "
                >
                  <div className="relative w-full h-48 mb-4 rounded-none overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                    />
                  </div>
                  
                  <div className="flex flex-col flex-grow">
                    <h2 className="text-xl font-bold mb-2 text-[var(--foreground)]">
                      {project.title}
                    </h2>
                    <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 font-[family-name:var(--font-nunito-sans)]">
                      {project.tag && ui.projects.tags[project.tag]
                        ? t(ui.projects.tags[project.tag], locale)
                        : project.tag}
                    </h2>
                  </div>
                </div>
              </AnimatedText>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
