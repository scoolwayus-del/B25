import React, { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import CinematicVideoCard from './CinematicVideoCard'

const CinematicGrid = ({ videos }) => {
  const gridRef = useRef(null)

  gsap.registerPlugin(ScrollTrigger)

  // Show only first 6 videos for 2 rows layout
  const displayVideos = videos.slice(0, 6)

  useGSAP(() => {
    // Staggered animation for video cards
    gsap.fromTo('.cinematic-video-card',
      {
        opacity: 0,
        y: 40,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: {
          amount: 0.8,
          from: "start"
        },
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      }
    )
  }, [videos])

  return (
    <div
      ref={gridRef}
      className="cinematic-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto"
    >
      {displayVideos.map((video, index) => (
        <CinematicVideoCard
          key={`${video.videoId}-${index}`}
          videoId={video.videoId}
          index={index}
        />
      ))}
    </div>
  )
}

export default CinematicGrid