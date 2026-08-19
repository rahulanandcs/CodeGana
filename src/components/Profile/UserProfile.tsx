import { useState, useEffect } from 'react'
import { useAvatar } from '../../context/AvatarContext'
import AvatarImage from '../CharacterCreator/AvatarImage'
import './UserProfile.css'

type UserProfileProps = {
  lifetimeXp: number
  streak: number
  completedCount: number // Pass completed.size here
}

export default function UserProfile({ lifetimeXp, streak, completedCount }: UserProfileProps) {
  const { avatar } = useAvatar()
  
  // Username State & Persistence
  const [username, setUsername] = useState<string>('')
  const [isEditing, setIsEditing] = useState(false)
  const [tempName, setTempName] = useState('')

  useEffect(() => {
    // Initialize or fetch username on mount
    const savedName = localStorage.getItem('codegana-username')
    if (savedName) {
      setUsername(savedName)
    } else {
      const generated = `VibeCoder${Math.floor(1000 + Math.random() * 9000)}`
      setUsername(generated)
      localStorage.setItem('codegana-username', generated)
    }
  }, [])

  const handleOpenEdit = () => {
    setTempName(username)
    setIsEditing(true)
  }

  const handleSaveName = () => {
    if (tempName.trim().length > 0) {
      setUsername(tempName.trim())
      localStorage.setItem('codegana-username', tempName.trim())
    }
    setIsEditing(false)
  }

  // Achievement Data Structure using CSS Shape Classes
  const achievements = [
    {
      id: 'ach-xp-100',
      title: 'Novice Coder',
      description: 'Earn 100 Lifetime XP',
      iconClass: 'ach-shape-star',
      current: lifetimeXp,
      max: 100,
      color: '#fde047'
    },
    {
      id: 'ach-xp-500',
      title: 'Logic Master',
      description: 'Earn 500 Lifetime XP',
      iconClass: 'ach-shape-lightning',
      current: lifetimeXp,
      max: 500,
      color: '#b2f65f'
    },
    {
      id: 'ach-streak-3',
      title: 'Wildfire',
      description: 'Reach a 3 Day Streak',
      iconClass: 'ach-shape-fire',
      current: streak,
      max: 3,
      color: '#ff5722'
    },
    {
      id: 'ach-chal-5',
      title: 'Problem Solver',
      description: 'Complete 5 Challenges',
      iconClass: 'ach-shape-target',
      current: completedCount,
      max: 5,
      color: '#00f2fe'
    }
  ]

  return (
    <div className="profile-page-container">
      <div className="profile-content">
        
        {/* TOP SECTION: Avatar & Username */}
        <div className="profile-header-section">
          <div className="profile-avatar-wrapper">
            <AvatarImage avatar={avatar} size={180} />
          </div>
          
          <div className="profile-username-row">
            <h1 className="profile-username">{username}</h1>
            <button className="edit-name-btn" onClick={handleOpenEdit} aria-label="Edit Username">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
              </svg>
            </button>
          </div>
          <p className="profile-join-date">Joined August 2026</p>
        </div>

        <div className="profile-divider"></div>

        {/* BOTTOM SECTION: Achievements */}
        <div className="achievements-section">
          <h2>Achievements</h2>
          
          <div className="achievements-list">
            {achievements.map(ach => {
              const progressPercent = Math.min((ach.current / ach.max) * 100, 100)
              const isCompleted = ach.current >= ach.max

              return (
                <div key={ach.id} className={`achievement-card ${isCompleted ? 'completed' : ''}`}>
                  <div className="achievement-icon-wrapper">
                    {/* Render the pure CSS shape here */}
                    <div className={`achievement-shape ${ach.iconClass}`}></div>
                  </div>
                  
                  <div className="achievement-details">
                    <h3>{ach.title}</h3>
                    <p>{ach.description}</p>
                    
                    <div className="achievement-progress-container">
                      <div className="progress-bar-bg">
                        <div 
                          className="progress-bar-fill" 
                          style={{ 
                            width: `${progressPercent}%`, 
                            backgroundColor: isCompleted ? '#ffd700' : ach.color 
                          }}
                        ></div>
                      </div>
                      <span className="progress-text">
                        {ach.current} / {ach.max}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* EDIT USERNAME MODAL */}
      {isEditing && (
        <div className="name-modal-overlay">
          <div className="name-modal">
            <h3>Edit Username</h3>
            <input 
              type="text" 
              value={tempName} 
              onChange={(e) => setTempName(e.target.value)}
              maxLength={20}
              autoFocus
            />
            <div className="name-modal-actions">
              <button className="confirm-btn" onClick={handleSaveName}>Save</button>
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}