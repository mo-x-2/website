'use client'

import AnimatedText from "../common/AnimatedText"
import Image from "next/image"
import { useLanguage } from "@/app/context/LanguageContext"
import { t, ui } from "@/app/data/i18n"

export default function About() {
  const { locale } = useLanguage()

  return (
    <section id="about" className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 min-h-screen flex items-center justify-center p-8 bg-[var(--background)] text-[var(--foreground)]">

      <div className="max-w-6xl w-full">
        <AnimatedText>
          <h1 className="section-heading mb-12 text-center text-[var(--foreground)]">{t(ui.about.title, locale)}</h1>
          
        </AnimatedText>

        <div className="flex flex-col md:flex-row gap-8">
          {/*Text - 左側 */}
          <div className="md:w-3/4 space-y-8">
            <AnimatedText>
              <div className="space-y-4">
                <p className="body-text text-foreground/80 leading-relaxed text-[var(--foreground)]/80">
                  {t(ui.about.bio, locale)}
                </p>
              </div>
            </AnimatedText>

            <AnimatedText>
              <div className="space-y-4">
                <h2 className="subheading">{t(ui.about.interestsTitle, locale)}</h2>
                <p className="body-text text-foreground/80 leading-relaxed text-[var(--foreground)]/80">
                {t(ui.about.interests, locale)}
                </p>
              </div>
            </AnimatedText>
          </div>

          {/* Picture - 右側 */}
          <div className="md:w-1/4 space-y-8">
            <AnimatedText>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Picture 1 */}
                  <div>
                    <div className="relative overflow-hidden rounded-none aspect-[4/3]">
                      <div className="absolute inset-y-0 left-0 w-[25%] z-25 bg-gradient-to-r from-white/100 to-transparent dark:from-black/50"></div>
                      <Image
                        src="/me1.jpg"
                        alt="Me 1"
                        width={120}
                        height={90}
                        className="object-cover w-full h-full"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </div>

                  {/* 写真2 */}
                  <div>
                    <div className="relative overflow-hidden rounded-none aspect-[4/3]">
                      <div className="absolute inset-y-0 left-0 w-[25%] z-25 bg-gradient-to-r from-white/100 to-transparent dark:from-black/50"></div>
                      <Image
                        src="/me11.png"
                        alt="Me 2"
                        width={120}
                        height={90}
                        className="object-cover w-full h-full"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedText>

          </div>
        </div>
      </div>
    </section>
  )
}