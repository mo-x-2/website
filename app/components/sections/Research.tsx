'use client'

import AnimatedText from '../common/AnimatedText'
import ResearchModal from './ResearchModal'
import ExperienceModal from './Motal'
import Bubbles from "../common/Bubbles"
import { useState } from 'react'
import Image from 'next/image'

// Type definition for research paper entries
type Publication = {
  id: number                  // Unique identifier for the paper
  title: string              // Paper title
  authors: string            // Author list
  year: string              // Publication year
  journal?: string          // Journal name (optional)
  type: 'publication' | 'working'  // Paper type: published/working
  pdf?: string             // PDF link (optional)
  ssrn?: string           // SSRN link (optional)
  description?: string    // Brief description (optional)
  citations?: string[]    // Citation list (optional)
  bulletPoints?: string[] // Key points list (optional)
  project?: string    // Project name (optional)
  overview?: string[]       // Detailed overview (optional)
  publishDate?: string    // Publication date (optional)
  chartImage?: string     // Chart image path (optional)
}


// Example research paper data
// Usage Instructions:
// 1. Copy template below and modify content as needed
// 2. Required fields for each paper: id, title, year, type
// 3. Other fields are optional based on paper details
// 4. Papers are automatically displayed by type
const publications: Publication[] = [
  {
    // Published paper example
    id: 2,
    title: "ParaTalk: A Real-Time Paralinguistic Dialogue System for Human-Agent Interaction",
    authors: "with Yoshio Ishiguro",
    year: "2023",
    journal: "2025 IEEE Conference on Virtual Reality and 3D User Interfaces Abstracts and Workshops (VRW)",
    type: "publication",
    project: "Paralinguistic Dialogue System",
    overview: [
      "In human–agent interactions, spoken language interfaces often pose challenges such as high cognitive load and reduced practicality in noisy environments. Semantic-Free Utterances (SFUs), which are non-verbal sounds lacking semantic content, have emerged as a promising alternative to mitigate these issues. However, existing approaches rarely tackle the key problem of generating real-time, context-aware SFU responses. We address this gap by introducing ParaTalk, a paralinguistic dialogue system that uses a large language model to interpret user verbal input and generate Paralinguistic Utterances (PUs), a specific type of SFU, in real time. The system dynamically combines emotional states (e.g., Neutral, Pleasant, Unpleasant, Activation) with intentional expressions (e.g., Affirmation, Negation, Unsure, Question, Acknowledgment) to generate appropriate responses. In this method, we explore the potential of verbal and non-verbal communication and propose new guidelines for designing dialogue interfaces with agents.",
    ],
    publishDate: "2025",
    chartImage: "/research/1.png"
    },
    {
    // Working paper example
    id: 1,
    title: "hogehoge",
    authors: "",
    year: "20xx",
    type: "working",
  }
]


export default function Research() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPaper, setSelectedPaper] = useState<Publication | null>(null)

  const handleOpenModal = (paper: Publication) => {
    setSelectedPaper(paper)
    setModalOpen(true)
  }

  return (
    <section id="research" className="
      min-h-screen w-full 
      flex items-center justify-center 
      py-16 px-4 sm:px-8 md:px-16
    ">

      <div className="container max-w-4xl mx-auto relative z-10">

        <Bubbles 
          sectionId="research"
          bubbleCount={1}
          backgroundColor="rgba(255, 255, 255, 1)"
          strokeStyle = 'rgba(24, 145, 48, 0.3)'
        /> 

        <AnimatedText>
          <h1 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Research
          </h1>
        </AnimatedText>

        <div className="space-y-16">
          {['publication', 'working'].map((type) => (
            <div key={type} className="space-y-8">
              <AnimatedText>
                <h2 className="text-xl sm:text-2xl font-semibold">
                  {type === 'working' ? 'Working Papers' : 'Publications'}
                </h2>
              </AnimatedText>

              {publications
                .filter(paper => paper.type === type)
                .map((paper) => (
                  <AnimatedText key={paper.id}>
                    <div className="
                      flex flex-col sm:flex-row sm:items-center sm:justify-between
                      pb-6 border-b border-black/10 dark:border-white/10
                    ">
                      <div className="space-y-2 sm:space-y-0">
                        <div className="flex flex-wrap items-center gap-2 text-sm sm:text-lg">
                          <span className="font-medium">{paper.title}</span>
                          {paper.authors && (
                            <span className="opacity-70">({paper.authors})</span>
                          )}
                          <span className="opacity-70">{paper.year}.</span>
                          {paper.pdf && (
                            <a 
                              href={paper.pdf}
                              className="text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                            >
                              [PDF]
                            </a>
                          )}
                          {paper.ssrn && (
                            <a 
                              href={paper.ssrn}
                              className="text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                            >
                              [SSRN]
                            </a>
                          )}
                        </div>

                        {paper.journal && (
                          <p className="opacity-80 text-xs sm:text-base italic">
                            {paper.journal}
                          </p>
                        )}

                        {paper.project && (
                          <p className="opacity-70 text-xs sm:text-base">
                            Related Project: {paper.project}
                          </p>
                        )}

                        {paper.description && (
                          <p className="opacity-70 text-xs sm:text-base">
                            {paper.description}
                          </p>
                        )}

                        {paper.bulletPoints && (
                          <ul className="list-disc list-inside opacity-70 text-xs sm:text-base pl-1 space-y-1">
                            {paper.bulletPoints.map((point, index) => (
                              <li key={index}>{point}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                      
                      <button
                        onClick={() => handleOpenModal(paper)}
                        className="
                          rounded-full border border-solid border-black/[.08] dark:border-white/[.145] 
                          transition-all flex items-center justify-center 
                          hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] 
                          hover:border-transparent 
                          hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]
                          dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]
                          h-9 sm:h-10                                   
                          px-4                                   
                          text-sm
                          whitespace-nowrap                    
                          min-w-[120px] sm:min-w-[140px]      
                          mt-4 sm:mt-0 sm:ml-6                        
                          flex-shrink-0
                          group                               
                        "
                      >
                        <span className="
                          mr-2
                          group-hover:translate-x-0.5
                          transition-transform duration-300
                        ">
                          View Details
                        </span>
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 16 16" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          className="
                            group-hover:translate-x-0.5
                            transition-transform duration-300
                            stroke-black dark:stroke-white
                          "
                        >
                          <path 
                            d="M3 8H13M13 8L8 3M13 8L8 13" 
                            strokeWidth="1.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </AnimatedText>
                ))}
            </div>
          ))}
        
        </div>
        
      </div>

      {modalOpen && selectedPaper && (
        <ResearchModal
          paper={selectedPaper}
          onClose={() => setModalOpen(false)}
        />
      )}
    </section>
  )
} 