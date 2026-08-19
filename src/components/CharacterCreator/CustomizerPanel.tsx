import { useAvatar } from '../../context/AvatarContext'
import { colorMap, colorOrder } from '../../data/avatarAssets'
import './CustomizerPanel.css'

interface CustomizerPanelProps {
  onSave: () => void
}

export default function CustomizerPanel({ onSave }: CustomizerPanelProps) {
  const { avatar, updateAvatar, resetAvatar } = useAvatar()

  const handleSave = () => {
    onSave()
  }

  const handleReset = () => {
    if (confirm('Reset avatar colors?')) {
      resetAvatar()
    }
  }

  return (
    <div className="customizer-panel">
      <div className="customizer-header">
        <h2>Colors</h2>
        <button 
          className="reset-button" 
          onClick={handleReset}
          title="Reset colors"
        >
          ↻
        </button>
      </div>

      {/* Primary Color Selection */}
      <div className="color-section">
        <h3>Primary Color</h3>
        <div className="color-row">
          {colorOrder.map((color) => (
            <button
              key={`primary-${color}`}
              className={`color-square ${avatar.primaryColor === color ? 'selected' : ''}`}
              style={{ backgroundColor: colorMap[color].hex }}
              onClick={() => updateAvatar({ primaryColor: color })}
              title={colorMap[color].name}
              aria-label={`Primary ${colorMap[color].name}`}
            >
              {avatar.primaryColor === color && <span className="checkmark">✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Secondary Color Selection */}
      <div className="color-section">
        <h3>Secondary Color</h3>
        <div className="color-row">
          {colorOrder.map((color) => (
            <button
              key={`secondary-${color}`}
              className={`color-square ${avatar.secondaryColor === color ? 'selected' : ''}`}
              style={{ backgroundColor: colorMap[color].hex }}
              onClick={() => updateAvatar({ secondaryColor: color })}
              title={colorMap[color].name}
              aria-label={`Secondary ${colorMap[color].name}`}
            >
              {avatar.secondaryColor === color && <span className="checkmark">✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Tertiary Color Selection */}
      <div className="color-section">
        <h3>Tertiary Color</h3>
        <div className="color-row">
          {colorOrder.map((color) => (
            <button
              key={`tertiary-${color}`}
              className={`color-square ${avatar.tertiaryColor === color ? 'selected' : ''}`}
              style={{ backgroundColor: colorMap[color].hex }}
              onClick={() => updateAvatar({ tertiaryColor: color })}
              title={colorMap[color].name}
              aria-label={`Tertiary ${colorMap[color].name}`}
            >
              {avatar.tertiaryColor === color && <span className="checkmark">✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="customizer-actions">
        <button className="save-button" onClick={handleSave}>
          Save Avatar
        </button>
      </div>
    </div>
  )
}