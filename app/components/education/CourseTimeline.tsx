'use client'

import { useState } from 'react'
import AnimatedText from "../common/AnimatedText"
import { motion } from "framer-motion"
import { useLanguage } from "@/app/context/LanguageContext"
import { t, ui } from "@/app/data/i18n"

export default function CourseTimeline() {
  const { locale } = useLanguage()
  const [showAll, setShowAll] = useState(false)
  const courses = ui.background.courses
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

  const linkClass = "underline decoration-dotted underline-offset-4 duration-300"
  const hoverHandlers = {
    onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.color = '#C00000'
    },
    onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.color = ''
    },
  }

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="relative">
        <div className="absolute left-1/2 top-0 w-[2px] h-full bg-neutral-200 dark:bg-neutral-800 z-0" />
        
        {displayedCourses.map((course, index) => (
          <AnimatedText key={index}>
            <div className={`
              flex items-center gap-4 sm:gap-6 md:gap-8 mb-12 
              ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}
              relative z-10
            `}>
              <div className="flex-1 text-center">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">
                  {t(course.title, locale)}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-foreground/60 mb-1">
                  {t(course.date, locale)}
                </p>
                <p className="text-xs sm:text-sm md:text-base text-foreground/80">
                  {'dept' in course && course.dept ? (
                    <>
                      <a
                        href={index === 0 ? "https://www.i.nagoya-u.ac.jp/si/cs/" : "https://www.iii.u-tokyo.ac.jp/"}
                        target="_blank"
                        className={linkClass}
                        {...hoverHandlers}
                      >
                        {t(course.dept, locale)}
                      </a>
                      {' | '}
                      <a
                        href={index === 0 ? "http://www.nagao.nuie.nagoya-u.ac.jp/" : "https://ishiguro-lab.org/"}
                        target="_blank"
                        className={linkClass}
                        {...hoverHandlers}
                      >
                        {t(course.lab!, locale)}
                      </a>
                    </>
                  ) : 'description' in course && course.description ? (
                    t(course.description, locale)
                  ) : null}
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
              {t(ui.background.showMore, locale)}
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
              {t(ui.background.showLess, locale)}
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

      <AnimatedText>
        <div className="mt-8 space-y-2">
          <h2 className="subheading">{t(ui.background.publications, locale)}</h2>
          
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2 underline decoration-1 underline-offset-4 decoration-[var(--foreground)]/30">{t(ui.background.conferencePapers, locale)}</h3>
              <p className="body-text text-foreground/80 leading-normal text-[var(--foreground)]/80 mt-1">
                ・Momo Hanawa, Yoshio Ishiguro. &quot;RecallMe: Designing a Ritualistic Artifact for Immersive Reflection with the Past Self&quot; Designing Interactive Systems Conference (DIS Companion &apos;26), Singapore, Singapore, June 13--17, 2026. ACM, 2026. (5 pages)
              </p>
              <p className="body-text text-foreground/80 leading-normal text-[var(--foreground)]/80">
                ・Momo Hanawa, Satomi Tokida, Yoshio Ishiguro. &quot;Leash as a Cue: Visual Indicators for Third-Party Acceptance Across Resistance Levels&quot; 2025 IEEE International Conference on Robot & Human Interactive Communication (RO-MAN), 2025. (7 pages)
              </p>
              <p className="body-text text-foreground/80 leading-normal text-[var(--foreground)]/80 mt-1">
                ・Momo Hanawa, Yoshio Ishiguro. &quot;ParaTalk: A Real-Time Paralinguistic Dialogue System for Human-Agent Interaction&quot; 2025 IEEE Conference on Virtual Reality and 3D User Interfaces Abstracts and Workshops (VRW). IEEE, 2025. (5 pages)
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2 underline decoration-1 underline-offset-4 decoration-[var(--foreground)]/30">{t(ui.background.thesis, locale)}</h3>
              <p className="body-text text-foreground/80 leading-normal text-[var(--foreground)]/80">
                ・Momo Hanawa, Katashi Nagao. &quot;A study on the placement and distribution function of automatic guided robots based on object detection and semantic segmentation&quot; Bachelor&apos;s Thesis, Nagoya University. February 2022. (63 pages)
              </p>
            </div>
          </div>
        </div>
      </AnimatedText>

      <AnimatedText>
        <div className="mt-8 space-y-2">
          <h2 className="subheading">{t(ui.background.extracurricular, locale)}</h2>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-[var(--foreground)] underline decoration-1 underline-offset-4 decoration-[var(--foreground)]/30">{t(ui.background.internationalExperience, locale)}</h3>
            <p className="body-text text-foreground/80 leading-normal text-[var(--foreground)]/80 whitespace-pre-line">
              {t(ui.background.internationalItems, locale)}
            </p>
          </div>
        </div>
      </AnimatedText>

      <AnimatedText>
        <div className="mt-8 space-y-2">
          <h2 className="subheading">{t(ui.background.certification, locale)}</h2>
          <p className="body-text text-foreground/80 leading-normal text-[var(--foreground)]/80 whitespace-pre-line">
            {t(ui.background.certificationItems, locale)}
          </p>
        </div>
      </AnimatedText>
      
      <div className="pb-16 md:pb-24"></div>
    </section>
  )
}
