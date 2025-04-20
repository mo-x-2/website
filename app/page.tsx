'use client'

// Step 1: Import necessary components
// You can find all component files in the /components directory
import Hero from "./components/sections/Hero"
import About from "./components/sections/About"
import CourseTimeline from "./components/education/CourseTimeline" 
import Navbar from "./components/common/Navbar"
import MySkills from './components/sections/MySkills'
import Experience from './components/sections/Experience'
import { Box } from '@mui/material'
import Projects from './components/sections/Projects'
import Gallery from './components/sections/Gallery'

// Step 2: Choose your template version
// For Researcher Template: uncomment these imports
import Research from './components/sections/Research'
// import Teaching from './components/sections/TeachingExperience'

// Step 3: Configure your website sections
// You can add/remove/reorder sections by modifying the components below
// Make sure section IDs match with navigation items in /components/common/Navbar.tsx
export default function Home() {
  return (
    <>
      {/* Navigation bar - Edit items in /components/common/Navbar.tsx */}
      <Navbar />
      <main>
        {/* Hero section - Edit content in /components/sections/Hero */}
        <Hero />    
        
        {/* About section - Edit your intro in /components/sections/About */}
        <About />
        
        {/* Education section - Edit timeline in /components/education/CourseTimeline */}
        <section id="education" className="relative">
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            p: 4,
          }}>
            <h1 className="text-4xl font-bold mb-12 text-center">Background</h1>
            <CourseTimeline />
          </Box>
        </section>
        
        {/* Research section - Showcase your projects in /components/sections/Research */}
        <Research />

        {/* Projects section - Showcase your projects in /components/sections/Projects */}
        <Projects />
      </main>
    </>
  )
}
