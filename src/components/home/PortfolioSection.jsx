import React, { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { Link } from 'react-router-dom'
import CinematicGrid from '../portfolio/CinematicGrid'

// 🔹 Video data updated with provided links (rest remain same)
const teasers = [
  { videoId: 'QGsa5QB5gK4' }, // 1
  { videoId: '5fR4MErzYeI' }, // 2
  { videoId: '2qFnRXpSFn8' }, // 3
  { videoId: '7bZ5MKY6pfU' }, // 4
  { videoId: 'QstSPHan4oE' }, // 5
  { videoId: 'HMJyD-kPWek' }, // 6
  { videoId: 'zd5De3LAMQc' }, // 7
  { videoId: 'HMJyD-kPWek' }, // 8 (duplicate from your list)
  { videoId: 'YM1TZnbcbOs' }, // 9
  { videoId: 'pRya97qUJMs' }, // 10
  { videoId: 'AqqGxOrwv_g' }  // 11
]

const highlights = [
  { videoId: '2qFnRXpSFn8' }, // 12
  { videoId: 'dRjCKw7YonM' }, // 13 (short link)
  { videoId: 'L9PMwOelcRk' }, // 14 (short link)
  { videoId: 'qeMFqkcPYcg' }, // unchanged
  { videoId: 'SQoA_wjmE9w' },
  { videoId: 'ZbZSe6N_BXs' },
  { videoId: 'HEXWRTEbj1I' },
  { videoId: 'U9t-slLl69E' },
  { videoId: 'iik25wqIuFo' },
  { videoId: 'C0DPdy98e4c' },
  { videoId: 'YQHsXMglC9A' },
  { videoId: 'AdUw5RdyZxI' },
  { videoId: 'hTWKbfoikeg' },
  { videoId: 'NUYvbT6vTPs' },
  { videoId: 'RgKAFK5djSk' },
  { videoId: 'uelHwf8o7_U' },
  { videoId: 'EhxJLojIE_o' },
  { videoId: 'KQ6zr6kCPj8' },
  { videoId: 'MtN1YnoL46Q' },
  { videoId: 'sOnqjkJTMaA' }
]

const PortfolioSection = () => {
  const sectionRef = useRef(null)
  const allVideos = [...teasers, ...highlights]

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    // Animate section title
    gsap.fromTo('.portfolio-title',
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.portfolio-title',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    )

    // Animate description
    gsap.fromTo('.portfolio-description',
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: '.portfolio-description',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    )
  }, [])

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="min-h-screen section-dark-alt text-white relative depth-3 section-transition"
    >
      <div className="cinematic-overlay"></div>
      
      {/* Top fade gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 sm:h-40 lg:h-48 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none z-10"></div>
      
      <div className="container mx-auto section-padding">
        <div className="text-center component-margin space-y-4 sm:space-y-6 lg:space-y-8">
          <h2 className="portfolio-title font-[font2] heading-responsive-xl uppercase mb-4 sm:mb-6 lg:mb-8 leading-tight text-layer-3 text-glow">
            Our Portfolio
          </h2>
          <div className="portfolio-description floating-panel-dark max-width-content">
            <p className="font-[font1] text-responsive leading-relaxed text-layer-2">
              Découvrez notre collection de films de mariage cinématographiques
            </p>
          </div>
        </div>

        {/* Cinematic Video Grid - 2 Rows Only */}
        <div className="portfolio-showcase relative py-8 sm:py-12 lg:py-16">
          <CinematicGrid videos={allVideos} />
        </div>

        {/* Portfolio Button */}
        <div className="text-center component-margin relative z-20">
          <Link 
            to="/projects"
            className="btn-pill btn-primary h-12 sm:h-16 lg:h-20 px-8 sm:px-12 lg:px-16 inline-flex items-center justify-center group"
          >
            <span className="font-[font2] text-base sm:text-xl lg:text-2xl">
              View Our Portfolio
            </span>
          </Link>
        </div>
      </div>
      
      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 lg:h-48 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none z-10"></div>
    </section>
  )
}

export default PortfolioSection
