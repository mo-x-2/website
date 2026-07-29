'use client'

import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/app/context/LanguageContext"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Background", href: "#education" },
]

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const { locale, setLocale } = useLanguage()
  const [activeSection, setActiveSection] = useState("home")
  const underlineRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLUListElement>(null)
  const NAVBAR_HEIGHT = 60

  useEffect(() => {
    if (!isHome) return

    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")
      const scrollPosition = window.scrollY + NAVBAR_HEIGHT + 100

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = section.clientHeight
        const sectionId = section.getAttribute("id") || ""

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHome])

  useEffect(() => {
    const activeItem = navRef.current?.querySelector(`a[href="#${activeSection}"]`)
    if (activeItem && underlineRef.current && navRef.current) {
      const rect = activeItem.getBoundingClientRect()
      const navRect = navRef.current.getBoundingClientRect()
      
      underlineRef.current.style.left = `${rect.left - navRect.left}px`
      underlineRef.current.style.width = `${rect.width}px`
    }
  }, [activeSection, isHome])

  const scrollToSection = (href: string) => {
    const target = document.querySelector(href) as HTMLElement
    
    if (target) {
      const targetPosition = target.offsetTop - NAVBAR_HEIGHT
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="
        max-w-6xl mx-auto 
        px-3 sm:px-4
        py-4
        relative
        flex items-center justify-center
      ">
        <ul ref={navRef} className="
          flex justify-center 
          gap-4 sm:gap-8
          relative text-center overflow-x-auto
        ">
          {isHome && (
            <div
              ref={underlineRef}
              className="absolute bottom-0 h-[2px] bg-neutral-950 dark:bg-neutral-50 transition-all duration-300 ease-out"
            />
          )}
          
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={isHome ? item.href : `/${item.href}`}
                className={`
                  text-xs sm:text-sm
                  font-medium whitespace-nowrap transition-colors
                  hover:text-[#C00000]
                  ${isHome && activeSection === item.href.slice(1)
                    ? "text-foreground"
                    : "text-foreground/60"
                  }
                `}
                onClick={(e) => {
                  if (!isHome) {
                    return
                  }
                  e.preventDefault()
                  scrollToSection(item.href)
                }}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs sm:text-sm">
          <button
            type="button"
            onClick={() => setLocale('en')}
            className={`
              px-1.5 py-0.5 transition-colors
              ${locale === 'en'
                ? "text-foreground font-bold"
                : "text-foreground/50 hover:text-[#C00000] font-medium"
              }
            `}
            aria-pressed={locale === 'en'}
            aria-label="Switch to English"
          >
            EN
          </button>
          <span className="text-foreground/30" aria-hidden="true">/</span>
          <button
            type="button"
            onClick={() => setLocale('ja')}
            className={`
              px-1.5 py-0.5 transition-colors
              ${locale === 'ja'
                ? "text-foreground font-bold"
                : "text-foreground/50 hover:text-[#C00000] font-medium"
              }
            `}
            aria-pressed={locale === 'ja'}
            aria-label="Switch to Japanese"
          >
            JP
          </button>
        </div>
      </div>
    </nav>
  )
}
