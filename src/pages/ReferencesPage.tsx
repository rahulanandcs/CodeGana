import { useState } from "react"
import BentoGrid from "../components/BentoGrid"
import ReferenceModal from "../components/ReferenceModal"
import { bentoBoxes } from "../data/referenceData"
import type { ReferenceItem } from "../data/referenceData"
import "./ReferencesPage.css"

import lofiBG from "../images/lofiBG.jpeg"

export default function ReferencesPage() {
  const [selectedTile, setSelectedTile] = useState<ReferenceItem | null>(null)
  const [currentBoxIndex, setCurrentBoxIndex] = useState(0)

  const handlePrevious = () => {
    setCurrentBoxIndex((prev) => (prev === 0 ? bentoBoxes.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentBoxIndex((prev) => (prev === bentoBoxes.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="references-page" style={{ backgroundImage: `url(${lofiBG})` }}>
      <div className="references-header">
        <h1>Python Reference</h1>
        <p>Click any tile to explore the concept</p>
      </div>

      <div className="bento-carousel-container">
        <button 
          className="carousel-arrow carousel-arrow-left"
          onClick={handlePrevious}
          aria-label="Previous box"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <BentoGrid 
          items={bentoBoxes[currentBoxIndex]} 
          onTileClick={setSelectedTile}
          currentIndex={currentBoxIndex}
        />

        <button 
          className="carousel-arrow carousel-arrow-right"
          onClick={handleNext}
          aria-label="Next box"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="carousel-dots">
        {bentoBoxes.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentBoxIndex ? 'active' : ''}`}
            onClick={() => setCurrentBoxIndex(index)}
            aria-label={`Go to box ${index + 1}`}
          />
        ))}
      </div>

      {selectedTile && (
        <ReferenceModal 
          item={selectedTile}
          onClose={() => setSelectedTile(null)}
        />
      )}
    </div>
  )
}