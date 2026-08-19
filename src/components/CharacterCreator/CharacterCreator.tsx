import { useState, useEffect } from 'react'
import AvatarPreview from './AvatarPreview'
import CustomizerPanel from './CustomizerPanel'
import './CharacterCreator.css'

export default function CharacterCreator() {
  const [isSaved, setIsSaved] = useState(false)

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Show saved notification
  const handleSaveNotification = () => {
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  return (
    <div className="character-creator-page">
      {/* Save Notification */}
      {isSaved && (
        <div className="save-notification">
          Avatar Saved!
        </div>
      )}

      <div className="character-creator-container">
        {/* Left Side - Preview (50%) */}
        <div className="character-creator-left">
          <AvatarPreview />
        </div>

        {/* Right Side - Customizer (50%) */}
        <div className="character-creator-right">
          <CustomizerPanel onSave={handleSaveNotification} />
        </div>
      </div>
    </div>
  )
}