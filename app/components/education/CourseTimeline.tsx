'use client'

import { useState } from 'react'
import AnimatedText from "../common/AnimatedText"
import { motion } from "framer-motion"

interface CourseItem {
  date: string
  title: React.ReactNode
  description: React.ReactNode
}

// Example course data - Replace with your own education experience
const courses: CourseItem[] = [
  {
    date: "Apr 2020 - Mar 2024",
    title: "B.C. at Nagoya University",
    description: (
      <>
        <a 
          href="https://www.i.nagoya-u.ac.jp/si/cs/"
          target="_blank" 
          className="underline decoration-dotted underline-offset-4 duration-300"
          onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(210, 83, 181, 1)'}
          onMouseLeave={(e) => e.currentTarget.style.color = ''}
        >
          Department of Computer Science
        </a>
        {' | '}
        <a 
          href="http://www.nagao.nuie.nagoya-u.ac.jp/"
          target="_blank" 
          className="underline decoration-dotted underline-offset-4 duration-300"
          onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(210, 83, 181, 1)'}
          onMouseLeave={(e) => e.currentTarget.style.color = ''}
        >
          Nagao Laboratory
        </a>
      </>
    )
  },
  {
    date: "Apr 2024 - Mar 2026(Expected)",
    title: "M.S. at The University of Tokyo",
    description: (
      <>
        <a 
          href="https://www.iii.u-tokyo.ac.jp/" 
          target="_blank" 
          className="underline decoration-dotted underline-offset-4 hover:text-[#d253b5] duration-300"
        >
          III/GSII
        </a>
        {' | '}
        <a 
          href="https://ishiguro-lab.org/"
          target="_blank" 
          className="underline decoration-dotted underline-offset-4 duration-300"
          onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(210, 83, 181, 1)'}
          onMouseLeave={(e) => e.currentTarget.style.color = ''}
        >
          Ishiguro Laboratory
        </a>
      </>
    )
  },
  {
    date: "Aug 2025 - July 2026(Expected)",
    title: "Exchange at The University of Sydney",
    description: (
      <> Also Working as a Visiting Researcher</>
    )
  },

]

// Usage Instructions:
// 1. Add your course information in the courses array above
// 2. Each course item contains:
//    - date: Course time
//    - title: Course name
//    - description: Course description (keywords recommended)
// 3. Timeline will automatically display based on array length
// 4. "Show More" button appears when more than 5 courses

