import { useState } from 'react'
import { useAvatar } from '../../context/AvatarContext'
import { SHOP_ITEMS, type ShopItem } from '../../data/shopData'
import AvatarImage from './AvatarImage'
import './AvatarShopModal.css'

interface AvatarShopModalProps {
  xp: number
  setXp: React.Dispatch<React.SetStateAction<number>>
  onClose: () => void
}

export default function AvatarShopModal({ xp, setXp, onClose }: AvatarShopModalProps) {
  const { avatar, updateAvatar, buyItem } = useAvatar()
  const [activeTab, setActiveTab] = useState<'background' | 'decal' | 'accessory'>('background')
  const [message, setMessage] = useState<string | null>(null)
  
  // Custom Number Modal State
  const [numberModalMode, setNumberModalMode] = useState<'single' | 'double' | null>(null)
  const [digitInput, setDigitInput] = useState('')

  const filteredItems = SHOP_ITEMS.filter(item => item.type === activeTab)

  const showToast = (txt: string) => {
    setMessage(txt)
    setTimeout(() => setMessage(null), 2500)
  }

  const handlePurchaseOrEquip = (item: ShopItem) => {
    const isOwned = avatar.unlockedItems.includes(item.id)

    if (!isOwned) {
      const success = buyItem(item.id, item.price, xp, setXp)
      if (!success) {
        showToast(`Not enough XP! Needs ${item.price} XP.`)
        return
      }
    }

    // Trigger Number Modal for Custom Plate Decals
    if (item.id === 'decal-num-single') {
      setNumberModalMode('single')
      return
    }
    if (item.id === 'decal-num-double') {
      setNumberModalMode('double')
      return
    }

    // Standard Equipment Logic
    if (item.type === 'background') {
      updateAvatar({ background: avatar.background === item.value ? null : item.value })
    } else if (item.type === 'decal') {
      updateAvatar({ decal: avatar.decal === item.value ? null : item.value, customNumber: null })
    } else if (item.type === 'accessory') {
      updateAvatar({ accessory: avatar.accessory === item.value ? null : item.value })
    }

    showToast(`${isOwned ? 'Equipped' : 'Unlocked'} ${item.name}!`)
  }

  const handleApplyNumber = () => {
    if (!digitInput) return
    if (numberModalMode === 'single' && !/^\d{1}$/.test(digitInput)) {
      showToast('Please enter a single digit (0-9).')
      return
    }
    if (numberModalMode === 'double' && !/^\d{2}$/.test(digitInput)) {
      showToast('Please enter exactly 2 digits (00-99).')
      return
    }

    updateAvatar({
      decal: numberModalMode === 'single' ? 'decal-num-single' : 'decal-num-double',
      customNumber: digitInput
    })

    setNumberModalMode(null)
    setDigitInput('')
    showToast(`Equipped Number ${digitInput}!`)
  }

  return (
    <div className="shop-modal-overlay">
      <div className="shop-modal-container">
        <button className="shop-close-btn" onClick={onClose}>✕</button>

        {/* {message && <div className="shop-toast-notification">{message}</div>} */}

        <div className="shop-header">
          <h2>Cosmetic Shop</h2>
          <div className="shop-xp-badge">
            <span>{xp} XP Available</span>
          </div>
        </div>

        <div className="shop-body">
          {/* Live Preview */}
          <div className="shop-preview-pane">
            <h3>Live Preview</h3>
            <AvatarImage avatar={avatar} size={220} />
          </div>

          {/* Shop Controls */}
          <div className="shop-items-pane">
            <div className="shop-tabs">
              <button 
                className={`shop-tab ${activeTab === 'background' ? 'active' : ''}`}
                onClick={() => setActiveTab('background')}
              >
                <span />
                Backgrounds
              </button>
              <button 
                className={`shop-tab ${activeTab === 'decal' ? 'active' : ''}`}
                onClick={() => setActiveTab('decal')}
              >
                <span />
                Decals
              </button>
              <button 
                className={`shop-tab ${activeTab === 'accessory' ? 'active' : ''}`}
                onClick={() => setActiveTab('accessory')}
              >
                <span />
                Accessories
              </button>
            </div>

            <div className="shop-grid">
              {filteredItems.map((item) => {
                const isOwned = avatar.unlockedItems.includes(item.id)
                const isEquipped = avatar.background === item.value || avatar.decal === item.value || avatar.accessory === item.value

                return (
                  <div key={item.id} className={`shop-card ${isEquipped ? 'equipped' : ''}`}>
                    <div className="shop-card-header">
                      <h4>{item.name}</h4>
                      {isEquipped && <span className="equipped-tag">Equipped</span>}
                    </div>
                    <p className="shop-card-desc">{item.description}</p>
                    
                    <button 
                      className={`shop-buy-btn ${isOwned ? 'equip-mode' : ''}`}
                      onClick={() => handlePurchaseOrEquip(item)}
                    >
                      {isOwned ? (isEquipped ? 'Unequip' : 'Equip') : `Buy for ${item.price} XP`}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Number Modal Popup */}
        {numberModalMode && (
          <div className="number-modal-overlay">
            <div className="number-modal">
              <h3>{numberModalMode === 'single' ? 'Enter Single Digit' : 'Enter Double Digit'}</h3>
              <p className="number-modal-subtitle">
                {numberModalMode === 'single' ? '(0-9)' : '(00-99)'}
              </p>
              <input 
                type="text" 
                maxLength={numberModalMode === 'single' ? 1 : 2}
                value={digitInput} 
                onChange={(e) => setDigitInput(e.target.value)}
                placeholder={numberModalMode === 'single' ? '7' : '99'}
                autoFocus
              />
              <div className="number-modal-actions">
                <button className="confirm-btn" onClick={handleApplyNumber}>Apply Decal</button>
                <button className="cancel-btn" onClick={() => setNumberModalMode(null)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}