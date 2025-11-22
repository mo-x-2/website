'use client'

import Image from "next/image"
import AnimatedText from "../common/AnimatedText"
import FloatingElements from "../common/FloatingElements"
import Bubbles from "../common/Bubbles"



export default function Hero() {
  return (
    <section id="home" className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-8 sm:gap-16 font-[family-name:var(--font-geist-sans)] bg-[var(--background)] text-[var(--foreground)]">
      
      <main className="flex flex-col gap-6 sm:gap-8 row-start-2 items-center">

        <Bubbles 
          sectionId="home"
          bubbleCount={2}
          backgroundColor="var(--background)"
          strokeStyle = 'rgba(210, 83, 181, 0.7)'
        />

        <AnimatedText className="flex flex-col items-center gap-3 sm:gap-4">
          <Image
            className="rounded-full w-[180px] h-[180px] sm:w-[250px] sm:h-[250px]"
            src="/avatar.png" 
            alt="Profile Picture"
            width={250}
            height={250}
            sizes="(max-width: 640px) 180px, 250px"
            priority
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)]">Momo Hanawa</h1>
        </AnimatedText>

        <AnimatedText 
          className="max-w-2xl text-center"
        >
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
            Hi. I am a Master's student at <a href="https://ishiguro-lab.org/" target="_blank" className="underline decoration-dotted underline-offset-4 hover:text-[#d253b5] duration-300">Ishiguro Laboratory</a>
            , <a href="https://www.iii.u-tokyo.ac.jp/" target="_blank" className="underline decoration-dotted underline-offset-4 hover:text-[#d253b5] duration-300">III/GSII</a>, The University of Tokyo.<br />
            Currently, I am on an exchange program at the University of Sydney, in Australia.<br />
            My research interests include HCI, HAI, and HRI.
            </p>
        </AnimatedText>

        <AnimatedText 
          className="flex flex-wrap justify-center gap-2 sm:gap-4 items-center"
        >
                    <a
            className="
              relative
              z-20
              rounded-full border border-solid border-black/[.08] dark:border-white/[.145] 
              transition-colors flex items-center justify-center 
              hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] 
              h-10 sm:h-12
              px-3 sm:px-5
              text-sm sm:text-base
              mb-1
            "
            href="https://drive.google.com/file/d/1Vlml5WzAdf0rDG7ye7GAcABWTEYyAesH/view?usp=sharing" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert mr-1 sm:mr-2"
              src="/cv.svg"
              alt="CV"
              width={18}
              height={18}
              sizes="18px"
            />
            <span className="relative z-20">CV</span>
          </a>
          <a
            className="
              relative
              z-20
              rounded-full border border-solid border-black/[.08] dark:border-white/[.145] 
              transition-colors flex items-center justify-center 
              hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] 
              h-10 sm:h-12
              px-3 sm:px-5
              text-sm sm:text-base
              mb-1
            "
            href="https://www.linkedin.com/in/momohanawa/" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert mr-1 sm:mr-2"
              src="/linkedin.svg"
              alt="LinkedIn"
              width={18}
              height={18}
              sizes="18px"
            />
            <span className="relative z-20">LinkedIn</span>
          </a>
          <a
            className="
              relative
              z-20
              rounded-full border border-solid border-black/[.08] dark:border-white/[.145] 
              transition-colors flex items-center justify-center 
              hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] 
              h-10 sm:h-12
              px-3 sm:px-5
              text-sm sm:text-base
              mb-1
            "
            href="mailto:momohanawa@g.ecc.u-tokyo.ac.jp" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert mr-1 sm:mr-2"
              src="/mail.svg"
              alt="Mail"
              width={18}
              height={18}
              sizes="18px"
            />
            <span className="relative z-20">Email</span>
          </a>
          <a
            className="
              relative
              z-20
              rounded-full border border-solid border-black/[.08] dark:border-white/[.145] 
              transition-colors flex items-center justify-center 
              hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] 
              h-10 sm:h-12
              px-3 sm:px-5
              text-sm sm:text-base
              mb-1
            "
            href="https://github.com/mo-x-2" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="invert dark:invert-0 mr-1 sm:mr-2"
              src="/github.svg"
              alt="GitHub"
              width={18}
              height={18}
              sizes="18px"
            />
            <span className="relative z-20">GitHub</span>
          </a>

          
        </AnimatedText>
      </main>
    </section>
  )
} 