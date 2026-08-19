import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { AvatarProvider } from './context/AvatarContext';
import ChallengePage from "./pages/ChallengePage";
import TopNavbar from './components/TopNavbar';
import CharacterCreator from './components/CharacterCreator/CharacterCreator.tsx';
import UserProfile from './components/Profile/UserProfile'; 

import BattlePage from './pages/BattlePage';
import PrivacyPolicy from './pages/PrivacyPolicy.tsx';
import TermsOfService from './pages/TermsOfService.tsx'

import challengesIcon from "./images/challengesIcon.png";
import docIcon from "./images/documentationIcon.png";
import arenaIcon from "./images/battleIcon.png";
import ReferencesPage from './pages/ReferencesPage';
import IndexPage from './pages/IndexPage';

export default function App() {
  const navigate = useNavigate();

  // Initialize state from localStorage
  const [xp, setXp] = useState<number>(() => Number(localStorage.getItem("xp")) || 0);
  const [streak, setStreak] = useState<number>(() => Number(localStorage.getItem("streak")) || 0);

  const [lifetimeXp, setLifetimeXp] = useState(() => {
    const saved = localStorage.getItem('codegana-lifetime-xp');
    return saved ? parseInt(saved) : 0;
  });

  const prevXpRef = useRef(xp);
  
  useEffect(() => {
    if (xp > prevXpRef.current) {
      const difference = xp - prevXpRef.current;
      setLifetimeXp(prev => {
        const newLifetime = prev + difference;
        localStorage.setItem('codegana-lifetime-xp', newLifetime.toString());
        return newLifetime;
      });
    }
    prevXpRef.current = xp;
  }, [xp]);

  const [lastCompletedDate, setLastCompletedDate] = useState<string>(() => localStorage.getItem("lastCompletedDate") || "");
  const [completed, setCompleted] = useState<Set<number>>(() => {
    const stored = localStorage.getItem("completed");
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  // Persist relevant state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("xp", xp.toString());
    localStorage.setItem("streak", streak.toString());
    localStorage.setItem("lastCompletedDate", lastCompletedDate);
    localStorage.setItem("completed", JSON.stringify(Array.from(completed)));
  }, [xp, streak, lastCompletedDate, completed]);

  // Simplified updateStreak
  function updateStreak(todayDate?: string) {
    const today = todayDate ?? new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    setStreak(prevStreak => {
      let newStreak = 1;
      if (lastCompletedDate === yesterday) {
        newStreak = prevStreak + 1;
      }
      setLastCompletedDate(today);
      return newStreak;
    });
  }

  const menuItems = [
    {
      label: "Challenges",
      icon: challengesIcon,
      onClick: () => navigate("/challenges")
    },
    {
      label: "Arena",
      icon: arenaIcon,
      onClick: () => navigate("/battle")
    },
    {
      label: "References",
      icon: docIcon,
      onClick: () => navigate("/references")
    },
  ];

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <AvatarProvider>
      <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
        <TopNavbar xp={xp} setXp={setXp} streak={streak} items={menuItems} onLogoClick={handleLogoClick} />
        
        <div className="app-content flex-1">
          <Routes>
            <Route path="/" element={<IndexPage />} />
            
            <Route 
              path="/profile" 
              element={
                <UserProfile 
                  lifetimeXp={lifetimeXp} 
                  streak={streak} 
                  completedCount={completed.size} 
                />
              } 
            />
            
            <Route path="/customize" element={<CharacterCreator />} />
            <Route path="/avatar-creator" element={<CharacterCreator />} />
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
            <Route path="/battle" element={<BattlePage />} />
            {/* <Route path="/privacypolicy" element={<PrivacyPolicy />} /> */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService/>} />
          </Routes>
        </div>
      </div>
    </AvatarProvider>
  );
}