import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import "./StaggeredMenu.css"

import leftArrow from "../../images/leftArrow.png"

type MenuItem = {
  label: string
  icon?: string
  onClick: () => void
  active?: boolean
}

type Props = {
  items: MenuItem[]
  accentColor?: string
}

export default function StaggeredMenu({
  items,
  accentColor = "#113360"
}: Props) {
  const [open, setOpen] = useState(false)

  const panelRef = useRef<HTMLDivElement>(null)
  const preLayerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  // Initial position
  useEffect(() => {
    gsap.set(panelRef.current, { xPercent: -100 })
    gsap.set(preLayerRef.current, { xPercent: -100 })
  }, [])

  useEffect(() => {
    if (open) {
      // Prelayer
      gsap.to(preLayerRef.current, {
        xPercent: 0,
        duration: 0.4,
        ease: "power4.out"
      })

      // Panel
      gsap.to(panelRef.current, {
        xPercent: 0,
        duration: 0.6,
        ease: "power4.out",
        delay: 0.05
      })

      // Items stagger
      gsap.fromTo(
        itemRefs.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power4.out",
          stagger: 0.08,
          delay: 0.2
        }
      )
    } else {
      gsap.to([panelRef.current, preLayerRef.current], {
        xPercent: -100,
        duration: 0.35,
        ease: "power3.in"
      })
    }
  }, [open])

  return (
    <div
      className="staggered-menu-wrapper"
      data-open={open}
      style={
        { "--sm-accent": accentColor } as React.CSSProperties
      }
    >
      {/* PRELAYER */}
      <div ref={preLayerRef} className="sm-prelayer" />

      {/* PANEL */}
      <div ref={panelRef} className="staggered-menu-panel">
        <ul className="sm-panel-list">
          {items.map((item, i) => (
            <li key={item.label}>
              <div
                ref={(el) => {
                    itemRefs.current[i] = el
                }}
                className={`sm-panel-item ${
                  item.active ? "active" : ""
                }`}
                onClick={() => {
                  item.onClick()
                  setOpen(false)
                }}
              >
                {item.icon && (
                  <img
                    src={item.icon}
                    className="sm-panel-itemIcon"
                  />
                )}
                <span className="sm-panel-itemLabel">
                  {item.label}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* TOGGLE BUTTON */}
      <button
        className="sm-toggle"
        onClick={() => setOpen(!open)}
      >
        <img
          src={leftArrow}
          draggable="false"
          className={open ? "rotated" : ""}
        />
      </button>
    </div>
  )
}