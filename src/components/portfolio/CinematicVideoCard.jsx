import React, { useState, useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const CinematicVideoCard = ({ videoId, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const iframeRef = useRef(null)
  
  // Intersection observer for lazy loading
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px'
  })

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // YouTube thumbnail URLs
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  const fallbackThumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

  useEffect(() => {
    if (inView && !thumbnailLoaded) {
      // Preload thumbnail
      const img = new Image()
      img.onload = () => setThumbnailLoaded(true)
      img.onerror = () => {
        // Try fallback thumbnail
        const fallbackImg = new Image()
        fallbackImg.onload = () => setThumbnailLoaded(true)
        fallbackImg.src = fallbackThumbnailUrl
      }
      img.src = thumbnailUrl
    }
  }, [inView, thumbnailLoaded, thumbnailUrl, fallbackThumbnailUrl])

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true)
      if (!isLoaded && inView) {
        setIsLoaded(true)
      }
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false)
    }
  }

  const handleClick = () => {
    if (isMobile && !isLoaded) {
      setIsLoaded(true)
    }
  }

  return (
    <div
      ref={ref}
      className={`cinematic-video-card group relative aspect-video video-glass gpu-accelerated transition-all duration-500 ease-out overflow-hidden ${
        isHovered ? 'scale-105 shadow-2xl shadow-black/50' : 'scale-100'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        animationDelay: `${index * 100}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
      }}
    >
      {/* Thumbnail/Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
          {thumbnailLoaded ? (
            <img
              src={thumbnailUrl}
              alt={`Video thumbnail ${index + 1}`}
              className="w-full h-full object-cover transition-opacity duration-300"
              onError={(e) => {
                e.target.src = fallbackThumbnailUrl
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="loading-responsive border-[#D3FD50] border-t-transparent rounded-full animate-spin glow-accent"></div>
            </div>
          )}
          
          {/* Custom play button overlay */}
          <div className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-all duration-500 ${
            isHovered && !isMobile ? 'opacity-0' : 'opacity-100'
          }`}>
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white group-hover:shadow-lg group-hover:shadow-white/20">
              <div className="w-0 h-0 border-l-[12px] sm:border-l-[16px] lg:border-l-[20px] border-l-black border-y-[8px] sm:border-y-[10px] lg:border-y-[12px] border-y-transparent ml-1"></div>
            </div>
          </div>
        </div>
      )}

      {/* YouTube iframe - loads on hover (desktop) or click (mobile) */}
      {isLoaded && (
        <iframe
          ref={iframeRef}
          className="absolute top-0 left-0 w-full h-full rounded-lg sm:rounded-xl transition-opacity duration-500"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${isHovered && !isMobile ? 1 : 0}&mute=1&loop=1&playlist=${videoId}&controls=1&modestbranding=1&rel=0&showinfo=0&enablejsapi=1`}
          title={`Portfolio Video ${index + 1}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          style={{
            opacity: (isHovered && !isMobile) || (isMobile && isLoaded) ? 1 : 0.8
          }}
        />
      )}

      {/* Hover overlay with subtle gradient */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent transition-opacity duration-500 pointer-events-none rounded-lg sm:rounded-xl ${
        isHovered && !isMobile ? 'opacity-100' : 'opacity-0'
      }`} />

      {/* Glow effect on hover */}
      <div className={`absolute inset-0 rounded-lg sm:rounded-xl transition-all duration-500 pointer-events-none ${
        isHovered ? 'shadow-[0_0_40px_rgba(211,253,80,0.4)]' : ''
      }`} />
    </div>
  )
}

export default CinematicVideoCard