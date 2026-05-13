import { useEffect, useRef } from "react"
import StaggeredMenu from "./StaggeredMenu/StaggeredMenu"

import codeganaLogoWide from "../images/codeganaLogoWide.png"

type MenuItem = {
  label: string
  icon?: string
  onClick: () => void
  active?: boolean
}

type Props = {
  xp: number
  streak: number
  items: MenuItem[]
  onLogoClick?: () => void
}


export default function TopNavbar({ xp, streak, items, onLogoClick }: Props) {
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
        {/* XP STAR */}
        <div className="stat xp">
          <span className="icon" ref={starRef}>
            <span className="fill"></span>
          </span>
          <span className="stat-value">{xp}</span>
        </div>

        {/* STREAK */}
        <div className="stat streak">
          <span className="icon">
            <span className="fill"></span>
          </span>
          <span className="stat-value">{streak}</span>
        </div>
      </div>
    </header>
  )
}