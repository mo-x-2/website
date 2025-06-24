'use client'

import { useState } from 'react'
import AnimatedText from "../common/AnimatedText"
import { motion } from "framer-motion"

interface CourseItem {
  date: string
  title: React.ReactNode
  type: string
  description: React.ReactNode
}

// Example course data - Replace with your own education experience
const courses: CourseItem[] = [
  {
    date: "Apr 2020 - Mar 2024",
    title: "B.C. Nagoya University",
    type: "# Education",
    description: (
      <>
        Computer Science |{' '}
        <a 
          href="http://www.nagao.nuie.nagoya-u.ac.jp/"
          target="_blank" 
          className="underline decoration-dotted underline-offset-4 hover:text-pink-500 duration-300"
        >
          Nagao Laboratory
        </a>
      </>
    )
  },

  {
    date: "Aug 2022",
    title: (
      <a 
        href="https://www.utwente.nl/en/events/2022/8/645021/curiousu-summer-school"
        target="_blank"
        className="underline decoration-dotted underline-offset-4 hover:text-pink-500 duration-300"
      >
        CuriousU
      </a>
    ),
    type: "# Global Education",
    description: (
      <>
        Summer School | University of Twente | the Netherlands
      </>
    )
  },

  {
    date: "Sep 2023",
    title: (
      <a 
        href="https://www.unc.edu/posts/2023/11/28/women-defend-against-hackers-in-exchange-program/" 
        target="_blank"
        className="underline decoration-dotted underline-offset-4 hover:text-pink-500 duration-300"
      >
        Women in Cybersecurity Program
      </a>
    ),
    type: "# Global Education",
    description: (
      <>
        The University of North Carolina at Chapel Hill | the U.S.
      </>
    )
  },

  {
    date: "Apr 2024 - Current",
    title: "M.S. The University of Tokyo",
    type: "# Education",
    description: (
      <>
        HCI | {' '}
        <a 
          href="https://ishiguro-lab.org/"
          target="_blank" 
          className="underline decoration-dotted underline-offset-4 hover:text-pink-500 duration-300"
        >
          Ishiguro Laboratory
        </a>
      </>
    )
  },
  {
    date: "Jul - Dec 2024",
    title: (
      <a 
        href="https://weblab.t.u-tokyo.ac.jp/research/misc/"
        target="_blank"
        className="underline decoration-dotted underline-offset-4 hover:text-pink-500 duration-300"
      >
        Robot Showcase Team at Matsuo & Iwasawa Laboratory
      </a>
    ),
    type: "# Working",
    description: (
      <>Sim2Real | Reinforcement Learning | Quadruped Robot</>
    )
  },

  {
    date: "(Planned) Aug 2025 - Jun 2026",
    title: "University of Sydney",
    type: "# Global Education",
    description: (
      <> Exchange</>
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
                  {course.type}
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
    </section>
  )
}