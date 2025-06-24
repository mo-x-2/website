'use client'

import React from 'react'
import Image from "next/image"
import AnimatedText from "../common/AnimatedText"

// This is a configuration file for the skills showcase component
// You can modify the content below based on your skills and experience

// Skills categories and corresponding icon configuration
// Each skill item contains:
// - name: Skill name
// - icon: Icon path (SVG format, stored in public/skills/ directory)
const technologies = {
  // Frontend development skills examples
  frontend: [
    { name: 'React', icon: '/skills/react.svg' },
    { name: 'Vue', icon: '/skills/vue.svg' },     // Add your familiar frontend frameworks
    { name: 'TypeScript', icon: '/skills/typescript.svg' },
  ],
  
  // Backend development skills examples
  backend: [
    { name: 'Node.js', icon: '/skills/nodejs.svg' },
    { name: 'Python', icon: '/skills/python.svg' }, // Add your familiar backend languages
    { name: 'Java', icon: '/skills/java.svg' },
  ],

  // Database and deployment examples
  infrastructure: [
    { name: 'MySQL', icon: '/skills/mysql.svg' },  // Add databases you've used
    { name: 'MongoDB', icon: '/skills/mongodb.svg' },
    { name: 'Docker', icon: '/skills/docker.svg' }, // Add deployment tools you're familiar with
  ],

  // Development tools examples
  tools: [
    { name: 'Git', icon: '/skills/git.svg' },
    { name: 'VS Code', icon: '/skills/vscode.svg' },
    { name: 'Postman', icon: '/skills/postman.svg' }, // Add your commonly used development tools
  ]
}

// Category display name configuration
// You can modify category names or add new categories as needed
const categories = {
  frontend: 'Frontend Development',
  backend: 'Backend Development',
  infrastructure: 'Database & Deployment',
  tools: 'Development Tools'
}

// Usage instructions:
// 1. Add or modify your skill items in the technologies object
// 2. Ensure each skill's icon file exists in the public/skills/ directory
// 3. Set corresponding category display names in the categories object
// 4. To add new categories, add configurations in both objects

export default function MySkills() {
  return (
    <section id="skills" className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-2 sm:px-4">
        <AnimatedText>
          <h1 className="
            text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-12 text-center text-[var(--foreground)]
          ">
            Technical Skills
          </h1>
        </AnimatedText>
        
        <div className="
          max-w-5xl mx-auto 
          space-y-6 sm:space-y-8 md:space-y-12
        ">
          {(Object.keys(technologies) as Array<keyof typeof technologies>).map((category) => (
            <AnimatedText key={category} className="
              space-y-3 sm:space-y-4 md:space-y-6
            ">
              <h2 className="
                text-lg sm:text-xl md:text-2xl
                font-semibold text-center text-[var(--foreground)]
              ">
                {categories[category]}
              </h2>
              
              <div className="flex justify-center">
                <div className="
                  flex flex-wrap justify-center 
                  gap-3 sm:gap-4 md:gap-8 lg:gap-12
                ">
                  {technologies[category].map((tech) => (
                    <div
                      key={tech.name}
                      className="
                        flex flex-col items-center 
                        gap-1 sm:gap-2 md:gap-3
                        w-[70px] sm:w-[80px] md:w-[100px]
                        group
                      "
                    >
                      <div className="
                        relative 
                        w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20
                        flex items-center justify-center 
                        transition-all duration-300 
                        group-hover:scale-110   
                        group-hover:-translate-y-1
                      ">
                        <Image
                          src={tech.icon}
                          alt={tech.name}
                          width={48}
                          height={48}
                          className="
                            dark:invert
                            w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                          "
                        />
                      </div>
                      <span className="
                        text-xs sm:text-sm
                        font-medium 
                        text-[var(--foreground)]/70 
                        group-hover:text-[var(--foreground)]/90 
                        transition-colors 
                        text-center
                      ">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedText>
          ))}
        </div>
      </div>
    </section>
  )
} 