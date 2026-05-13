import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./IndexPage.css"

import blackDownDrip from "../images/blackDownDrip.png"
import blackSkyBG from "../images/blackSkyBG.jpg"
import CODE from "../images/CODE.png"
import trueDrip from "../images/trueDrip.png"
import upGrafittiNew from "../images/upGrafittiNew.png"

export default function IndexPage() {
  const navigate = useNavigate()
  const [scrollY, setScrollY] = useState(0)
  const [hasPlayedYoutube, setHasPlayedYoutube] = useState(false)
  const [hasPlayedInstagram, setHasPlayedInstagram] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  
  const youtubeRef = useRef<HTMLDivElement>(null)
  const instagramRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const bentoGridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === youtubeRef.current && !hasPlayedYoutube) {
              setHasPlayedYoutube(true)
            }
            if (entry.target === instagramRef.current && !hasPlayedInstagram) {
              setHasPlayedInstagram(true)
            }
          }
        })
      },
      { threshold: 0.5 }
    )

    if (youtubeRef.current) observerRef.current.observe(youtubeRef.current)
    if (instagramRef.current) observerRef.current.observe(instagramRef.current)

    return () => observerRef.current?.disconnect()
  }, [hasPlayedYoutube, hasPlayedInstagram])

  // Mouse spotlight logic with smooth exit
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (bentoGridRef.current) {
      const rect = bentoGridRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      setMousePos({ x, y })
      // Make spotlight visible
      e.currentTarget.style.setProperty('--spotlight-opacity', '1')
      e.currentTarget.style.setProperty('--mouse-x', `${x}px`)
      e.currentTarget.style.setProperty('--mouse-y', `${y}px`)
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    // Fade out spotlight
    e.currentTarget.style.setProperty('--spotlight-opacity', '0')
  }

  const phoneRef = useRef<HTMLDivElement>(null);
const [isPhoneVisible, setIsPhoneVisible] = useState(false);

// Intersection Observer for the "Appear" trigger
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      // Only trigger once to keep it simple
      if (entry.isIntersecting) setIsPhoneVisible(true);
    },
    { threshold: 0.1 }
  );

  if (phoneRef.current) observer.observe(phoneRef.current);
  return () => observer.disconnect();
}, []);

useEffect(() => {
  const handlePhoneScroll = () => {
    if (!phoneRef.current || !isPhoneVisible) return;

    const rect = phoneRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // viewPoint: 0 when phone enters bottom, 1 when phone is 50% into view
    // By multiplying by 2, we reach 100% opacity when the phone is halfway up
    const rawProgress = (windowHeight - rect.top) / windowHeight;
    const entranceOpacity = Math.min(Math.max(0, rawProgress * 2), 1);
    
    // Exit Logic: If the phone's top is past 75% of the screen height, 
    // we can ensure it stays at 1 or handle a fade out if desired.
    // For "solid after half view", we simply use entranceOpacity.
    
    // 1. Tilt: Starts at 20deg, levels out to 0deg as it centers
    const tilt = 20 - (Math.min(rawProgress, 0.5) * 40);
    
    // 2. Lift: Subtle slide up
    const lift = 50 - (entranceOpacity * 50);

    phoneRef.current.style.opacity = `${entranceOpacity}`;
    phoneRef.current.style.transform = `perspective(1000px) rotateX(${tilt}deg) translateY(${lift}px)`;
  };

  window.addEventListener("scroll", handlePhoneScroll);
  handlePhoneScroll();
  
  return () => window.removeEventListener("scroll", handlePhoneScroll);
}, [isPhoneVisible]);
  

const titleRef = useRef<HTMLDivElement>(null);
const [isTitleVisible, setIsTitleVisible] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      // Trigger when the element enters the bottom 25% of the screen
      if (entry.isIntersecting) {
        setIsTitleVisible(true);
      }
    },
    { 
      // rootMargin '0px 0px -25% 0px' targets the top of the bottom fourth
      rootMargin: '0px 0px -25% 0px',
      threshold: 0 
    }
  );

  if (titleRef.current) observer.observe(titleRef.current);
  return () => observer.disconnect();
}, []);

