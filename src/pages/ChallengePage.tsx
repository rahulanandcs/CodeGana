import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import CodeEditor from "../components/CodeEditor"
import InputBox from "../components/InputBox"
import { usePyodide } from "../hooks/usePyodide"
// import { runPython } from "../engine/pythonRunner"
import { trackEvent } from '../lib/analytics'

import { challenges } from "../data/challenges"
import { OutputPanel } from "../components/OutputPanel"
import HintDisplay from '../components/CharacterCreator/HintDisplay'
import "./ChallengePage.css"

import spaceBG from "../images/starBG.jpg"
import elephantLeft from '../images/CGhint_facingLeft!.png'
import LoadingSpinner from "../components/LoadingSpinner"

type ChallengePageProps = {
  xp: number
  setXp: React.Dispatch<React.SetStateAction<number>>
  streak: number
  setStreak: React.Dispatch<React.SetStateAction<number>>
  lastCompletedDate: string
  setLastCompletedDate: React.Dispatch<React.SetStateAction<string>>
  completed: Set<number>
  setCompleted: React.Dispatch<React.SetStateAction<Set<number>>>
  updateStreak: (todayDate?: string) => void
}

// Helper function to detect universal beginner mistakes in Python code & output
function getUniversalMascotHint(code: string, userOut: string, expected: string): string | null {
  if (userOut.includes("TimeoutError")) {
    return "Your code got stuck and took too long to run! Did you accidentally create an infinite loop? Check your 'while' or 'for' loops!";
  }
  
  // 1. Semicolon Check
  if (code.includes(";")) {
    return "In Python, you don't need semicolons (;) at the end of your lines! Try removing them.";
  }

  // 2. Forgotten print() check
  if (userOut === "") {
    return "Your program didn't print anything! Did you forget to use print(...) to output your answer?";
  }

  // 3. Case Sensitivity Check (e.g., 'hello world' vs 'Hello World')
  if (userOut.toLowerCase() === expected.toLowerCase() && userOut !== expected) {
    return "Watch your capitalization! Your text matches, but check your Upper and Lower case letters (e.g., 'Hello World' instead of 'hello world').";
  }

  // 4. Extra Quotes Printed Check (e.g., printing "'Hello World'" instead of "Hello World")
  if (userOut === `'${expected}'` || userOut === `"${expected}"`) {
    return "Don't print quotes around your text! print('Hello World') already outputs Hello World without quotes.";
  }

  // 5. Whitespace / Spacing Check
  if (userOut.replace(/\s+/g, "") === expected.replace(/\s+/g, "")) {
    return "You are super close! Double-check your spaces and newlines—your output has extra or missing spaces.";
  }

  return null; // Fall back to challenge-specific test case hint
}

export default function ChallengePage({
  setXp,
  completed,
  setCompleted,
  updateStreak
}: ChallengePageProps) {
  const { runPython, loading } = usePyodide()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [userCode, setUserCode] = useState<Record<number, string>>({})
  const [userInput, setUserInput] = useState<Record<number, string>>({})
  const [output, setOutput] = useState("")
  const [showExplanation, setShowExplanation] = useState(false)

  const [mapFilter, setMapFilter] = useState<string>("all")

  // NEW: State to track if the mascot should appear and what it should say
  const [mascotHint, setMascotHint] = useState<string | null>(null)

  const [showMap, setShowMap] = useState(false) // update 1.1
  const [showTutorial, setShowTutorial] = useState(false) // update 1.1
  const tutorialRef = useRef<HTMLDivElement>(null) // update 1.1

  const pageBottomAnchorRef = useRef<HTMLDivElement>(null)

  const runButtonRef = useRef<HTMLButtonElement>(null)
  const lightningRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])


  const currentChallenge = challenges[currentIndex]
  const progress = Math.round((completed.size / challenges.length) * 100)

  const code = userCode[currentChallenge.id] ?? ""
  const input = userInput[currentChallenge.id] ?? ""

  function normalize(text: string) {
    return text.trim().replace(/\r\n/g, "\n")
  }

  function triggerBlackFlash() {
    if (runButtonRef.current) {
      runButtonRef.current.classList.add('flash-active')
      setTimeout(() => {
        runButtonRef.current?.classList.remove('flash-active')
      }, 400)
    }

    // Trigger all lightning bolts
    lightningRefs.current.forEach((ref) => {
      if (ref) {
        ref.classList.add('lightning-active')
        setTimeout(() => {
          ref?.classList.remove('lightning-active')
        }, 500)
      }
    })
  }
  
  // track stuff
  trackEvent('Challenge_Completed', { challengeId: currentChallenge.id })

  function showMascotHint(nextHint: string | null) {
    setMascotHint(null)

    if (!nextHint) return

    window.setTimeout(() => {
      setMascotHint(nextHint)
    }, 120)
  }

