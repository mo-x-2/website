'use client'

import AnimatedText from '../common/AnimatedText'
import Image from 'next/image'
import GradientBackground from '../common/GradientBackground'
import ExperienceModal from './Motal'
import { useState } from 'react'

// Define experience entry type
type Experience = {
  id: number          // Unique identifier
  title: string       // Position title
  company: string     // Company name
  period: string      // Work period
  logo: string        // Company logo path (stored in public/companyicon/)
  skills: string[]    // Skills list (corresponding icons stored in public/skills/, filename in lowercase)
  description: string // Work description
}

// Example data
// Usage instructions:
// 1. Copy template below and modify content as needed
// 2. Place logo images in public/companyicon/ directory
// 3. Skills icons will be automatically fetched from public/skills/ directory
//    Example: "JavaScript" -> public/skills/javascript.png
// 4. Recommended to sort experience entries in reverse chronological order
const experiences: Experience[] = [
  {
    id: 1,
    title: "Example Position 1",
    company: "Example Company 1",
    period: "January 2024 - Present",
    logo: "/companyicon/company1.png", // Logo image path
    skills: ["React", "TypeScript", "Node.js"], // Skills list
    description: "This is a sample work description detailing your main responsibilities and achievements in this role."
  },
  {
    id: 2, 
    title: "Example Position 2",
    company: "Example Company 2",
    period: "June 2023 - December 2023",
    logo: "/companyicon/company2.png",
    skills: ["Python", "Django", "PostgreSQL"],
    description: "This is another sample work description. Consider including specific numbers and achievements."
  }
];

export default function Experience() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null)

  return (
    <section id="experience" className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 container min-h-screen flex flex-col items-center justify-center">
      <div className="
        min-h-screen
        flex flex-col items-center justify-center
        py-8 sm:py-12 md:py-16 lg:py-20
        relative
        overflow-hidden
      ">
        {/* Optional gradient background component */}
        {/* You can adjust background colors by modifying gradientColors */}
        {/* Examples:
          Blue theme: start:'#3B82F6' end:'#1E40AF'
          Green theme: start:'#10B981' end:'#047857'
          Pink theme: start:'#EC4899' end:'#BE185D'
        */}
        <GradientBackground 
          sectionId="experience"
          gradientColors={{
            start: '#7C3AED',  // Light violet
            end: '#5B21B6'     // Deep violet
          }}
        />

        <AnimatedText>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center relative z-10 text-[var(--foreground)]">
            Experience
          </h1>
        </AnimatedText>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 relative z-0 max-w-6xl w-full">
          {experiences.map((experience) => (
            <div key={experience.id}>
              <AnimatedText>
                <div 
                  onClick={() => {
                    setSelectedExperience(experience.id)
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
                    h-full
                  "
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={experience.logo}
                        alt={experience.company}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="
                        text-sm sm:text-base md:text-lg lg:text-xl
                        font-bold 
                        mb-1
                        text-[var(--foreground)]
                      ">
                        {experience.title}
                      </h3>
                      
                      <p className="text-sm sm:text-base text-[var(--foreground)]/70">
                        {experience.company}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-[var(--foreground)]/70 mb-3 sm:mb-4">
                    {experience.period}
                  </p>
                  
                  <p className="text-sm sm:text-base md:text-lg text-[var(--foreground)]/70 mb-4 sm:mb-6">
                    {experience.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill) => (
                      <span
                        key={skill}
                        className="
                          px-2 py-1 sm:px-3 sm:py-1
                          text-xs sm:text-sm
                          rounded-full
                          bg-white/[0.05] dark:bg-white/[0.05]
                          backdrop-blur-[8px]
                          border border-white/[0.05]
                          text-[var(--foreground)]/70
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
        experienceId={selectedExperience ?? 1}
      />
    </section>
  )
}
