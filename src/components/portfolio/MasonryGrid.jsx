import React, { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import MasonryVideoCard from './MasonryVideoCard'

const MasonryGrid = ({ videos }) => {
  const gridRef = useRef(null)

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    // Staggered animation for masonry cards
    gsap.fromTo('.masonry-card',
      {
        opacity: 0,
        y: 60,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: {
          amount: 1.2,
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
      className="masonry-grid columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6 lg:gap-8 space-y-4 sm:space-y-6 lg:space-y-8"
      style={{
        columnFill: 'balance'
      }}
    >
      {videos.map((video, index) => (
        <div
          key={`${video.videoId}-${index}`}
          className="break-inside-avoid mb-4 sm:mb-6 lg:mb-8"
        >
          <MasonryVideoCard
            videoId={video.videoId}
            index={index}
          />
        </div>
      ))}
    </div>
  )
}

export default MasonryGrid