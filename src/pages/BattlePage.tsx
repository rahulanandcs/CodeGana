import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from "react-router-dom"
import { useBattleSocket } from '../hooks/useBattleSocket'
import { usePyodide } from '../hooks/usePyodide'
import { useAvatar } from '../context/AvatarContext'
import { basicArenaChallenges, intermediateArenaChallenges } from '../data/arenaChallenges'
import CodeEditor from '../components/CodeEditor'
import AvatarImage from '../components/CharacterCreator/AvatarImage'
import './BattlePage.css'
import enemyPFP from "../images/enemyPFP.png"

type Difficulty = 'basic' | 'intermediate' | null

export default function BattlePage() {
  const { battleState, myHealth, opponentHealth, sequence, connectToBattle, sendAttack, disconnectFromBattle } = useBattleSocket()
  const { runPython, loading } = usePyodide()
  const { avatar } = useAvatar()

  const [difficulty, setDifficulty] = useState<Difficulty>(null)
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [challengeIndex, setChallengeIndex] = useState(0)
  
  // --- LOCAL STORAGE LOGIC FOR RANKING & HISTORY ---
  const [matchHistory, setMatchHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('codegana_matchHistory')
    return saved ? JSON.parse(saved) : []
  })
  const [totalGames, setTotalGames] = useState<number>(() => {
    const saved = localStorage.getItem('codegana_totalGames')
    return saved ? parseInt(saved, 10) : 0
  })
  const [arenaPoints, setArenaPoints] = useState<number>(() => {
    const saved = localStorage.getItem('codegana_arenaPoints')
    return saved ? parseInt(saved, 10) : 0
  })
  
  const matchProcessed = useRef(false)

  useEffect(() => {
    if (battleState === 'battling') {
      matchProcessed.current = false 
    }
    
    if ((battleState === 'won' || battleState === 'lost') && !matchProcessed.current) {
      matchProcessed.current = true
      const isWin = battleState === 'won'
      
      setTotalGames(prev => {
        const newTotal = prev + 1
        localStorage.setItem('codegana_totalGames', newTotal.toString())
        return newTotal
      })

      setArenaPoints(prev => {
        const newPoints = Math.max(0, prev + (isWin ? 20 : -10))
        localStorage.setItem('codegana_arenaPoints', newPoints.toString())
        return newPoints
      })

      setMatchHistory(prev => {
        const newHistory = [...prev, isWin ? 'W' : 'L'].slice(-5)
        localStorage.setItem('codegana_matchHistory', JSON.stringify(newHistory))
        return newHistory
      })
    }
  }, [battleState])

  const getRankDetails = () => {
    if (totalGames < 3) return { name: 'Unranked', cssClass: 'rank-unranked' }
    if (arenaPoints < 100) return { name: 'Bronze', cssClass: 'rank-bronze' }
    if (arenaPoints < 250) return { name: 'Silver', cssClass: 'rank-silver' }
    if (arenaPoints < 500) return { name: 'Gold', cssClass: 'rank-gold' }
    if (arenaPoints < 1000) return { name: 'Platinum', cssClass: 'rank-platinum' }
    return { name: 'Diamond', cssClass: 'rank-diamond' }
  }

  const currentRank = getRankDetails()

  const challengeBank = difficulty === 'intermediate' ? intermediateArenaChallenges : basicArenaChallenges
  const currentChallengeId = sequence.length > 0 ? sequence[challengeIndex % sequence.length] : 0
  const battleChallenge = challengeBank[currentChallengeId % challengeBank.length] || challengeBank[0]

  useEffect(() => {
    return () => disconnectFromBattle()
  }, [disconnectFromBattle])

  async function handleRunAttack() {
    if (loading || battleState !== 'battling' || !battleChallenge) return
    let outputLog = ""
    let allPassed = true

    for (let i = 0; i < battleChallenge.testCases.length; i++) {
      const testCase = battleChallenge.testCases[i]
      const rawResult = await runPython(code, testCase.input)
      const userOut = rawResult.trim().replace(/\r\n/g, "\n")
      
      const rawExpected = typeof testCase.expectedOutput === "function" 
        ? testCase.expectedOutput(testCase.input) 
        : testCase.expectedOutput
      const expected = rawExpected.trim().replace(/\r\n/g, "\n")

      if (userOut === expected) {
        outputLog += `Test ${i + 1} Passed!\n`
      } else {
        outputLog += `❌ Test ${i + 1} Failed\nExpected: ${expected}\nGot: ${userOut}\n`
        allPassed = false
        break
      }
    }

    if (allPassed) {
      const dmgAmount = difficulty === 'basic' ? 12.5 : 25
      outputLog += `\n🔥 BOOM! All tests passed. ${dmgAmount} Damage Dealt!\nLoading next challenge...`
      sendAttack() 
      setChallengeIndex(prev => prev + 1)
      setCode('') 
    }
    setOutput(outputLog)
  }

  return <>
    <div className={`battle-page ${battleState === 'won' ? 'state-won' : ''} ${battleState === 'lost' ? 'state-lost' : ''}`}>
      
      {battleState === 'won' && (
        <div className="fireworks-container">
          <div className="firework-shell shell-1">
            <div className="firework-trail" />
            <div className="firework-burst">
              {Array.from({ length: 36 }).map((_, i) => (
                <span key={i} style={{ '--angle': `${i * 10}deg` } as React.CSSProperties} />
              ))}
            </div>
          </div>
          <div className="firework-shell shell-2">
            <div className="firework-trail" />
            <div className="firework-burst">
              {Array.from({ length: 36 }).map((_, i) => (
                <span key={i} style={{ '--angle': `${i * 10}deg` } as React.CSSProperties} />
              ))}
            </div>
          </div>
        </div>
      )}

      {battleState === 'lost' && (
        <div className="rain-container">
          <div className="rain-cloud cloud-left" />
          <div className="rain-cloud cloud-right" />
        </div>
      )}

      <div className="battle-header">
        <div className="arena-title-box">
          <h1>1v1 Code Arena</h1>
        </div>
        
        {battleState === 'idle' && (
          <div className="idle-arena-hub">
            
            <div className="arena-panel arena-rules-panel">
              <h3>Vanilla 1v1</h3>
              <p className="rules-text">
                Welcome to the Arena. This is a head to head coding battle. You and your opponent start with full health. The first person to drop their rival's health to zero wins. Every test case you pass deals damage. Write fast and accurate code to secure the victory. Good luck.
              </p>
            </div>

            <div className="arena-panel difficulty-card-panel">
              <h2 className="difficulty-title">Select Battle Rank</h2>
              <div className="difficulty-cards-grid">
                <div 
                  className={`diff-card ${difficulty === 'basic' ? 'selected' : ''}`}
                  onClick={() => setDifficulty('basic')}
                >
                  <div className="card-badge">Novice</div>
                  <h4>Basic Arena</h4>
                  <div className="talwar-display-small">
                    <div className="talwar single-talwar"></div>
                  </div>
                </div>

                <div 
                  className={`diff-card ${difficulty === 'intermediate' ? 'selected' : ''}`}
                  onClick={() => setDifficulty('intermediate')}
                >
                  <div className="card-badge hard">Expert</div>
                  <h4>Intermediate</h4>
                  <div className="talwar-display-small">
                    <div className="crossed-talwars">
                      <div className="talwar left-talwar"></div>
                      <div className="talwar right-talwar"></div>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                className={`queue-btn ${difficulty === null ? 'disabled' : 'active'}`} 
                onClick={() => difficulty && connectToBattle(difficulty)}
                disabled={difficulty === null}
              >
                Find Match
              </button>
            </div>

            <div className="arena-panel rank-history-panel">
              <h3>Your Rank</h3>
              
              <div className="rank-display">
                <div className={`rank-symbol ${currentRank.cssClass}`}></div>
                <h4 className={`rank-title ${currentRank.cssClass}-text`}>{currentRank.name}</h4>
                <p className="arena-points-text">{totalGames >= 3 ? `${arenaPoints} Arena Points` : `${3 - totalGames} matches until ranked`}</p>
              </div>

              <div className="recent-matches">
                <p className="recent-label">Recent Battles</p>
                <div className="match-history-row">
                  {matchHistory.length === 0 ? (
                    <span className="no-matches-text">No matches played yet</span>
                  ) : (
                    matchHistory.map((result, i) => (
                      <div key={i} className={`match-badge badge-${result.toLowerCase()}`}>
                        {result}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

          </div>
        )}

        {battleState === 'searching' && (
          <div className="searching-pulse">Searching for opponent...</div>
        )}
      </div>

      {battleState === 'battling' && battleChallenge && (
        <>
          <div className="arena-display">
            <div className="player-side">
              <AvatarImage avatar={avatar} />
              <div className="health-bar-bg">
                <div className="health-bar-fill my-health" style={{ width: `${myHealth}%` }} />
              </div>
              <span className="health-text">{myHealth} HP</span>
            </div>

            <div className="vs-badge">VS</div>

            <div className="opponent-side">
              <img src={enemyPFP} alt="Enemy" />
              <div className="health-bar-bg">
                <div className="health-bar-fill opponent-health" style={{ width: `${opponentHealth}%` }} />
              </div>
              <span className="health-text">{opponentHealth} HP</span>
            </div>
          </div>

          <div className="battle-workspace">
            <div className="battle-prompt">
              <h3>Mission {challengeIndex + 1}: {battleChallenge.title}</h3>
              <p>{battleChallenge.prompt}</p>
            </div>
            
            <CodeEditor value={code} onChange={setCode} />
            
            <button className="attack-btn" onClick={handleRunAttack}>
              Run & Attack
            </button>
            
            <button 
              className="attack-btn" 
              style={{ background: '#7b2cbf', marginTop: '0.5rem' }}
              onClick={() => {
                sendAttack()
                setChallengeIndex(prev => prev + 1)
                setCode('')
                setOutput("🛠️ Debug Backdoor: Challenge forcefully cleared!")
              }}
            >
              🛠️ [DEV] Instant Win / Skip Challenge
            </button>

            <div className="battle-output">
              <pre>{output || "Awaiting execution..."}</pre>
            </div>
          </div>
        </>
      )}

      {(battleState === 'won' || battleState === 'lost') && (
        <div className="podium-scene">
          <h2 className={battleState === 'won' ? "victory-text" : "defeat-text"}>
            {battleState === 'won' ? "VICTORY!" : "DEFEAT..."}
          </h2>
          
          <div className="podium-base">
            <div className="podium-step step-2nd">
              <div className="podium-avatar">
                {battleState === 'won' ? <img src={enemyPFP} style={{ width: "125px" }} alt="Enemy" /> : <AvatarImage avatar={avatar} size={125} />}
              </div>
              <div className="podium-block block-silver">2</div>
            </div>

            <div className="podium-step step-1st">
              <div className="podium-avatar">
                {battleState === 'won' ? <AvatarImage avatar={avatar} size={125} /> : <img src={enemyPFP} style={{ width: "125px" }} alt="Enemy" />}
              </div>
              <div className="podium-block block-gold">1</div>
            </div>
          </div>
          
          <button 
            className="queue-btn active play-again-btn"
            onClick={() => {
              disconnectFromBattle()
              setDifficulty(null)
              setChallengeIndex(0)
              setCode('')
              setOutput('')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            Find New Match
          </button>
        </div>
      )}
      
      <footer className="universal-foote">
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
  </>
}