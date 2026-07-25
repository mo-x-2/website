'use client'

// Step 1: Import necessary components
// You can find all component files in the /components directory
import Hero from "./components/sections/Hero"
import About from "./components/sections/About"
import CourseTimeline from "./components/education/CourseTimeline" 
import Navbar from "./components/common/Navbar"
import { Box } from '@mui/material'
import Projects from './components/sections/Projects'
import { useLanguage } from './context/LanguageContext'
import { t, ui } from './data/i18n'

export default function Home() {
  const { locale } = useLanguage()

  return (
    <>
      <Navbar />
      <main>
        <Hero />    
        <Projects />
        <About />
        
        <section id="education" className="relative">
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            p: { xs: 2, sm: 3, md: 4 },
            minHeight: '100vh',
            justifyContent: 'center'
          }}>
            <h1 className="section-heading mb-12 text-center text-[var(--foreground)]">{t(ui.background.title, locale)}</h1>
            <CourseTimeline />
          </Box>
        </section>
      </main>
    </>
  )
}
