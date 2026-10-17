import { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useBattleSocket } from '../hooks/useBattleSocket'
import { usePyodide } from '../hooks/usePyodide'
import { useAvatar } from '../context/AvatarContext'
import { basicArenaChallenges, intermediateArenaChallenges } from '../data/arenaChallenges'
import CodeEditor from '../components/CodeEditor'
import AvatarImage from '../components/CharacterCreator/AvatarImage'
import './BattlePage.css'
import enemyPFP from "../images/enemyPFP.png"
// import mascotSide from "../images/CGmascotLeft!.png"

type Difficulty = 'basic' | 'intermediate' | null

const RANK_TIERS = [
  { name: 'Bronze', min: 0, max: 100 },
  { name: 'Silver', min: 100, max: 250 },
  { name: 'Gold', min: 250, max: 500 },
  { name: 'Platinum', min: 500, max: 1000 },
  { name: 'Diamond', min: 1000, max: 1000 },
]

export default function BattlePage() {
  const navigate = useNavigate()
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
  const [winStreak, setWinStreak] = useState<number>(() => {
    const saved = localStorage.getItem('codegana_winStreak')
    return saved ? parseInt(saved, 10) : 0
  })

  // --- MATCH PERFORMANCE TRACKING (for post-battle stat panels) ---
  const [attackAttempts, setAttackAttempts] = useState(0)
  const [successfulAttacks, setSuccessfulAttacks] = useState(0)
  const [battleDuration, setBattleDuration] = useState(0)
  const [lastPointsDelta, setLastPointsDelta] = useState(0)
  const battleStartRef = useRef<number>(0)

  const matchProcessed = useRef(false)

  useEffect(() => {
    if (battleState === 'battling' && matchProcessed.current !== false) {
      // no-op guard, handled below
    }
    if (battleState === 'battling') {
      matchProcessed.current = false
    }

    if ((battleState === 'won' || battleState === 'lost') && !matchProcessed.current) {
      matchProcessed.current = true
      const isWin = battleState === 'won'
      const duration = battleStartRef.current ? Date.now() - battleStartRef.current : 0
      setBattleDuration(duration)

      setTotalGames(prev => {
        const newTotal = prev + 1
        localStorage.setItem('codegana_totalGames', newTotal.toString())
        return newTotal
      })

      setArenaPoints(prev => {
        const delta = isWin ? 20 : -10
        const newPoints = Math.max(0, prev + delta)
        setLastPointsDelta(newPoints - prev === 0 && prev === 0 ? 0 : (isWin ? 20 : (prev > 0 ? -10 : 0)))
        localStorage.setItem('codegana_arenaPoints', newPoints.toString())
        return newPoints
      })

      setWinStreak(prev => {
        const newStreak = isWin ? prev + 1 : 0
        localStorage.setItem('codegana_winStreak', newStreak.toString())
        return newStreak
      })

      setMatchHistory(prev => {
        const newHistory = [...prev, isWin ? 'W' : 'L'].slice(-5)
        localStorage.setItem('codegana_matchHistory', JSON.stringify(newHistory))
        return newHistory
      })
    }
  }, [battleState])

  // Start the match timer and reset performance counters once a battle begins
  useEffect(() => {
    if (battleState === 'battling' && battleStartRef.current === 0) {
      battleStartRef.current = Date.now()
    }
    if (battleState === 'searching') {
      battleStartRef.current = 0
      setAttackAttempts(0)
      setSuccessfulAttacks(0)
      setBattleDuration(0)
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

  const getRankProgress = () => {
    if (totalGames < 3) {
      return { pct: ((3 - Math.max(0, 3 - totalGames)) / 3) * 100, caption: `${Math.max(0, 3 - totalGames)} matches until ranked` }
    }
    const tier = RANK_TIERS.find(t => arenaPoints < t.max) ?? RANK_TIERS[RANK_TIERS.length - 1]
    if (tier.name === 'Diamond') {
      return { pct: 100, caption: 'Peak tier reached' }
    }
    const span = tier.max - tier.min
    const progressed = arenaPoints - tier.min
    const pct = Math.min(100, Math.max(0, (progressed / span) * 100))
    const remaining = tier.max - arenaPoints
    return { pct, caption: `${remaining} points to next tier` }
  }

  const rankProgress = getRankProgress()
  const xpGained = successfulAttacks * 15
  const avgSpeedSeconds = successfulAttacks > 0 ? Math.round((battleDuration / successfulAttacks) / 1000) : null
  const accuracyPct = attackAttempts > 0 ? Math.round((successfulAttacks / attackAttempts) * 100) : 0
  const damageDealtPct = Math.round(100 - opponentHealth)

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

    setAttackAttempts(prev => prev + 1)

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
        outputLog += `Test ${i + 1} Failed\nExpected: ${expected}\nGot: ${userOut}\n`
        allPassed = false
        break
      }
    }

    if (allPassed) {
      const dmgAmount = difficulty === 'basic' ? 12.5 : 25
      outputLog += `\nAll tests passed. ${dmgAmount} damage dealt.\nLoading next challenge...`
      setSuccessfulAttacks(prev => prev + 1)
      sendAttack()
      setChallengeIndex(prev => prev + 1)
      setCode('')
    }
    setOutput(outputLog)
  }

  function handlePlayAgain() {
    disconnectFromBattle()
    setDifficulty(null)
    setChallengeIndex(0)
    setCode('')
    setOutput('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

 const [copied, setCopied] = useState(false)

 async function handleShare() {
 const resultText = battleState === 'won'
     ? `I just won a CodeGana Arena battle! ${damageDealtPct}% damage dealt, ${accuracyPct}% accuracy.`
     : `I fought hard in the CodeGana Arena and I'm coming back stronger.`

 if (navigator.share) {
     try {
     await navigator.share({ title: 'CodeGana Arena', text: resultText })
     } catch {
     // User cancelled share prompt
     }
 } else if (navigator.clipboard) {
     try {
     await navigator.clipboard.writeText(resultText)
     setCopied(true)
     setTimeout(() => setCopied(false), 2500)
     } catch {
     console.error("Clipboard access denied.")
     }
    }
  }

  return <>
    <div className={`battle-page ${battleState === 'won' ? 'state-won' : ''} ${battleState === 'lost' ? 'state-lost' : ''}`}>

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
              <h2 className="difficulty-title">Select Difficulty</h2>
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
        <div className="active-battle-container">

          <div className="arena-display">
            <div className="player-side">
              <AvatarImage avatar={avatar} size={110} />
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

            <div className="battle-output">
              <pre>{output || "Awaiting execution..."}</pre>
            </div>
          </div>

        </div>
      )}
        {(battleState === 'won' || battleState === 'lost') && (
        <div className={`post-battle-stage ${battleState === 'won' ? 'stage-won' : 'stage-lost'}`}>

          <div className="ambient-fx" aria-hidden="true">
            {battleState === 'won' ? (
              <>
                <div className="god-rays" />
                <div className="ember-field">
                  {Array.from({ length: 22 }).map((_, i) => (
                    <span key={i} className="ember" style={{ '--i': i } as React.CSSProperties} />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="storm-swirl" />
                <div className="lightning-flash flash-a" />
                <div className="lightning-flash flash-b" />
                <div className="storm-rain" />
                {/* Returned CSS Clouds */}
                <div className="rain-cloud cloud-left" />
                <div className="rain-cloud cloud-right" />
              </>
            )}
          </div>

          <h2 className={battleState === 'won' ? "victory-text" : "defeat-text"}>
            {battleState === 'won' ? "VICTORY" : "DEFEAT"}
          </h2>

          <div className="post-battle-grid">

            <div className="flanker-panel stats-panel">
              <h3 className="flanker-title">Match Stats</h3>

              <div className="stat-row">
                <span className="stat-key">Damage Dealt</span>
                <span className="stat-val">{damageDealtPct}%</span>
              </div>
              <div className="stat-row">
                <span className="stat-key">Accuracy</span>
                <span className="stat-val">{accuracyPct}%</span>
              </div>
              <div className="stat-row">
                <span className="stat-key">Challenges Cleared</span>
                <span className="stat-val">{successfulAttacks}</span>
              </div>
              <div className="stat-row">
                <span className="stat-key">Avg Speed</span>
                <span className="stat-val">{avgSpeedSeconds !== null ? `${avgSpeedSeconds}s` : '--'}</span>
              </div>
              <div className="stat-row highlight-row">
                <span className="stat-key">Win Streak</span>
                <span className="stat-val">{winStreak}</span>
              </div>
            </div>

            <div className="podium-scene">
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
              <div className="podium-floor" />
            </div>

            <div className="flanker-panel rewards-panel">
              <h3 className="flanker-title">Rewards</h3>

              <div className="reward-block">
                <div className="reward-label-row">
                  <span>XP Gained</span>
                  <span className="reward-amount">+{xpGained}</span>
                </div>
                <div className="reward-bar-bg">
                  <div className="reward-bar-fill xp-fill" style={{ width: `${Math.min(100, (xpGained / 150) * 100)}%` }} />
                </div>
              </div>

              <div className="reward-block">
                <div className="reward-label-row">
                  <span>Arena Points</span>
                  <span className={`reward-amount ${lastPointsDelta >= 0 ? 'positive' : 'negative'}`}>
                    {lastPointsDelta >= 0 ? `+${lastPointsDelta}` : lastPointsDelta}
                  </span>
                </div>
              </div>

              <div className="reward-block">
                <div className="reward-label-row">
                  <span>Rank Progress</span>
                  <span className="reward-amount">{currentRank.name}</span>
                </div>
                <div className="reward-bar-bg">
                  <div className="reward-bar-fill rank-fill" style={{ width: `${rankProgress.pct}%` }} />
                </div>
                <p className="rank-progress-caption">{rankProgress.caption}</p>
              </div>
            </div>

          </div>

          <div className="post-battle-dock">
            <button className="dock-btn dock-secondary" onClick={() => navigate('/')}>
              Return to Hub
            </button>
            <button className="dock-btn dock-primary" onClick={handlePlayAgain}>
              Play Again
            </button>
            <button className="dock-btn dock-secondary" onClick={handleShare}>
                {copied ? "Copied to Clipboard!" : "Share Result"}
            </button>
          </div>

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