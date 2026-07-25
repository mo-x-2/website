'use client'

import Image from 'next/image'
import Script from 'next/script'
import Link from 'next/link'
import { useEffect } from 'react'
import { 
  getProjectById,
  PROJECT_DATA,
  type ProjectImageBlock,
} from '@/app/data/project'
import { useLanguage } from '@/app/context/LanguageContext'
import { t, ui, PROJECT_LOCALE } from '@/app/data/i18n'

const flattenImageSrcs = (blocks: ProjectImageBlock[]): string[] =>
  blocks.flatMap((block) => (typeof block === 'string' ? [block] : block.images))

const preloadImages = (srcs: string[]) => {
  if (typeof window === 'undefined') return;

  srcs.forEach((src) => {
    const image = new window.Image();
    image.src = src;
  });
};

export default function ProjectDetail({ projectId }: { projectId: number }) {
  const { locale } = useLanguage()
  const experience = getProjectById(projectId) || Object.values(PROJECT_DATA)[0]
  const localized = locale === 'ja' ? PROJECT_LOCALE[experience.id]?.ja : undefined

  const company = localized?.company ?? experience.company
  const overview = localized?.overview ?? experience.overview
  const features = experience.features?.map((feature, index) => ({
    title: localized?.features?.[index]?.title ?? feature.title,
    description: localized?.features?.[index]?.description ?? feature.description,
  }))
  const images = experience.images ?? []

  useEffect(() => {
    window.scrollTo(0, 0)
    if (experience.images) preloadImages(flattenImageSrcs(experience.images))
  }, [experience.images, projectId])

  const localizedTag = experience.tag && ui.projects.tags[experience.tag]
    ? t(ui.projects.tags[experience.tag], locale)
    : experience.tag

  return (
    <>
      {experience.videoUrl && (
        <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />
      )}

      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-24 pb-16 md:pb-24">
          <div className="space-y-14">
            <header className="space-y-8">
              <div className="flex items-start justify-between gap-4">
                <Link
                  href="/#projects"
                  className="
                    text-sm
                    text-foreground/50 hover:text-[var(--accent)]
                    transition-colors
                  "
                >
                  {t(ui.modal.back, locale)}
                </Link>
                {experience.github && (
                  <a
                    href={experience.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex items-center gap-2
                      text-sm
                      text-foreground/50 hover:text-[var(--accent)]
                      transition-colors
                    "
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    {t(ui.modal.viewCode, locale)}
                  </a>
                )}
              </div>

              <div className="space-y-3">
                <h1 className="section-heading tracking-tight text-[var(--foreground)] leading-[1.05]">
                  {experience.title}
                </h1>
                {company && (
                  <p className="text-sm font-[Arial,sans-serif] text-foreground/50">
                    {company}
                  </p>
                )}
              </div>

              <dl className="grid grid-cols-[7rem_1fr] sm:grid-cols-[9rem_1fr] gap-x-4 gap-y-2 max-w-3xl font-[Arial,sans-serif]">
                {localizedTag && (
                  <>
                    <dt className="text-sm text-foreground/40">{t(ui.modal.tag, locale)}</dt>
                    <dd className="text-sm text-foreground/70">{localizedTag}</dd>
                  </>
                )}
                {(experience.period || experience.state) && (
                  <>
                    <dt className="text-sm text-foreground/40">{t(ui.modal.period, locale)}</dt>
                    <dd className="text-sm text-foreground/70">
                      {[experience.period, experience.state].filter(Boolean).join(', ')}
                    </dd>
                  </>
                )}
                {experience.collaborators && (
                  <>
                    <dt className="text-sm text-foreground/40">{t(ui.modal.team, locale)}</dt>
                    <dd className="text-sm text-foreground/70">{experience.collaborators}</dd>
                  </>
                )}
              </dl>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-[9rem_1fr] gap-x-4 gap-y-2 font-[Arial,sans-serif]">
              <p className="text-sm text-foreground/40 md:pt-0.5">
                {t(ui.modal.overview, locale)}
              </p>
              <p className="body-text leading-[1.8] text-foreground/70">
                {overview}
              </p>
            </section>

            <div className="space-y-12">
              {/* Teaser */}
              {experience.videoUrl ? (
                <div
                  className="relative block w-full rounded-none overflow-hidden"
                  style={{ paddingBottom: '56.25%' }}
                >
                  <iframe
                    src={experience.videoUrl}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="absolute top-0 left-0 w-full h-full"
                    title={experience.title}
                    allowFullScreen
                  />
                </div>
              ) : experience.mainImage ? (
                <a 
                  href={experience.link || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`
                    relative block
                    w-full aspect-[4/3] sm:aspect-[16/10]
                    rounded-none overflow-hidden
                    ${experience.link ? 'group cursor-pointer' : 'pointer-events-none'}
                  `}
                  onClick={e => !experience.link && e.preventDefault()}
                >
                  {experience.link && (
                    <div className="
                      absolute inset-0
                      bg-gradient-to-t from-black/50 to-transparent
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-300
                      z-10
                      flex items-end justify-center
                      pb-6
                    ">
                      <span className="
                        text-white
                        text-sm sm:text-base
                        font-medium
                        px-4 py-2
                        rounded-none
                        bg-black/30
                        backdrop-blur-sm
                        border border-white/10
                      ">
                        {t(ui.modal.viewProject, locale)}
                      </span>
                    </div>
                  )}
                  <Image
                    src={experience.mainImage}
                    alt={experience.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </a>
              ) : null}

              {/* Feature texts under teaser */}
              {features && features.length > 0 && (
                <div className="space-y-8">
                  {features.map((feature, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="subheading">
                        {feature.title}
                      </h3>
                      <p className="body-text text-foreground/70 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Images listed below texts */}
              {images.length > 0 && (
                <div className="space-y-4">
                  {images.map((block, index) => {
                    if (typeof block === 'string') {
                      return (
                        <div
                          key={index}
                          className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-none overflow-hidden"
                        >
                          <Image
                            src={block}
                            alt={`${experience.title} ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )
                    }

                    return (
                      <div
                        key={index}
                        className="grid grid-cols-2 gap-2 sm:gap-4 items-start"
                      >
                        {block.images.map((img, imgIndex) => (
                          <div
                            key={imgIndex}
                            className={
                              block.aspect
                                ? 'relative w-full overflow-hidden'
                                : 'relative w-full'
                            }
                            style={
                              block.aspect
                                ? { aspectRatio: block.aspect.replace('/', ' / ') }
                                : undefined
                            }
                          >
                            {block.aspect ? (
                              <Image
                                src={img}
                                alt={`${experience.title} ${index + 1}-${imgIndex + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 50vw, 480px"
                              />
                            ) : (
                              <Image
                                src={img}
                                alt={`${experience.title} ${index + 1}-${imgIndex + 1}`}
                                width={0}
                                height={0}
                                sizes="(max-width: 640px) 50vw, 480px"
                                className="w-full h-auto"
                                style={{ width: '100%', height: 'auto' }}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {experience.publication && (
              <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 italic">
                  {experience.publication}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
