import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAvatar } from '../../context/AvatarContext'
import AvatarImage from '../CharacterCreator/AvatarImage'
import AvatarShopModal from '../CharacterCreator/AvatarShopModal'
import './AvatarHeader.css'

type AvatarHeaderProps = {
  xp: number
  setXp: React.Dispatch<React.SetStateAction<number>>
}

export default function AvatarHeader({ xp, setXp }: AvatarHeaderProps) {
  const { avatar } = useAvatar()
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)
  const [showShop, setShowShop] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown])

  const handleOpenCustomize = () => {
    setShowDropdown(false)
    navigate('/customize') // Opens Customize Page
  }

  const handleOpenProfile = () => {
    setShowDropdown(false)
    navigate('/profile') // Opens Profile Page
  }

  const handleOpenShop = () => {
    setShowDropdown(false)
    setShowShop(true)
  }

  return (
    <div className="avatar-header-wrapper" ref={dropdownRef}>
      <button
        className="avatar-header-button"
        onClick={() => setShowDropdown(!showDropdown)}
        aria-label="User profile menu"
      >
        <AvatarImage avatar={avatar} size={48} className="avatar-header-mini" />
      </button>

      {showDropdown && (
        <div className="avatar-dropdown">
          <button className="avatar-dropdown-item" onClick={handleOpenCustomize}>
            <span className="shape-icon shape-pencil" />
            <span>Customize Avatar</span>
          </button>

          <button className="avatar-dropdown-item shop-item-highlight" onClick={handleOpenShop}>
            <span className="shape-icon shape-store" />
            <span>Shop</span>
          </button>

          <div className="avatar-dropdown-divider" />

          <button className="avatar-dropdown-item" onClick={handleOpenProfile}>
            <span className="shape-icon shape-plain" />
            <span>Profile</span>
          </button>
        </div>
      )}

      {showShop && (
        <AvatarShopModal 
          xp={xp} 
          setXp={setXp} 
          onClose={() => setShowShop(false)} 
        />
      )}
    </div>
  )
}