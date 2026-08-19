// import { useState, useEffect } from 'react'
// import { useNavigate, Link } from "react-router-dom"
// import { useBattleSocket } from '../hooks/useBattleSocket'
// import { usePyodide } from '../hooks/usePyodide'
// import { useAvatar } from '../context/AvatarContext'
// import { basicArenaChallenges, intermediateArenaChallenges } from '../data/arenaChallenges'
// import CodeEditor from '../components/CodeEditor'
// import AvatarImage from '../components/CharacterCreator/AvatarImage'
// // import { TrophyIcon } from '../components/TrophyIcon'
// import './BattlePage.css'
// import enemyPFP from "../images/enemyPFP.png"
// import mascotImage from "../images/CGmascotLeft!.png"

// type Difficulty = 'basic' | 'intermediate' | null

// export default function BattlePage() {
//   const { battleState, myHealth, opponentHealth, sequence, connectToBattle, sendAttack, disconnectFromBattle } = useBattleSocket()
//   const { runPython, loading } = usePyodide()
//   const { avatar } = useAvatar()

//   const [difficulty, setDifficulty] = useState<Difficulty>(null)
//   const [code, setCode] = useState('')
//   const [output, setOutput] = useState('')
//   const [challengeIndex, setChallengeIndex] = useState(0)
  
//   // Use modulo fallback to wrap around indices, pull from specific arena banks
//   const challengeBank = difficulty === 'intermediate' ? intermediateArenaChallenges : basicArenaChallenges
//   const currentChallengeId = sequence.length > 0 ? sequence[challengeIndex % sequence.length] : 0
//   // Fallback safe logic if array bounds are exceeded
//   const battleChallenge = challengeBank[currentChallengeId % challengeBank.length] || challengeBank[0]


//   // Scroll to top automatically on Victory or Defeat screen
//   // useEffect(() => {
//   //   if (battleState === 'won' || battleState === 'lost') {
//   //     window.scrollTo({ top: 0, behavior: 'smooth' })
//   //   }
//   // }, [battleState])

//   useEffect(() => {
//     return () => disconnectFromBattle()
//   }, [disconnectFromBattle])

//   async function handleRunAttack() {
//     if (loading || battleState !== 'battling' || !battleChallenge) return

//     let outputLog = ""
//     let allPassed = true

//     for (let i = 0; i < battleChallenge.testCases.length; i++) {
//       const testCase = battleChallenge.testCases[i]
//       const rawResult = await runPython(code, testCase.input)
//       const userOut = rawResult.trim().replace(/\r\n/g, "\n")
      
//       const rawExpected = typeof testCase.expectedOutput === "function" 
//         ? testCase.expectedOutput(testCase.input) 
//         : testCase.expectedOutput
//       const expected = rawExpected.trim().replace(/\r\n/g, "\n")

//       if (userOut === expected) {
//         outputLog += `Test ${i + 1} Passed!\n`
//       } else {
//         outputLog += `❌ Test ${i + 1} Failed\nExpected: ${expected}\nGot: ${userOut}\n`
//         allPassed = false
//         break
//       }
//     }
    

//     if (allPassed) {
//       const dmgAmount = difficulty === 'basic' ? 12.5 : 25
//       outputLog += `\n🔥 BOOM! All tests passed. ${dmgAmount} Damage Dealt!\nLoading next challenge...`
//       sendAttack() 
//       setChallengeIndex(prev => prev + 1)
//       setCode('') 
//     }

//     setOutput(outputLog)
//   }

//   return <>
//     <div className={`battle-page ${battleState === 'won' ? 'state-won' : ''} ${battleState === 'lost' ? 'state-lost' : ''}`}>
      
//       {/* Dynamic Effects based on State */}
//       {battleState === 'won' && (
//         <div className="fireworks-container">
//           {/* Shell 1 (Green) */}
//           <div className="firework-shell shell-1">
//             <div className="firework-trail" />
//             <div className="firework-burst">
//               {Array.from({ length: 36 }).map((_, i) => (
//                 <span key={i} style={{ '--angle': `${i * 10}deg` } as React.CSSProperties} />
//               ))}
//             </div>
//           </div>

