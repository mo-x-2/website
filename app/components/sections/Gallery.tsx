'use client'

import AnimatedText from '../common/AnimatedText'
import Image from 'next/image'
import { Typography, Container, Box, Card, CardContent, Grid } from '@mui/material'
import GradientBackground from '../common/GradientBackground'

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
    id: 1,
    image: "/gallery/example.jpg",
    date: "2023.12",
    location: "Santa Cruz Beach Boardwalk",
    description: "With UCSC friends"
  }
]

export default function Gallery() {
  return (
    <Container id="gallery" maxWidth={false} className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8" component="section" sx={{ bg: 'var(--background)', color: 'var(--foreground)' }}>
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 1, sm: 2, md: 4, lg: 8 },
        position: 'relative',
        overflow: 'hidden',
      }}>
        <GradientBackground 
          sectionId="gallery"
          gradientColors={{
            start: '#60A5FA',  // Light blue
            end: '#3B82F6'     // Deep blue
          }}
        />

        <AnimatedText>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-center relative z-10 text-[var(--foreground)]">Gallery</h1>
        </AnimatedText>
        
        <Grid container spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }} sx={{ position: 'relative', zIndex: 1, maxWidth: 'xl' }}>
          {photos.map((photo, index) => (
            <Grid item xs={6} sm={4} md={4} key={photo.id} sx={{ 
              transform: index % 2 === 0 ? 'translateY(20px)' : 'translateY(0)'
            }}>
              <AnimatedText>
                <Card 
                  elevation={0}
                  sx={{
                    height: '100%',
                    background: theme => theme.palette.mode === 'dark' 
                      ? 'rgba(0, 0, 0, 0.2)' 
                      : 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 4,
                    border: theme => `1px solid ${
                      theme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.1)' 
                        : 'rgba(255, 255, 255, 0.2)'
                    }`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      background: theme => theme.palette.mode === 'dark'
                        ? 'rgba(0, 0, 0, 0.3)'
                        : 'rgba(255, 255, 255, 0.15)',
                      boxShadow: theme => theme.palette.mode === 'dark'
                        ? '0 20px 40px rgba(0, 0, 0, 0.3)'
                        : '0 20px 40px rgba(0, 0, 0, 0.1)',
                    }
                  }}
                >
                  <CardContent sx={{ 
                    p: { xs: 1, sm: 1.5, md: 2, lg: 3 }
                  }}>
                    <Box sx={{ mb: { xs: 0.5, sm: 1, md: 1.5, lg: 2 } }}>
                      <Image
                        src={photo.image}
                        alt={photo.description}
                        width={400}
                        height={300}
                        className="rounded-lg object-cover w-full"
                      />
                    </Box>
                    <Typography variant="body1" sx={{ 
                      fontWeight: 500,
                      mb: { xs: 0.25, sm: 0.5, md: 0.75, lg: 1 },
                      fontSize: { 
                        xs: '0.75rem',
                        sm: '0.875rem',
                        md: '1rem',
                        lg: '1.125rem'
                      },
                      color: 'var(--foreground)'
                    }}>
                      {photo.location}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      opacity: 0.7,
                      fontSize: { 
                        xs: '0.625rem',
                        sm: '0.75rem',
                        md: '0.875rem',
                        lg: '1rem'
                      },
                      color: 'var(--foreground)'
                    }}>
                      {photo.date}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      opacity: 0.7,
                      mt: { xs: 0.25, sm: 0.5, md: 0.75, lg: 1 },
                      fontSize: { 
                        xs: '0.625rem',
                        sm: '0.75rem',
                        md: '0.875rem',
                        lg: '1rem'
                      },
                      color: 'var(--foreground)'
                    }}>
                      {photo.description}
                    </Typography>
                  </CardContent>
                </Card>
              </AnimatedText>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
} 