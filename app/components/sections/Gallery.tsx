'use client'

import { useState, useEffect, useMemo } from 'react'
import AnimatedText from '../common/AnimatedText'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '@/app/context/LanguageContext'
import { t, ui } from '@/app/data/i18n'

type Photo = {
  id: number
  image: string
  date: string
  location: string
  description: string
}

const photos: Photo[] = [
  {
    id: 11,
    image: "/gallery/20260219.JPG",
    date: "2026.02.19",
    location: "Bali, Indonesia",
    description: ""
  },
  {
    id: 10,
    image: "/gallery/20260127.jpg",
    date: "2026.01.27",
    location: "Queensland, Australia",
    description: ""
  },
  {
    id: 9,
    image: "/gallery/20251004.JPG",
    date: "2025.10.04",
    location: "Sydney, Australia",
    description: ""
  },
  {
    id: 8,
    image: "/gallery/20250920.JPG",
    date: "2025.09.20",
    location: "Sydney, Australia",
    description: ""
  },
  {
    id: 7,
    image: "/gallery/20250917.JPG",
    date: "2025.09.17",
    location: "Sydney, Australia",
    description: ""
  },
  {
    id: 6,
    image: "/gallery/20250829.JPG",
    date: "2025.08.29",
    location: "Antwerp, Belgium",
    description: ""
  },
  {
    id: 5,
    image: "/gallery/20250824.JPG",
    date: "2025.08.24",
    location: "New Delhi, India",
    description: ""
  },
  {
    id: 4,
    image: "/gallery/20250127.jpg",
    date: "2025.01.27",
    location: "Cappadocia, Turkey",
    description: ""
  },
  {
    id: 3,
    image: "/gallery/20240320.JPG",
    date: "2024.03.20",
    location: "Hokkaido, Japan",
    description: ""
  },
  {
    id: 2,
    image: "/gallery/20240227.JPG",
    date: "2024.02.27",
    location: "Shanghai, China",
    description: ""
  }
]

type CircleItem = {
  angle: number
  width: number
  tilt: number
  floatDuration: number
  floatDelay: number
  floatY: number
}

function createCircleItems(count: number): CircleItem[] {
  const widths = [148, 168, 156, 176, 150, 170, 160, 180, 154, 164]
  const tilts = [-6, 4, -3, 7, -5, 3, -4, 6, -2, 5]

  return Array.from({ length: count }, (_, i) => ({
    angle: (360 / count) * i - 90, // start from top
    width: widths[i % widths.length],
    tilt: tilts[i % tilts.length],
    floatDuration: 5 + (i % 4),
    floatDelay: i * 0.25,
    floatY: 6 + (i % 3) * 2,
  }))
}

