import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import type { ReferenceItem } from "../data/referenceData"
import "./ReferenceModal.css"

type ReferenceModalProps = {
  item: ReferenceItem
  onClose: () => void
}

export default function ReferenceModal({ item, onClose }: ReferenceModalProps) {
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
    }, 500) // Match animation duration
  }

  const modalContent = (
    <div className={`reference-modal-overlay ${isClosing ? 'closing' : ''}`}>
      <div className={`reference-modal ${isClosing ? 'closing' : ''}`}>
        <button className="modal-close-btn" onClick={handleClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="modal-content">
          <h2 className="modal-title">{item.title}</h2>
          
          <div className="modal-description">
            <p>{item.description}</p>
          </div>

          <div className="modal-code-section">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="terminal-btn red"></span>
                <span className="terminal-btn yellow"></span>
                <span className="terminal-btn green"></span>
              </div>
              <span className="terminal-title">example.py</span>
            </div>
            
            <div className="terminal-body">
              <pre className="code-block">
                <code>{item.example}</code>
              </pre>
            </div>
          </div>

          {item.output && (
            <div className="modal-output-section">
              <div className="output-label">Output:</div>
              <div className="output-box">
                <pre>{item.output}</pre>
              </div>
            </div>
          )}

          {item.notes && (
            <div className="modal-notes">
              <h3>Notes:</h3>
              <ul>
                {item.notes.map((note: string, index: number) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // Render modal using portal to document.body
  return createPortal(modalContent, document.body)
}