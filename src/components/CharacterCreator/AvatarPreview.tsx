import { useAvatar } from '../../context/AvatarContext'
import AvatarImage from './AvatarImage'
import { colorMap } from '../../data/avatarAssets'

export default function AvatarPreview() {
  const { avatar } = useAvatar()

  return (
    <div className="avatar-preview-container">
      <div className="avatar-preview-title">
        <h2>Your Avatar</h2>
        {/* <p className="avatar-preview-subtitle">
          {avatar.primaryColor}{avatar.secondaryColor}{avatar.tertiaryColor}
        </p> */}
      </div>

      <div className="avatar-preview-display">
        {/* Avatar Image */}
        <AvatarImage avatar={avatar} size={350} className="avatar-preview-image" />
      </div>

      {/* Color Info */}
      <div className="avatar-preview-info">
        <div className="avatar-info-card">
          <span className="avatar-info-label">Primary</span>
          <div className="avatar-color-indicator" style={{ backgroundColor: colorMap[avatar.primaryColor].hex }}></div>
          <span className="avatar-info-value">{colorMap[avatar.primaryColor].name}</span>
        </div>

        <div className="avatar-info-card">
          <span className="avatar-info-label">Secondary</span>
          <div className="avatar-color-indicator" style={{ backgroundColor: colorMap[avatar.secondaryColor].hex }}></div>
          <span className="avatar-info-value">{colorMap[avatar.secondaryColor].name}</span>
        </div>

        <div className="avatar-info-card">
          <span className="avatar-info-label">Tertiary</span>
          <div className="avatar-color-indicator" style={{ backgroundColor: colorMap[avatar.tertiaryColor].hex }}></div>
          <span className="avatar-info-value">{colorMap[avatar.tertiaryColor].name}</span>
        </div>
      </div>
    </div>
  )
}