function scrollToChallengeEnd() {
  setTimeout(() => {
    if (!pageBottomAnchorRef.current) return;

    const startY = window.scrollY;
    
    // Calculate position of the anchor tag minus viewport height to place it nicely near the bottom
    const anchorTop = pageBottomAnchorRef.current.getBoundingClientRect().top + startY;
    
    // Offset by 120px so the scroll stops smoothly above the Trust & Safety footer
    const targetY = Math.max(0, anchorTop - window.innerHeight + 120);
    const distance = targetY - startY;

    // 800ms duration provides a smooth, non-jarring ease
    const duration = 800; 
    let startTime: number | null = null;

    // Ease-Out Quartic for a sleek, gentle deceleration
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const step = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const easeProgress = easeOutQuart(progress);

      window.scrollTo(0, startY + distance * easeProgress);

      if (timeElapsed < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, 100);
}

  // update 1.1 ----------
  function handleTutorialToggle() {
    setShowTutorial(prev => {
      const newState = !prev
      
      // If opening tutorial, scroll to it after animation starts
      if (newState) {
        setTimeout(() => {
          tutorialRef.current?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
          })
        }, 400)
      }
      
      return newState
    })
  }
  // ---------- update 1.1

  async function handleRun() {
    if (loading) return 

    triggerBlackFlash()
    scrollToChallengeEnd()
    setMascotHint(null)

    let allPassed = true
    let outputLog = ""
    let userOut = ""
    let expected = ""

    for (let i = 0; i < currentChallenge.testCases.length; i++) {
      const testCase = currentChallenge.testCases[i]
      const testInput = i === 0 && !testCase.isHidden ? input : testCase.input

      // 3. runPython no longer needs the pyodide object passed in
      const rawResult = await runPython(code, testInput) 
      userOut = normalize(rawResult)

      const rawExpected = typeof testCase.expectedOutput === "function"
          ? testCase.expectedOutput(testInput)
          : testCase.expectedOutput
      expected = normalize(rawExpected)

      if (userOut.startsWith("❌")) {
        setOutput(`Execution Error:\n${userOut}`)

        const universalHint = getUniversalMascotHint(code, userOut, expected)
        showMascotHint(universalHint || "Oops! Your code threw an error before it could finish. Check your spelling and syntax!")
        setShowExplanation(false)
        allPassed = false
        break
      }

      if (userOut === expected) {
        outputLog += `Passed${testCase.isHidden ? " (Hidden)" : ""}\n`
      } if (userOut !== expected) {
        outputLog += `❌ Failed${testCase.isHidden ? " (Hidden)" : ""}\n\n`
        
        if (!testCase.isHidden) {
          const hasInput = testInput.trim() !== ""

          if (hasInput) {
            outputLog += `Input:\n${testInput}\n\nYour Output:\n${userOut}\n\nExpected:\n${expected}`
          } else {
            outputLog += `Your Output:\n${userOut}\n\nExpected:\n${expected}`
          }
        } else {
          outputLog += `Your code failed on a hidden edge case. Read the elephant's hint below!`
        }
        
        setOutput(outputLog)

        // 1. First check for universal syntax/formatting mistakes
        const universalHint = getUniversalMascotHint(code, userOut, expected)
        
        // 2. Set the mascot hint (universal hint takes priority over testCase.hint)
        showMascotHint(universalHint || testCase.hint)
        
        setShowExplanation(false)
        allPassed = false
        break
      }
    }

    if (allPassed) {
      const isFirstCompletion = !completed.has(currentChallenge.id)

      if (isFirstCompletion) {
        // Increment XP with animation
        setXp(prev => {
          return prev + 10
        })

        // Mark challenge as completed and update streak
        setCompleted(prev => {
          const next = new Set(prev)
          next.add(currentChallenge.id)
          updateStreak()
          return next
        })
      }

      setOutput(outputLog + "\nAll test cases passed! Great job!")
      setShowExplanation(true)
    }
  }

  if (loading) return <LoadingSpinner message="Booting Python Engine..." />

  return (
    <div className="challenge-page">
      <div className="challenge-header">
        <div className="challenge-toppy">
          <h1>{currentChallenge.title}</h1>
          {/* update 1.1 ---------- */}
          <button 
            className="map-button" 
            onClick={() => setShowMap(true)}
            aria-label="Open Challenge Map"
          >
            <span className="map-globe-icon" aria-hidden="true"></span>
            Map
          </button>
          {/* ---------- update 1.1 */}
        </div>
        <p>{currentChallenge.prompt}</p>

        <div className="progress-bar">
          <div className="progress-bar-inner" style={{width:`${progress}%`}}/>
        </div>
        <p>Progress: {completed.size} / {challenges.length}</p>
      </div>

      <div className="workspace-top">
        <div className="code-editor-container">
          <CodeEditor
            value={code}
            onChange={val => setUserCode(prev => ({ ...prev, [currentChallenge.id]: val }))}
          />
        </div>

        <div className="editor-side-panel">
          <div className="input-box-container">
            <h2>Program Input</h2>
            <InputBox
              value={input}
              onChange={val => setUserInput(prev => ({ ...prev, [currentChallenge.id]: val }))}
            />
          </div>

          <button
            ref={runButtonRef}
            className="run-button"
            onClick={handleRun}
          >
            ▶ Run Code
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                ref={el => { lightningRefs.current[i] = el }}
                className={`lightning-bolt lightning-bolt-${i}`}
              ></div>
            ))}
          </button>
        </div>
      </div>

       {/* NEW: Mascot Feedback UI positioned above the output panel */}
      {mascotHint && (
        <div className="mascot-feedback-container">
          <img 
            src={elephantLeft} 
            alt="CodeGana Hint Mascot" 
            className="mascot-image" 
          />
          <div className="mascot-speech-bubble">
            <p>{mascotHint}</p>
          </div>
        </div>
      )}

      <div className="output-panel-container">
        <h2>Program Output</h2>
        <OutputPanel output={output} />
      </div>

      {showExplanation && <div className="explanation-panel"><strong>Explanation:</strong> {currentChallenge.explanation}</div>}

      {/* update 1.1 ---------- */} {showMap && (
        <div className="map-overlay">
          <div 
            className="map-overlay-backdrop" 
            onClick={() => setShowMap(false)}
            aria-label="Close map"
            style={{ backgroundImage: `url(${spaceBG})` }}
          />
      
          <div className="map-sheet">
            <div className="map-topbar">
              <h2>Challenge Map</h2>
              <button 
                className="map-close-button" 
                onClick={() => setShowMap(false)}
                aria-label="Close map"
              >
                ✕
              </button>
            </div>

            {/* NEW: Map Filter Buttons */}
            <div className="map-filter-container">
              {['all', 'easy', 'medium', 'hard'].map((level) => (
                <button
                  key={level}
                  className={`map-filter-btn ${mapFilter === level ? 'active' : ''}`}
                  onClick={() => setMapFilter(level)}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
      
            <div className="challenge-map">
              {challenges
                .filter(challenge => mapFilter === 'all' || challenge.difficulty === mapFilter)
                .map((challenge, mappedIndex) => {
                
                // Track original index so progression/unlock logic remains intact
                const originalIndex = challenges.findIndex(c => c.id === challenge.id)
                const isCompleted = completed.has(challenge.id)
                const isCurrent = currentIndex === originalIndex
                const isUnlocked = originalIndex === 0 || completed.has(challenges[originalIndex - 1].id) || isCompleted
      
                return (
                  <div 
                    key={challenge.id} 
                    className={`map-node-row ${mappedIndex % 2 === 0 ? "left" : "right"}`}
                  >
                    <button
                      className={`map-node ${
                        isCompleted ? "completed" : ""
                      } ${
                        isCurrent ? "current" : ""
                      } ${
                        !isUnlocked ? "locked" : ""
                      }`}
                      disabled={!isUnlocked}
                      onClick={() => {
                        setCurrentIndex(originalIndex)
                        setOutput("")
                        setShowExplanation(false)
                        setShowMap(false)
                        setMascotHint(null) // Reset mascot on challenge change
                      }}
                      aria-label={`Challenge ${originalIndex + 1}: ${challenge.title}`}
                    >
                      <span className="map-node-number">{originalIndex + 1}</span>
                    </button>
      
                    <div className="map-node-label">
                      <strong>{challenge.title}</strong>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )} {/* ---------- update 1.1 */}
      {/* UPDATED: Nav buttons with Tutorial button */}
      <div className={`nav-buttons ${showTutorial ? 'tutorial-active' : ''}`}>
        {currentIndex > 0 && (
          <button 
            className="prev-btn" 
            onClick={() => {
              setCurrentIndex(currentIndex - 1)
              setOutput("")
              setShowExplanation(false)
            }}
          >
            ← Previous
          </button>
        )}
        
        {currentIndex < challenges.length - 1 && (
          <button 
            className="next-btn" 
            onClick={() => {
              setCurrentIndex(currentIndex + 1)
              setOutput("")
              setShowExplanation(false)
              setMascotHint(null)
            }}
          >
            Next →
          </button>
        )}
         <HintDisplay challenge={currentChallenge} />
        {/* NEW: Tutorial Button */}
        <button
          className={`tutorial-button ${showTutorial ? 'active' : ''}`}
          onClick={handleTutorialToggle}
          aria-label={showTutorial ? 'Hide tutorial video' : 'Show tutorial video'}
          aria-expanded={showTutorial}
        >
          <span className="yt-play-icon" aria-hidden="true"></span>
          Tutorial
        </button>
      </div>
 
      {/* NEW: YouTube Video Container */}
      <div 
        ref={tutorialRef}
        className={`youtube-video-container ${showTutorial ? 'expanded' : ''}`}
        aria-hidden={!showTutorial}
      >
        <div className="youtube-video-wrapper">
          <div className="youtube-video-header">
            <h3 className="youtube-video-title">{currentChallenge.videoTitle}</h3>
            <button
              className="youtube-video-close"
              onClick={() => setShowTutorial(false)}
              aria-label="Close tutorial video"
            >
              Close
            </button>
          </div>
          
          <div className="youtube-embed-wrapper">
            {showTutorial && (
              <iframe
                src={`https://www.youtube.com/embed/${currentChallenge.videoId || 'dQw4w9WgXcQ'}?rel=0&modestbranding=1&controls=1&showinfo=0&fs=1&iv_load_policy=3&disablekb=0&cc_load_policy=0&playsinline=1`}
                title={`Tutorial for ${currentChallenge.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </div>
      <div ref={pageBottomAnchorRef} style={{ height: "1px", paddingBottom: "0rem" }} />
        <footer className="universal-footer">
        <span className="footer-label">Trust & Safety</span>
        <div className="footer-links">
          <Link to="/privacy" className="footer-privacy-btn">
            Privacy Policy (COPPA)
          </Link>
          <Link to="/terms" className="footer-privacy-btn">
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  )
}