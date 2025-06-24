'use client'

import AnimatedText from "../common/AnimatedText"
import Image from "next/image"
import Bubbles from "../common/Bubbles"

export default function About() {
  return (
    <section id="about" className="min-h-screen w-full flex items-center justify-center p-8 bg-[var(--background)] text-[var(--foreground)]">

      <div className="max-w-6xl w-full">
        <AnimatedText>
          <h1 className="text-4xl font-bold mb-8 text-[var(--foreground)]">About Me</h1>
        </AnimatedText>

        <div className="flex flex-col md:flex-row gap-8">
          {/*Text - 左側 */}
          <div className="md:w-3/4 space-y-8">
            <AnimatedText>
              <div className="space-y-4">
                <p className="text-lg text-foreground/80 leading-relaxed text-[var(--foreground)]/80">
                  I was born in Osaka and earned my bachelor's degree at Nagoya University, where I studied the fundamentals of computer science with a major in robotics. Currently, I am pursuing a master's degree at The University of Tokyo, and my research is focused on technologies that enhance human interaction. I specialize in Human-Computer Interaction (HCI), exploring the interaction between humans and agents, including robots and virtual agents.
                </p>
              </div>
            </AnimatedText>

            <AnimatedText>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-[var(--foreground)]">Personal Interests</h2>
                <p className="text-lg text-foreground/80 leading-relaxed text-[var(--foreground)]/80">
                Curiosity drives me, and I cherish every chance to connect with people and experience new cultures. I love traveling overseas, getting lost in a good movie, grooving to music, and even checking out Japanese comedy shows. Plus, I'm a huge cat lover!
                </p>
              </div>
            </AnimatedText>

            <AnimatedText>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-[var(--foreground)]">Certification</h2>
                <p className="text-lg text-foreground/80 leading-relaxed text-[var(--foreground)]/80">
                Feb 2025 - IELTS 6.5 <br />
                Apr 2023 - TOEIC 875 <br />
                Dec 2022 - Applied Information Technology Engineer Examination <br />
                Nov 2021 - Fundamental Information Technology Engineer Examination
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
                    <div className="relative overflow-hidden rounded aspect-[4/3]">
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
                    <div className="relative overflow-hidden rounded aspect-[4/3]">
                      <div className="absolute inset-y-0 left-0 w-[25%] z-25 bg-gradient-to-r from-white/100 to-transparent dark:from-black/50"></div>
                      <Image
                        src="/me2.jpg"
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