export default function CourseTimeline() {
  const [showAll, setShowAll] = useState(false)
  const displayedCourses = showAll ? courses : courses.slice(0, 5)

  const handleCollapse = () => {
    setShowAll(false)
    const educationSection = document.getElementById('education')
    if (educationSection) {
      const yOffset = -60;
      const y = educationSection.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
      {/* Timeline container */}
      <div className="relative">
        {/* Timeline background line */}
        <div className="absolute left-1/2 top-0 w-[2px] h-full bg-neutral-200 dark:bg-neutral-800 z-0" />
        
        {/* Timeline items */}
        {displayedCourses.map((course, index) => (
          <AnimatedText key={index}>
            <div className={`
              flex items-center gap-4 sm:gap-6 md:gap-8 mb-12 
              ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}
              relative z-10
            `}>
              <div className="flex-1 text-center">
                <h3 className="
                  text-base                              /* Mobile: 16px */
                  sm:text-lg md:text-xl                 /* sm: 18px, md: 20px */
                  font-bold 
                  mb-2
                ">
                  {course.title}
                </h3>
                <p className="
                  text-xs                               /* Mobile: 12px */
                  sm:text-sm md:text-base              /* sm: 14px, md: 16px */
                  text-foreground/60 
                  mb-1
                ">
                  {course.date}
                </p>
                <p className="
                  text-xs                               /* Mobile: 12px */
                  sm:text-sm md:text-base              /* sm: 14px, md: 16px */
                  text-foreground/80
                ">
                  {course.description}
                </p>
              </div>
              
              <div className="relative z-20">
                <motion.div 
                  className="w-3 h-3 sm:w-4 sm:h-4 bg-black dark:bg-white rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: index * 0.2
                  }}
                />
              </div>
              
              <div className="flex-1" />
            </div>
          </AnimatedText>
        ))}
      </div>

      {/* Buttons outside timeline container */}
      {!showAll && courses.length > 5 && (
        <AnimatedText>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="
                text-lg
                text-neutral-600 dark:text-neutral-400
                p-4
                transition-transform duration-300
                hover:scale-110
                z-0
                flex items-center gap-2
              "
            >
              Show More
              <svg 
                className="w-5 h-5 stroke-black dark:stroke-white" 
                viewBox="0 0 24 24" 
                fill="none" 
                strokeWidth="2"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </AnimatedText>
      )}

      {showAll && (
        <AnimatedText>
          <div className="flex justify-center mt-8">
            <button
              onClick={handleCollapse}
              className="
                text-lg
                text-neutral-600 dark:text-neutral-400
                p-4
                transition-transform duration-300
                hover:scale-110
                z-0
                flex items-center gap-2
              "
            >
              Show Less
              <svg 
                className="w-5 h-5 stroke-black dark:stroke-white" 
                viewBox="0 0 24 24" 
                fill="none" 
                strokeWidth="2"
              >
                <path d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </AnimatedText>
      )}

      {/* Publications Section */}
      <AnimatedText>
        <div className="mt-8 space-y-2">
          <h2 className="text-xl font-bold text-[var(--foreground)]">Publications</h2>
          
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Conference Papers</h3>
              <p className="text-base text-foreground/80 leading-normal text-[var(--foreground)]/80">
                ・Momo Hanawa, Satomi Tokida, Yoshio Ishiguro. &quot;Leash as a Cue: Visual Indicators for Third-Party Acceptance Across Resistance Levels&quot; 2025 IEEE International Conference on Robot & Human Interactive Communication (RO-MAN), 2025. (7 pages)
              </p>
              <p className="text-base text-foreground/80 leading-normal text-[var(--foreground)]/80 mt-1">
                ・Momo Hanawa, Yoshio Ishiguro. &quot;ParaTalk: A Real-Time Paralinguistic Dialogue System for Human-Agent Interaction&quot; 2025 IEEE Conference on Virtual Reality and 3D User Interfaces Abstracts and Workshops (VRW). IEEE, 2025. (5 pages)
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Thesis</h3>
              <p className="text-base text-foreground/80 leading-normal text-[var(--foreground)]/80">
                ・Momo Hanawa, Katashi Nagao. &quot;A study on the placement and distribution function of automatic guided robots based on object detection and semantic segmentation&quot; Bachelor&apos;s Thesis, Nagoya University. February 2022. (63 pages)
              </p>
            </div>
          </div>
        </div>
      </AnimatedText>

      {/* Extracurricular Activities Section */}
      <AnimatedText>
        <div className="mt-8 space-y-2">
          <h2 className="text-xl font-bold text-[var(--foreground)]">Extracurricular Activities</h2>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-[var(--foreground)]">International Experience</h3>
            <p className="text-base text-foreground/80 leading-normal text-[var(--foreground)]/80">
              ・CuriousU Summer School (University of Twente, Netherlands, 2 weeks, August 2022) <br />
              ・Selected participant, Women in Cybersecurity Program (University of North Carolina at Chapel Hill, U.S., 2 weeks, September 2023) <br />
              ・Selected participant, Osaka Prefectural Global Leaders High School Short-term Training Program (Carolina, the U.S., 2 weeks, August 2018)
            </p>
          </div>
        </div>
      </AnimatedText>

      {/* Certification Section */}
      <AnimatedText>
        <div className="mt-8 space-y-2">
          <h2 className="text-xl font-bold text-[var(--foreground)]">Certification</h2>
          <p className="text-base text-foreground/80 leading-normal text-[var(--foreground)]/80">
            ・Feb 2025 - IELTS 6.5 <br />
            ・Apr 2023 - TOEIC 875 <br />
            ・Dec 2022 - Applied Information Technology Engineer Examination <br />
            ・Nov 2021 - Fundamental Information Technology Engineer Examination
          </p>
        </div>
      </AnimatedText>
    </section>
  )
}