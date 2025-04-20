import { useEffect, useState } from 'react'
import { Box } from '@mui/material'

type Props = {
  sectionId: string;
  gradientColors: {
    start: string;
    end: string;
  };
}

export default function GradientBackground({ sectionId, gradientColors }: Props) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.3 }
    )

    const section = document.getElementById(sectionId)
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [sectionId])

  return (
    <>
      {/* アニメーションのためのスタイルを追加 */}
      <style jsx global>{`
        @keyframes float1 {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(10px, 10px) rotate(5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }

        @keyframes float2 {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-10px, 15px) rotate(-5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }

        .floating-bg-1 {
          animation: float1 15s ease-in-out infinite;
        }

        .floating-bg-2 {
          animation: float2 18s ease-in-out infinite;
        }
      `}</style>

      <Box
        className="floating-bg-1"
        sx={{
          position: 'fixed',
          width: {
            xs: '200px',
            sm: '400px'
          },
          height: {
            xs: '200px',
            sm: '500px'
          },
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${gradientColors.start}, ${gradientColors.end})`,
          filter: {
            xs: 'blur(40px)',
            sm: 'blur(80px)'
          },
          bottom: {
            xs: '-40px',
            sm: '-100px'
          },
          right: {
            xs: '-40px',
            sm: '-100px'
          },
          opacity: isVisible ? 0.3 : 0,
          transition: 'opacity 0.8s ease-in-out',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />
      <Box
        className="floating-bg-2"
        sx={{
          position: 'fixed',
          width: {
            xs: '300px',
            sm: '500px'
          },
          height: {
            xs: '300px',
            sm: '500px'
          },
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${gradientColors.end}, ${gradientColors.start})`,
          filter: {
            xs: 'blur(40px)',
            sm: 'blur(80px)'
          },
          bottom: {
            xs: '-40px',
            sm: '-100px'
          },
          left: {
            xs: '-40px',
            sm: '-100px'
          },
          opacity: isVisible ? 0.3 : 0,
          transition: 'opacity 0.8s ease-in-out',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />
    </>
  )
}