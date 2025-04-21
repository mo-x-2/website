'use client'

import AnimatedText from '../common/AnimatedText'
import Image from 'next/image'
import GradientBackground from '../common/GradientBackground'
import Bubbles from "../common/Bubbles"
import ExperienceModal from './Motal'
import { useState } from 'react'

// Define project data type
// Each project must include:
// - id: Unique identifier
// - title: Project name
// - description: Project description
// - period: Development period
// - image: Project screenshot path (stored in public/project/ directory)
// - skills: Tech stack used
// - link: Project link (GitHub/Demo)
type Project = {
  id: number
  title: string
  description: string
  period: string
  image: string
  skills: string[]
  link?: string
  tag?: string
  state: "On Going" | "Finished"
}

// Example project data
// Usage instructions:
// 1. Copy template below and modify content as needed
// 2. Place project screenshots in public/project/ directory
// 3. Sort projects in reverse chronological order
// 4. Project descriptions should highlight core features and technical highlights
export const projects: Project[] = [
  {
    id: 1,
    title: "Wheelchair Robot",
    description: "As part of a project in the Nagao Laboratory at Nagoya University, I participated in the Tsukuba Challenge, a technical trial for autonomous mobile robots navigating outdoor environments. In this challenge, we redeveloped a wheelchair-type robot called WHILL to autonomously traverse pedestrian paths and urban areas. My contributions included developing an iOS application for object detection and semantic segmentation, as well as controlling the WHILL’s movements using ROS.",
    period: "Apr 2023 - Dec 2023",
    state: "Finished",
    tag: "Project",
    image: "/project/1.jpg", 
    skills: ["ROS", "Python", "Swift"], 
  },
  {
    id: 2, 
    title: "Accompanying Robot",
    description: "We are exploring how people perceive and accept robots they encounter in public spaces. Specifically, our ongoing work examines how visual design elements that express the relationship between an accompanying robot and its user may affect impressions, especially for those who are initially less comfortable with robots.",
    period: "Apr 2024 - Current",
    state: "On Going",
    tag: "Research",
    image: "/project/2.jpeg",
    skills: ["Python", "ROS"],
  },
  {
    id: 3, 
    title: "Parkour Simulation",
    description: "We used the high-performance simulation environment Isaac Gym to train a quadruped robot through reinforcement learning, enabling it to perform complex parkour-like movements. Advances in simulation have made it possible to learn such behaviors in a short time and acquire models that generalize to real-world environments. By collecting large amounts of training data quickly, we were able to develop models capable of adapting to physical settings.",
    period: "Jul 2024 - Dec 2024",
    state: "Finished",
    tag: "Project",
    image: "/project/3.jpeg",
    skills: ["ROS", "Python", "Simulation"],
  },
  {
    id: 4, 
    title: "Paralinguistic Dialogue System",
    description: "Have you ever wished you could talk to R2D2—not through words, but through sounds? While voice-based agents are becoming more common, relying solely on spoken language in human–agent interaction presents real challenges. It can be mentally demanding and often impractical in noisy or hands-free situations. To address this, we explored the potential of non-verbal communication using Semantic-Free Utterances (SFUs)—meaningless yet expressive sounds that can lighten cognitive load. In this project, we introduce ParaTalk, a paralinguistic dialogue system that interprets user speech using a large language model and responds with Paralinguistic Utterances (PUs), a type of SFU, in real time. By focusing on the balance between verbal and non-verbal expression, ParaTalk opens up new possibilities for designing more intuitive and emotionally resonant agent communication.",
    period: "Sep 2024 - Current",
    state: "On Going",
    tag: "Research",
    image: "/project/4-2.gif",
    skills: ["Python", "Unity"],
  },
  {
    id: 5, 
    title: "Remora Barrette",
    description: "Have you ever felt uncomfortable when store staff approach you while shopping? We created Romera Barrette, an agent designed to support shy or socially anxious individuals. Inspired by the unspoken signals of headphones and wired earphones—often used as a subtle “do not disturb” sign—this wearable device gently expresses a desire not to be approached. When a staff member’s device comes near, the barrette softly glows, offering a warm and non-verbal way to say “not right now.”",
    period: "Dec 2025",
    state: "Finished",
    tag: "Work",
    image: "/project/5-2.gif",
    skills: ["Arduino", "Python"],
  }
];

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  return (
    <section id="projects" className="container mx-auto px-4 sm:px-8 md:px-12">
      <div className="
        min-h-screen
        flex flex-col items-center justify-center
        py-4 md:py-8
        relative
        overflow-hidden
      ">

        <Bubbles 
          sectionId="projects"
          bubbleCount={5}
          backgroundColor="rgba(255, 255, 255, 1)"
          strokeStyle = 'rgba(1, 56, 167, 0.3)'
        />

        <AnimatedText>
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center relative z-10">
            Projects
          </h1>
        </AnimatedText>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-0 max-w-6xl w-full">
          {projects.map((project) => (
            <div key={project.id}>
              <AnimatedText>
                <div 
                  onClick={() => {
                    setSelectedProject(project.id)
                    setModalOpen(true)
                  }}
                  className="
                    bg-white/[0.1] dark:bg-black/[0.2]
                    backdrop-blur-[20px]
                    rounded-2xl
                    border border-white/[0.1] dark:border-white/[0.1]
                    p-6
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                    cursor-pointer
                  "
                >
                  <div className="relative w-full h-48 md:h-72 mb-4">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  
                  <h2 className="text-2xl font-semibold mb-2">
                    {project.title}
                  </h2>

                  <p className="text-base text-gray-600 dark:text-gray-400 mb-2">
                    {project.tag}
                  </p>
                  
                  <p className="text-base text-gray-600 dark:text-gray-400 mb-2">
                    {project.period}, {project.state}
                  </p>
                  
                  <p className="text-base text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <span
                        key={skill}
                        className="
                          px-3 py-1
                          text-sm
                          rounded-full
                          bg-white/[0.05] dark:bg-white/[0.05]
                          backdrop-blur-[8px]
                          border border-white/[0.05]
                          text-gray-600 dark:text-gray-400
                        "
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedText>
            </div>
          ))}
        </div>
      </div>

      <ExperienceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        experienceId={selectedProject ?? 1}
      />
    </section>
  )
} 