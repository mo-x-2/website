'use client'

import Image from 'next/image'
import Script from 'next/script'
import { useEffect } from 'react'
import { 
  getProjectById,
  PROJECT_DATA,
  type ProjectImageBlock,
} from '@/app/data/project'
import { useLanguage } from '@/app/context/LanguageContext'
import { t, ui, PROJECT_LOCALE } from '@/app/data/i18n'

const COLORS = {
  text: '#000000',
  border: 'rgba(192, 0, 0, 0.5)',
} as const

const flattenImageSrcs = (blocks: ProjectImageBlock[]): string[] =>
  blocks.flatMap((block) => (typeof block === 'string' ? [block] : block.images))

const preloadImages = (srcs: string[]) => {
  if (typeof window === 'undefined') return;

  srcs.forEach((src) => {
    const image = new window.Image();
    image.src = src;
  });
};

export default function ExperienceModal({ 
  open, 
  onClose,
  experienceId 
}: { 
  open: boolean
  onClose: () => void
  experienceId: number 
}) {
  const { locale } = useLanguage()
  const experience = getProjectById(experienceId) || Object.values(PROJECT_DATA)[0];
  const localized = locale === 'ja' ? PROJECT_LOCALE[experience.id]?.ja : undefined

  const company = localized?.company ?? experience.company
  const overview = localized?.overview ?? experience.overview
  const features = experience.features?.map((feature, index) => ({
    title: localized?.features?.[index]?.title ?? feature.title,
    description: localized?.features?.[index]?.description ?? feature.description,
  }))
  const images = experience.images ?? []

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      if (experience.images) preloadImages(flattenImageSrcs(experience.images));
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [open, experience.images]);

  if (!open) return null;

  const localizedTag = experience.tag && ui.projects.tags[experience.tag]
    ? t(ui.projects.tags[experience.tag], locale)
    : experience.tag

  const metaParts = [
    localizedTag,
    experience.period,
    experience.state,
  ].filter(Boolean)

  return (
    <>
      {experience.videoUrl && (
        <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />
      )}
      <div 
        className="
          fixed inset-0 
          flex items-center justify-center 
          p-4 sm:p-8 
          bg-black/40 dark:bg-black/60
          backdrop-blur-md
          z-50
          transition-all duration-300 ease-in-out
        "
        onClick={onClose}
      >
      <div 
        className="
          relative w-full max-w-[1000px] max-h-[90vh] overflow-auto
          bg-gradient-to-br from-white/80 to-white/70 
          dark:from-black/90 dark:to-black/85
          backdrop-blur-xl
          rounded-none
          border border-white/20 dark:border-white/15
          shadow-[0_8px_32px_rgba(0,0,0,0.1)]
          dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
          transition-all duration-300
          p-6 sm:p-8 md:p-10
          scrollbar-thin scrollbar-track-transparent 
          scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700
        "
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4
            p-2
            rounded-none
            text-gray-500 dark:text-gray-400
            hover:bg-black/5 dark:hover:bg-white/5
            transition-all duration-300
            focus:outline-none
            focus:ring-2
          "
          style={{ '--tw-ring-color': `${COLORS.border}` } as React.CSSProperties}
          aria-label="Close"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="space-y-10">
          {/* Basic info + overview */}
          <div className="space-y-6 pr-8">
            <div className="space-y-3">
              {company && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {company}
                </p>
              )}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <h1 
                  className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
                  style={{ color: COLORS.text }}
                >
                  {experience.title}
                </h1>
                {experience.github && (
                  <a
                    href={experience.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex items-center gap-2
                      px-4 py-2
                      text-sm font-medium
                      rounded-none
                      border border-gray-200 dark:border-gray-800
                      hover:bg-gray-100 dark:hover:bg-gray-800
                      text-gray-700 dark:text-gray-300
                      transition-colors duration-300
                    "
                  >
                    <svg 
                      className="w-5 h-5" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="hidden sm:inline">{t(ui.modal.viewCode, locale)}</span>
                  </a>
                )}
              </div>

              <div className="space-y-1 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {metaParts.length > 0 && (
                  <p>{metaParts.join(', ')}</p>
                )}
                {experience.collaborators && (
                  <p>{t(ui.modal.with, locale)} {experience.collaborators}</p>
                )}
                {experience.publication && (
                  <p className="text-xs sm:text-sm italic pt-1">
                    {experience.publication}
                  </p>
                )}
              </div>
            </div>

            <p 
              className="
                text-base sm:text-lg 
                leading-relaxed 
                text-gray-600 dark:text-gray-300
                border-l-4
                pl-4
              "
              style={{ borderColor: COLORS.border }}
            >
              {overview}
            </p>
          </div>

          {/* Media list: hero media then feature blocks stacked vertically */}
          <div className="space-y-12">
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

            {features && features.length > 0 && (
              <div className="space-y-8">
                {features.map((feature, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="subheading">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

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
        </div>
      </div>
    </div>
    </>
  )
}
