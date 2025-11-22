'use client'

import AnimatedText from '../common/AnimatedText'
import Image from 'next/image'
import Bubbles from "../common/Bubbles"

// Define photo data type
// Each photo must include:
// - id: Unique identifier
// - image: Image path (stored in public/gallery/ directory)
// - date: Photo date
// - location: Photo location
// - description: Photo description
type Photo = {
  id: number
  image: string
  date: string
  location: string
  description: string
}

// Example photo data
// To add more photos:
// 1. Place your photo files in public/gallery/ directory
// 2. Copy the template below and add new photo entries
// 3. Update the image path, date, location and description
// 4. Recommended to sort photos in reverse chronological order
const photos: Photo[] = [
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
    image: "/gallery/20250824.JPG",
    date: "2025.08.24",
    location: "New Delhi, India",
    description: ""
  },
  {
    id: 5,
    image: "/gallery/20250312.jpg",
    date: "2025.03.12",
    location: "Saint-Malo, France",
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

export default function Gallery() {
  return (
    <section id="gallery" className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 bg-[var(--background)] text-[var(--foreground)]">
      <div className="
        min-h-screen
        flex flex-col items-center justify-center
        py-4 md:py-8
        relative
        overflow-hidden
        z-0
      ">

        <Bubbles 
          sectionId="gallery"
          bubbleCount={0}
          backgroundColor="rgba(255, 255, 255, 1)"
          strokeStyle = 'rgba(1, 56, 167, 0.5)'
        />

        <div className="relative z-10 w-full flex flex-col items-center">
          <AnimatedText>
            <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-[var(--foreground)]">
              Photo Gallery
            </h1>
          </AnimatedText>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
            {photos.map((photo) => (
              <AnimatedText key={photo.id}>
                <div 
                  className="
                    bg-white/[0.1] dark:bg-black/[0.2]
                    backdrop-blur-[20px]
                    rounded-2xl
                    border border-white/[0.1] dark:border-white/[0.1]
                    p-6
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                    h-full
                    flex flex-col
                  "
                >
                  <div className="relative w-full h-48 mb-4 rounded overflow-hidden">
                    <Image
                      src={photo.image}
                      alt={photo.description}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex flex-col flex-grow">
                    <h2 className="text-xl font-bold mb-2 text-[var(--foreground)]">
                      {photo.location}
                    </h2>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 font-[family-name:var(--font-nunito-sans)]">
                      {photo.date}
                    </p>
                  </div>
                </div>
              </AnimatedText>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 