// --------------------------- HTML -----------------------------
  return (
    <div className="index-page">
                                          {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-glow" 
          style={{ transform: `scale(${1 + scrollY * 0.0005}) rotate(${scrollY * 0.03}deg)` }} 
        />
        
        <div className="lightning bolt-1" 
          style={{ opacity: Math.max(0, 1 - scrollY * 0.002) }}
        />
        <div className="lightning bolt-2" 
          style={{ opacity: Math.max(0, 1 - scrollY * 0.002) }}
        />
        
        <div className="splatter splatter-1" />
        <div className="splatter splatter-2" />
        <div className="splatter splatter-3" />

        <div className="hero-mascot" 
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
          <img src={CODE} alt="CodeGana Mascot" />
        </div>

        <div className="hero-brush-text">
          <h1 className="brush-stroke-title">CodeGana</h1>
        </div>

        <div className="hero-bottom">
          <div className="hero-tagline">
            <p>Master Your <span className="highlight-text">Coding Path</span></p>
          </div>
          
          <div className="hero-stats">
            <div className="stat-badge">
              <span className="stat-number">12+</span>
              <span className="stat-label">Challenges</span>
            </div>
            <div className="stat-badge">
              <span className="stat-number">∞</span>
              <span className="stat-label">XP Rewards</span>
            </div>
          </div>

          <button className="hero-cta" onClick={() => navigate("/challenges")}>
            <span>Begin Your Journey</span>
            <div className="cta-glow" />
          </button>
        </div>

      </section>

      <img decoding="async" width="100%" height="206" src={trueDrip} className="drippy" alt="Divider | Image" sizes="(max-width: 1024px) 100vw, 1024px"></img>
      


                            {/* ------------------ Grid Info Section ------------------- */}
      <section className="bento-info-section">
        <div 
          ref={titleRef} 
          className={`section-title ${isTitleVisible ? 'reveal-active' : ''}`}
        >
          <div className="reveal-container">
            <h2>What We Offer</h2>
            <div className="reveal-block"></div>
          </div>
        </div>

        <div 
          className="bento-wrapper"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            '--mouse-x': `${mousePos.x}px`,
            '--mouse-y': `${mousePos.y}px`,
            '--spotlight-opacity': '0'
          } as React.CSSProperties}
        >
                                {/* ------------------THE BASE GRID------------------ */}
          <div ref={bentoGridRef} className="bento-info-grid base-layer">
            <div className="bento-box box-lottie">
              <div className="box-content-wrapper">
                <div className="iframe-pointer-shield" />
                <iframe src="https://lottie.host/embed/d73e4b26-3600-4cba-8f54-848cff87864d/lUx8VfQIws.lottie"></iframe>
                <div className="box-text">
                  <h3>Interactive Learning</h3>
                  <p>CodeGana is an active learning platform that replaces passive video tutorials with a engaging, challenges that requires executing live code to progress. This feedback loop eliminates "tutorial limbo" and high cortisol by letting students build real muscle memory needed for future real world software development.</p>
                </div>
              </div>
            </div>

            <div className="bento-box box-challenges" style={{ transform: `translateY(${Math.max(0, 80 - scrollY * 0.2)}px)`, opacity: Math.min(1, scrollY / 300) }}>
              <div className="css-lightning-icon"><div className="lightning-strike"><div className="bolt" /></div></div>
              <h3>Monthly Puzzles</h3>
              <p>Fresh problems monthly</p>
              <span className="box-stat">12+ Challenges</span>
            </div>

            <div className="bento-box box-xp" style={{ transform: `translateY(${Math.max(0, 80 - scrollY * 0.2)}px)`, opacity: Math.min(1, scrollY / 300) }}>
              <div className="css-star-icon"><div className="star-animation"><div className="star-point" /><div className="star-point" /><div className="star-point" /><div className="star-point" /><div className="star-center" /></div></div>
              <h3>Level Up</h3>
              <p>Earn XP with every win</p>
              <span className="box-stat">∞ XP</span>
            </div>

            <div className="bento-box box-languages">
              <h3>Learn Your Favorite Languages</h3>
              <div className="languages-grid">
                <div className="language-card active"><div className="lang-icon python">{'<>'}</div><div className="lang-details"><h4>Python</h4><span className="status available">Available Now</span></div></div>
                <div className="language-card"><div className="lang-icon java">{'{;}'}</div><div className="lang-details"><h4>Java</h4><span className="status soon">Coming Soon</span></div></div>
                <div className="language-card"><div className="lang-icon html">{'</>'}</div><div className="lang-details"><h4>HTML</h4><span className="status soon">Coming Soon</span></div></div>
                <div className="language-card"><div className="lang-icon css">{'{/}'}</div><div className="lang-details"><h4>CSS</h4><span className="status soon">Coming Soon</span></div></div>
              </div>
            </div>
          </div>

                              {/* --------------------- REVEAL GRID -------------------- */}
          <div className="bento-info-grid reveal-layer" aria-hidden="true">
            <div className="bento-box reveal-orange">
              <div className="box-content-wrapper">
                <div className="iframe-pointer-shield" />
                <iframe src="https://lottie.host/embed/4d17d3f1-0071-47bb-aa89-789d60d87b5c/6ZbOt9t8Rx.lottie"></iframe> 
                <div className="box-text">
                  <h3>Interactive Learning</h3>
                  <p>CodeGana is an active learning platform that replaces passive video tutorials with a engaging, challenges that requires executing live code to progress. This feedback loop eliminates "tutorial limbo" and high cortisol by letting students build real muscle memory needed for future real world software development.</p>
                </div>
              </div>
            </div>

            <div className="bento-box reveal-blue">
              <div className="css-lightning-icon"><div className="lightning-strike"><div className="bolt" /></div></div>
              <h3>Monthly Puzzles</h3>
              <p>Fresh problems monthly</p>
              <span className="box-stat">12+ Challenges</span>
            </div>

            <div className="bento-box reveal-gold">
              <div className="css-star-icon"><div className="star-animation"><div className="star-point" /><div className="star-point" /><div className="star-point" /><div className="star-point" /><div className="star-center" /></div></div>
              <h3>Level Up</h3>
              <p>Earn XP with every win</p>
              <span className="box-stat">∞ XP</span>
            </div>

            <div className="bento-box reveal-cream">
              <h3>Learn Your Favorite Languages</h3>
              <div className="languages-grid">
                <div className="language-card active"><div className="lang-icon python">{'<>'}</div><div className="lang-details"><h4>Python</h4><span className="status available">Available Now</span></div></div>
                <div className="language-card"><div className="lang-icon java">{'{;}'}</div><div className="lang-details"><h4>Java</h4><span className="status soon">Coming Soon</span></div></div>
                <div className="language-card"><div className="lang-icon html">{'</>'}</div><div className="lang-details"><h4>HTML</h4><span className="status soon">Coming Soon</span></div></div>
                <div className="language-card"><div className="lang-icon css">{'{/}'}</div><div className="lang-details"><h4>CSS</h4><span className="status soon">Coming Soon</span></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <img decoding="async" width="100%" height="206" src={upGrafittiNew} className="drippy2" alt="Divider | Image" sizes="(max-width: 1024px) 100vw, 1024px"></img>
      

      
                        {/* -------------------- Code Dojo Section ----------------- */}
      <section className="code-dojo-section">
        <div className="dojo-container">
          <div 
            className="dojo-terminal"
            style={{ 
              transform: `perspective(1200px) rotateY(${(scrollY - 1900) * 0.03}deg)`,
              opacity: Math.min(1, (scrollY - 600) / 400)
            }}
          >
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <span className="terminal-title">challenge.py</span>
            </div>
            <div className="terminal-body">
              <pre>{`def conquer_challenge():
                    """
                    Learn like a student,
                    Code like a master
                    """
                    focus = True
                    persistence = 100
                    
                    while focus and persistence > 0:
                        skill = practice()
                        xp += calculate_rewards(skill)
                        
                    return ascend()`}</pre>
            </div>
          </div>
        </div>
      </section>
      


                            {/* --------------- Social Media Section ------------------ */}
      <section className="index-footer" style={{ backgroundImage: `url(${blackSkyBG})` }}>
        <img decoding="async" width="100%" height="206" src={blackDownDrip} id="blackDrip" className="" alt="Divider | Image" sizes="(max-width: 1024px) 100vw, 1024px"></img>
        <div 
          ref={phoneRef} 
          className="samsung"
          style={{ transition: 'transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)' }}
        >
          <div className="screen">

            <div className="footer-container">
              <div className="footer-brand">
                <h2 className="footer-logo">CodeGana</h2>
                <p>Trust the process… then debug the process.</p>
              </div>

              <div className="social-modules">
                <a 
                  href="https://youtube.com/@codegana" 
                  target="_blank" 
                  className="social-module yt-module"
                >
                  <div className="yt-animation-container">
                    <div className="yt-shield" />
                    <div className="yt-play-btn">
                      <div className="yt-triangle" />
                    </div>
                    <div className="yt-scan-line" />
                  </div>
                  <span className="module-label">YouTube</span>
                </a>

                <a 
                href="https://instagram.com/codegana" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-module instagram-link"
                id="ig"
              >
                <div className="footer-icon-wrapper">
                  <div className="ig-gradient-bg"></div>
                  <div className="ig-camera-icon"></div>
                </div>
                <span className="module-label i">Instagram</span>
              </a>
              </div>

              <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} CodeGana</p>
              </div>
            </div>
          </div>
        </div>
    </section>
</div>
  )
}