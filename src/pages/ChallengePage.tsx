import { useEffect, useState, useRef } from "react"
import CodeEditor from "../components/CodeEditor"
import InputBox from "../components/InputBox"
import { usePyodide } from "../hooks/usePyodide"
import { runPython } from "../engine/pythonRunner"
import { challenges } from "../data/challenges"
import { OutputPanel } from "../components/OutputPanel"
import "./ChallengePage.css"

import spaceBG from "../images/starBG.jpg"

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

export default function ChallengePage({
  setXp,
  completed,
  setCompleted,
  updateStreak
}: ChallengePageProps) {
  const { pyodide, loading } = usePyodide()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [userCode, setUserCode] = useState<Record<number, string>>({})
  const [userInput, setUserInput] = useState<Record<number, string>>({})
  const [output, setOutput] = useState("")
  const [showExplanation, setShowExplanation] = useState(false)
  const [showMap, setShowMap] = useState(false) // update 1.1
  const [showTutorial, setShowTutorial] = useState(false) // update 1.1
  const tutorialRef = useRef<HTMLDivElement>(null) // update 1.1


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
    if (!pyodide) return

    triggerBlackFlash()

    const rawResult = await runPython(pyodide, code, input)
    const userOut = normalize(rawResult)

    const rawExpected =
      typeof currentChallenge.expectedOutput === "function"
        ? currentChallenge.expectedOutput(input)
        : currentChallenge.expectedOutput

    const expected = normalize(rawExpected)

    if (userOut.startsWith("❌")) {
      setOutput(userOut)
      setShowExplanation(false)
      return
    }

    if (userOut === expected) {
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

      setOutput("Correct output!")
      setShowExplanation(true)
    } else {
      setOutput(
        `❌ Wrong output\n\nYour output:\n${userOut}\n\nExpected:\n${expected}`
      )
      setShowExplanation(false)
    }
  }

  if (loading) return <div>Loading Python engine…</div>

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
      
            <div className="challenge-map">
              {challenges.map((challenge, index) => {
                const isCompleted = completed.has(challenge.id)
                const isCurrent = currentIndex === index
                const isUnlocked = index === 0 || completed.has(challenges[index - 1].id) || isCompleted
      
                return (
                  <div 
                    key={challenge.id} 
                    className={`map-node-row ${index % 2 === 0 ? "left" : "right"}`}
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
                        setCurrentIndex(index)
                        setOutput("")
                        setShowExplanation(false)
                        setShowMap(false)
                      }}
                      aria-label={`Challenge ${index + 1}: ${challenge.title}`}
                    >
                      <span className="map-node-number">{index + 1}</span>
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
            }}
          >
            Next →
          </button>
        )}
 
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
            <h3 className="youtube-video-title">Video Tutorial</h3>
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
    </div>
  )
}