//           {/* Shell 2 (Yellow) */}
//           <div className="firework-shell shell-2">
//             <div className="firework-trail" />
//             <div className="firework-burst">
//               {Array.from({ length: 36 }).map((_, i) => (
//                 <span key={i} style={{ '--angle': `${i * 10}deg` } as React.CSSProperties} />
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {battleState === 'lost' && (
//         <div className="rain-container">
//           <div className="rain-cloud cloud-left" />
//           <div className="rain-cloud cloud-right" />
//         </div>
//       )}

//       <div className="battle-header">
//         <div className="arena-title-box">
//           <h1>1v1 Code Arena</h1>
//         </div>
        
//         {battleState === 'idle' && (
//           <div className="difficulty-selector-container">
//             <h2 className="difficulty-title">Difficulty</h2>
//             <div className="difficulty-buttons">
//               <button 
//                 className={`diff-btn ${difficulty === 'basic' ? 'selected' : ''}`}
//                 onClick={() => setDifficulty('basic')}
//               >
//                 Basic
//               </button>
//               <button 
//                 className={`diff-btn ${difficulty === 'intermediate' ? 'selected' : ''}`}
//                 onClick={() => setDifficulty('intermediate')}
//               >
//                 Intermediate
//               </button>
//             </div>

//             {/* CSS Talwars Rendering */}
//             <div className="talwar-display">
//               {difficulty === 'basic' && (
//                 <div className="talwar single-talwar"></div>
//               )}
//               {difficulty === 'intermediate' && (
//                 <div className="crossed-talwars">
//                   <div className="talwar left-talwar"></div>
//                   <div className="talwar right-talwar"></div>
//                 </div>
//               )}
//             </div>

//             <button 
//               className={`queue-btn ${difficulty === null ? 'disabled' : 'active'}`} 
//               onClick={() => difficulty && connectToBattle(difficulty)}
//               disabled={difficulty === null}
//             >
//               Find Match
//             </button>
//           </div>
//         )}

//         {battleState === 'searching' && (
//           <div className="searching-pulse">Searching for opponent...</div>
//         )}
//       </div>

//       {battleState === 'battling' && battleChallenge && (
//         <>
//           <div className="arena-display">
//             <div className="player-side">
//               <AvatarImage avatar={avatar} />
//               <div className="health-bar-bg">
//                 <div className="health-bar-fill my-health" style={{ width: `${myHealth}%` }} />
//               </div>
//               <span className="health-text">{myHealth} HP</span>
//             </div>

//             <div className="vs-badge">VS</div>

//             <div className="opponent-side">
//               <img src={enemyPFP} alt="Enemy" />
//               <div className="health-bar-bg">
//                 <div className="health-bar-fill opponent-health" style={{ width: `${opponentHealth}%` }} />
//               </div>
//               <span className="health-text">{opponentHealth} HP</span>
//             </div>
//           </div>

//           <div className="battle-workspace">
//             <div className="battle-prompt">
//               <h3>Mission {challengeIndex + 1}: {battleChallenge.title}</h3>
//               <p>{battleChallenge.prompt}</p>
//             </div>
            
//             <CodeEditor value={code} onChange={setCode} />
            
//             <button className="attack-btn" onClick={handleRunAttack}>
//               Run & Attack
//             </button>
            
//             {/* 🛠️ TEMPORARY DEBUG BACKDOOR BUTTON */}
//             <button 
//               className="attack-btn" 
//               style={{ background: '#7b2cbf', marginTop: '0.5rem' }}
//               onClick={() => {
//                 // Instantly fires the success/attack logic to deal full damage / clear challenge
//                 sendAttack()
//                 setChallengeIndex(prev => prev + 1)
//                 setCode('')
//                 setOutput("🛠️ Debug Backdoor: Challenge forcefully cleared!")
//               }}
//             >
//               🛠️ [DEV] Instant Win / Skip Challenge
//             </button>

//             <div className="battle-output">
//               <pre>{output || "Awaiting execution..."}</pre>
//             </div>
//           </div>
//         </>
//       )}

//       {/* THE PODIUM SYSTEM FOR GAME OVER */}
//       {(battleState === 'won' || battleState === 'lost') && (
//         <div className="podium-scene">
//           <h2 className={battleState === 'won' ? "victory-text" : "defeat-text"}>
//             {battleState === 'won' ? "VICTORY!" : "DEFEAT..."}
//           </h2>
          
//           <div className="podium-base">
            
//             {/* 2nd Place */}
//             <div className="podium-step step-2nd">
//               <div className="podium-avatar">
//                 {battleState === 'won' ? <img src={enemyPFP} style={{ width: "125px" }} alt="Enemy" /> : <AvatarImage avatar={avatar} size={125} />}
//               </div>
//               <div className="podium-block block-silver">2</div>
//             </div>

//             {/* 1st Place */}
//             <div className="podium-step step-1st">
//               <div className="podium-avatar">
//                 {battleState === 'won' ? <AvatarImage avatar={avatar} size={125} /> : <img src={enemyPFP} style={{ width: "125px" }} alt="Enemy" />}
//               </div>
//               <div className="podium-block block-gold">1</div>
//             </div>

//             {/* Victory Mascot and Trophy (disappears on loss) */}
//             <div className={`elephant-spectator ${battleState === 'lost' ? 'dust-fade' : ''}`}>
//               {/* <TrophyIcon size={60} /> */}
//               {/* <img src={mascotImage} alt="Victory Mascot" className="mascot-image" /> */}
//             </div>
//           </div>
//         <button 
//             className="queue-btn active play-again-btn"
//             onClick={() => {
//               disconnectFromBattle()
//               setDifficulty(null)
//               setChallengeIndex(0)
//               setCode('')
//               setOutput('')
//               window.scrollTo({ top: 0, behavior: 'smooth' })
//             }}
//           >
//             Find New Match
//           </button>
//         </div>
//       )}
//       <footer className="universal-foote">
//         <span className="footer-label">Trust & Safety</span>
//         <div className="footer-links">
//           <Link to="/privacy" className="footer-privacy-btn">
//             Privacy Policy (COPPA)
//           </Link>
//           <Link to="/terms" className="footer-privacy-btn">
//             Terms of Service
//           </Link>
//         </div>
//       </footer>
//     </div>
//   </>
// }