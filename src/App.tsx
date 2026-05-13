import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom"
import ChallengePage from "./pages/ChallengePage"
import TopNavbar from './components/TopNavbar';
import challengesIcon from "./images/challengesIcon.png"
import docIcon from "./images/documentationIcon.png"
import ReferencesPage from './pages/ReferencesPage'
import IndexPage from './pages/IndexPage'

export default function App() {
  const navigate = useNavigate()

  // Initialize state from localStorage
  const [xp, setXp] = useState<number>(() => Number(localStorage.getItem("xp")) || 0);
  const [streak, setStreak] = useState<number>(() => Number(localStorage.getItem("streak")) || 0);
  const [lastCompletedDate, setLastCompletedDate] = useState<string>(() => localStorage.getItem("lastCompletedDate") || "");
  const [completed, setCompleted] = useState<Set<number>>(() => {
    const stored = localStorage.getItem("completed")
    return stored ? new Set(JSON.parse(stored)) : new Set()
  })

  // Persist relevant state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("xp", xp.toString())
    localStorage.setItem("streak", streak.toString())
    localStorage.setItem("lastCompletedDate", lastCompletedDate)
    localStorage.setItem("completed", JSON.stringify(Array.from(completed)))
  }, [xp, streak, lastCompletedDate, completed])

  // Simplified updateStreak
  function updateStreak(todayDate?: string) {
    const today = todayDate ?? new Date().toISOString().split("T")[0] // YYYY-MM-DD
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]

    setStreak(prevStreak => {
      let newStreak = 1
      if (lastCompletedDate === yesterday) {
        newStreak = prevStreak + 1
      }
      setLastCompletedDate(today)
      // localStorage is already updated by the useEffect above
      return newStreak
    })
  }

  const menuItems = [
    {
      label: "Challenges",
      icon: challengesIcon,
      onClick: () => navigate("/challenges")
    },
    {
      label: "References",
      icon: docIcon,
      onClick: () => navigate("/references")
    },
  ]

  const handleLogoClick = () => {
    navigate("/")
  }

  return (
    <>
      <TopNavbar xp={xp} streak={streak} items={menuItems} onLogoClick={handleLogoClick} />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route
            path="/challenges"
            element={
              <ChallengePage
                xp={xp}
                setXp={setXp}
                streak={streak}
                setStreak={setStreak}
                lastCompletedDate={lastCompletedDate}
                setLastCompletedDate={setLastCompletedDate}
                completed={completed}
                setCompleted={setCompleted}
                updateStreak={updateStreak}
              />
            }
          />
          <Route path="/references" element={<ReferencesPage />} />
        </Routes>
      </div>
    </>
  )
}