function ImageModal({ 
  open, 
  onClose,
  photo 
}: { 
  open: boolean
  onClose: () => void
  photo: Photo | null
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  if (!open || !photo) return null;

  return (
    <div 
      className="
        fixed inset-0 
        flex items-center justify-center 
        p-4 sm:p-8 
        bg-black/80 dark:bg-black/90
        z-50
        transition-all duration-300 ease-in-out
      "
      onClick={onClose}
    >
      <div 
        className="
          relative w-full h-full max-w-7xl max-h-[95vh]
          overflow-hidden
        "
        onClick={e => e.stopPropagation()}
      >
        <div className="relative w-full h-full">
          <Image
            src={photo.image}
            alt={photo.description || photo.location}
            fill
            className="object-cover"
            priority
          />
        </div>

        <button
          onClick={onClose}
          className="
            absolute top-4 right-4
            p-2
            rounded-none
            text-white
            bg-black/30
            hover:bg-black/50
            transition-all duration-300
            focus:outline-none
            focus:ring-2 focus:ring-white/50
            z-20
          "
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

        <div className="
          absolute bottom-0 left-0 right-0
          bg-gradient-to-t from-black/80 via-black/60 to-transparent
          p-6 sm:p-8
          z-10
        ">
          <div className="text-center">
            <h2 className="section-heading text-white mb-2">
              {photo.location}
            </h2>
            <p className="body-text text-white/90">
              {photo.date}
            </p>
            {photo.description && (
              <p className="body-text text-white/80 mt-2">
                {photo.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function CirclePhoto({
  photo,
  item,
  radius,
  reduceMotion,
  orbitDuration,
  onClick,
}: {
  photo: Photo
  item: CircleItem
  radius: number
  reduceMotion: boolean
  orbitDuration: number
  onClick: () => void
}) {
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: item.width,
        marginLeft: -item.width / 2,
        marginTop: -(item.width * 0.75) / 2,
        // Place on circle, then cancel placement rotation so the slot stays upright
        transform: `rotate(${item.angle}deg) translateY(-${radius}px) rotate(${-item.angle}deg)`,
      }}
    >
      {/* Counter-rotate against the parent orbit so the image stays upright */}
      <motion.div
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={
          reduceMotion
            ? undefined
            : { duration: orbitDuration, repeat: Infinity, ease: 'linear' }
        }
      >
        <motion.button
          type="button"
          onClick={onClick}
          className="relative w-full cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(192,0,0,0.6)]"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          animate={
            reduceMotion
              ? { rotate: item.tilt }
              : {
                  y: [0, -item.floatY, 0],
                  rotate: [item.tilt, item.tilt + 1.5, item.tilt - 1.5, item.tilt],
                }
          }
          transition={
            reduceMotion
              ? { duration: 0.4 }
              : {
                  y: {
                    duration: item.floatDuration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: item.floatDelay,
                  },
                  rotate: {
                    duration: item.floatDuration * 1.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: item.floatDelay,
                  },
                  opacity: { duration: 0.5 },
                  scale: { duration: 0.5 },
                }
          }
          whileHover={{
            scale: 1.12,
            zIndex: 20,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.98 }}
          aria-label={`${photo.location}, ${photo.date}`}
        >
          <div className="
            relative aspect-[4/3] overflow-hidden
            shadow-[0_12px_40px_rgba(0,0,0,0.12)]
            ring-1 ring-black/5
            transition-shadow duration-300
            group-hover:shadow-[0_18px_50px_rgba(0,0,0,0.2)]
          ">
            <Image
              src={photo.image}
              alt={photo.location}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 45vw, 180px"
            />
            <div className="
              absolute inset-x-0 bottom-0
              bg-gradient-to-t from-black/55 to-transparent
              px-2 py-2
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300
            ">
              <p className="text-[11px] sm:text-xs text-white truncate text-left">
                {photo.location}
              </p>
            </div>
          </div>
        </motion.button>
      </motion.div>
    </div>
  )
}

export default function Gallery() {
  const { locale } = useLanguage()
  const reduceMotion = useReducedMotion()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const circleItems = useMemo(() => createCircleItems(photos.length), [])
  const orbitDuration = 120

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo)
    setModalOpen(true)
  }

  return (
    <>
      <section
        id="gallery"
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 bg-[var(--background)] text-[var(--foreground)]"
      >
        <div className="
          min-h-screen
          flex flex-col items-center
          py-16 md:py-20
          relative
          overflow-hidden
        ">
          <AnimatedText>
            <h1 className="section-heading mb-4 text-center text-[var(--foreground)] relative z-20">
              {t(ui.gallery.title, locale)}
            </h1>
          </AnimatedText>

          <p className="body-text text-foreground/50 text-center mb-6 relative z-20">
            {locale === 'ja' ? '写真をクリックしてご覧ください' : 'Click a photo to explore'}
          </p>

          {/* Desktop / tablet: circular arrangement */}
          <div className="relative hidden sm:flex w-full items-center justify-center aspect-square max-w-[720px] mx-auto">
            <motion.div
              className="relative w-full h-full"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: orbitDuration,
                      repeat: Infinity,
                      ease: 'linear',
                    }
              }
            >
              {photos.map((photo, index) => (
                <CirclePhoto
                  key={photo.id}
                  photo={photo}
                  item={circleItems[index]}
                  radius={280}
                  reduceMotion={!!reduceMotion}
                  orbitDuration={orbitDuration}
                  onClick={() => handlePhotoClick(photo)}
                />
              ))}
            </motion.div>

            {/* Soft center accent */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[38%] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(192,0,0,0.08) 0%, rgba(192,0,0,0.02) 45%, transparent 70%)',
              }}
              aria-hidden
            />
          </div>

          {/* Mobile: simpler wrap with light float */}
          <div className="sm:hidden w-full grid grid-cols-2 gap-4 px-1">
            {photos.map((photo, index) => (
              <motion.button
                key={photo.id}
                type="button"
                onClick={() => handlePhotoClick(photo)}
                className="relative aspect-[4/3] overflow-hidden"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, index % 2 === 0 ? -8 : 8, 0],
                      }
                }
                transition={{
                  duration: 4 + (index % 3),
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.15,
                }}
                whileTap={{ scale: 0.98 }}
                aria-label={`${photo.location}, ${photo.date}`}
              >
                <Image
                  src={photo.image}
                  alt={photo.location}
                  fill
                  className="object-cover"
                  sizes="45vw"
                />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <ImageModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        photo={selectedPhoto}
      />
    </>
  )
}
