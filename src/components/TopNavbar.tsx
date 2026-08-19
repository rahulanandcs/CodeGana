import { useEffect, useRef } from "react"
import StaggeredMenu from "./StaggeredMenu/StaggeredMenu"
import AvatarHeader from "./AvatarHeader/AvatarHeader"

import codeganaLogoWide from "../images/codeganaLogoWide.png"
import xpIcon from "../images/xpIcon.png"
import streakIcon from "../images/streakIcon.png"

type MenuItem = {
  label: string
  icon?: string
  onClick: () => void
  active?: boolean
}

type Props = {
  xp: number
  setXp: React.Dispatch<React.SetStateAction<number>>
  streak: number
  items: MenuItem[]
  onLogoClick?: () => void
}

export default function TopNavbar({ xp, setXp, streak, items, onLogoClick }: Props) {
  const prevXp = useRef(xp)
  const starRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (xp > prevXp.current) {
      // trigger animation
      starRef.current?.classList.add("xp-animate")

      // remove class after animation
      setTimeout(() => {
        starRef.current?.classList.remove("xp-animate")
      }, 700)
    }

    prevXp.current = xp
  }, [xp])

  return (
    <header className="top-navbar">
      <div className="nav-left">
        <StaggeredMenu items={items} accentColor="#113360" />
      </div>

      <div className="nav-center">
        <span 
          className="logo" 
          onClick={onLogoClick}
          style={{ cursor: 'pointer' }}
        >
          <img src={codeganaLogoWide} alt="CodeGana Logo" />
        </span>
      </div>

      <div className="nav-right">
        <div className="stat xp">
          <img src={xpIcon} className="icon"></img>
          <span className="stat-value">{xp}</span>
        </div>

        <div className="stat streak">
          <img src={streakIcon} className="icon"></img>
          <span className="stat-value">{streak}</span>
        </div>

        {/* PASS XP & SETXP TO AVATAR HEADER */}
        <AvatarHeader xp={xp} setXp={setXp} />
      </div>
    </header>
  )
}