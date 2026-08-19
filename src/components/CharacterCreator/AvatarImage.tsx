import type { AvatarState } from '../../context/AvatarContext'
import { getAvatarImagePath } from '../../data/avatarAssets'
import './ExplosionAndDecals.css'

interface AvatarImageProps {
  avatar: AvatarState
  size?: number
  className?: string
}

// Shared anchor boxes for decals and backgrounds
// Backgrounds wrap the entire avatar with shorter, sharp spikes
const BACKGROUND_BOX: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  zIndex: 1,
  overflow: 'visible',
  pointerEvents: 'none',
  top: '2%'
}

// Decals positioned at the bottom third
const DECAL_BOX: React.CSSProperties = {
  position: 'absolute',
  bottom: '8%',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 3,
  width: '55%',
  height: '28%',
  overflow: 'visible',
  pointerEvents: 'none',
}

export default function AvatarImage({ avatar, size = 200, className = '' }: AvatarImageProps) {
  const imagePath = getAvatarImagePath(
    avatar.primaryColor,
    avatar.secondaryColor,
    avatar.tertiaryColor
  )

  return (
    <div
      className="avatar-wrapper"
      style={{ width: size, height: size, position: 'relative', display: 'inline-block' }}
    >
      {/* 1. Scene Background — SVG with consistent scaling */}
      {avatar.background === 'bg-day' && (
        <svg viewBox="0 0 100 100" style={BACKGROUND_BOX}>
          <defs>
            <linearGradient id="skyDay" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6ec6ff" />
              <stop offset="100%" stopColor="#a7e0ff" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="100" height="100" fill="url(#skyDay)" />
          {/* sun */}
          <circle cx="50" cy="26" r="13" fill="#ffe066" />
          <circle cx="50" cy="26" r="18" fill="#ffe066" opacity="0.35" />
          {/* rolling hill */}
          {/* <ellipse cx="15" cy="66" rx="30" ry="16" fill="#6bc94a" /> */}
          {/* <ellipse cx="88" cy="70" rx="26" ry="14" fill="#6bc94a" /> */}
          {/* grass ground */}
          <rect x="0" y="63" width="100" height="37" fill="#7ed957" />
          <rect x="0" y="88" width="100" height="12" fill="#5cb946" />
        </svg>
      )}

      {avatar.background === 'bg-night' && (
        <svg viewBox="0 0 100 100" style={BACKGROUND_BOX}>
          <defs>
            <linearGradient id="skyNight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0b1533" />
              <stop offset="100%" stopColor="#16205c" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="100" height="100" fill="url(#skyNight)" />
          {/* stars */}
          <circle cx="20" cy="18" r="1.2" fill="#f5f3e7" />
          <circle cx="34" cy="10" r="1" fill="#f5f3e7" />
          <circle cx="70" cy="14" r="1.4" fill="#f5f3e7" />
          <circle cx="82" cy="28" r="1" fill="#f5f3e7" />
          <circle cx="12" cy="34" r="1" fill="#f5f3e7" />
          {/* crescent moon */}
          <circle cx="72" cy="24" r="11" fill="#f5f3e7" />
          <circle cx="76" cy="20" r="10" fill="#16205c" />
          {/* desert ground */}
          <rect x="0" y="66" width="100" height="34" fill="#b8894f" />
          <rect x="0" y="90" width="100" height="10" fill="#8a6236" />
          {/* cacti */}
          <rect x="22" y="60" width="7" height="24" rx="3" fill="#2f6b3a" />
          <rect x="15" y="66" width="6" height="12" rx="3" fill="#2f6b3a" />
          <rect x="29" y="70" width="6" height="10" rx="3" fill="#2f6b3a" />
          <rect x="62" y="64" width="7" height="20" rx="3" fill="#2f6b3a" />
        </svg>
      )}

      {avatar.background === 'bg-twilight' && (
        <svg viewBox="0 0 100 100" style={BACKGROUND_BOX}>
          <defs>
            <linearGradient id="skyTwilight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2b2560" />
              <stop offset="55%" stopColor="#6a3d8f" />
              <stop offset="100%" stopColor="#d4658a" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="100" height="100" fill="url(#skyTwilight)" />
          {/* low glowing sun */}
          <circle cx="50" cy="48" r="12" fill="#ffb454" />
          <circle cx="50" cy="48" r="17" fill="#ffb454" opacity="0.3" />
          {/* forest ground */}
          <rect x="0" y="66" width="100" height="34" fill="#14210f" />
          <rect x="0" y="90" width="100" height="10" fill="#0d160a" />
          {/* pine trees */}
          <polygon points="14,66 22,44 30,66" fill="#0f1f0c" />
          <polygon points="32,66 40,38 48,66" fill="#0f1f0c" />
          <polygon points="52,66 58,46 64,66" fill="#0f1f0c" />
          <polygon points="68,66 76,40 84,66" fill="#0f1f0c" />
        </svg>
      )}

      {avatar.background === 'bg-dusk' && (
        <svg viewBox="0 0 100 100" style={BACKGROUND_BOX}>
          <defs>
            <linearGradient id="skyDusk" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3c2a4d" />
              <stop offset="50%" stopColor="#a15a6b" />
              <stop offset="100%" stopColor="#d98a5f" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="100" height="100" fill="url(#skyDusk)" />
          {/* hazy low sun */}
          <circle cx="50" cy="54" r="13" fill="#ffa552" opacity="0.85" />
          <circle cx="50" cy="54" r="18" fill="#ffa552" opacity="0.25" />
          {/* swamp ground */}
          <rect x="0" y="66" width="100" height="34" fill="#33502e" />
          <rect x="0" y="90" width="100" height="10" fill="#24391f" />
          {/* reeds */}
          <rect x="20" y="52" width="2.5" height="18" fill="#4a6b3a" />
          <circle cx="21.25" cy="51" r="2" fill="#4a6b3a" />
          <rect x="27" y="58" width="2.5" height="12" fill="#4a6b3a" />
          <circle cx="28.25" cy="57" r="1.6" fill="#4a6b3a" />
          <rect x="68" y="54" width="2.5" height="16" fill="#4a6b3a" />
          <circle cx="69.25" cy="53" r="1.8" fill="#4a6b3a" />
          <rect x="75" y="60" width="2.5" height="10" fill="#4a6b3a" />
          <circle cx="76.25" cy="59" r="1.5" fill="#4a6b3a" />
        </svg>
      )}

      {/* 2. Main Robot PNG */}
      <img
        src={imagePath}
        alt="Your Avatar"
        width={size}
        height={size}
        className={`avatar-image ${className}`}
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          position: 'relative',
          zIndex: 2,
        }}
      />

      {/* 3. Decal Layer — all decals share DECAL_BOX so they line up identically */}
      {avatar.decal === 'decal-flames' && (
        <svg viewBox="0 0 36 36" style={{ position: 'absolute',
            bottom: '3%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3,
            width: '21%',
            height: '21%',
            overflow: 'visible',
            pointerEvents: 'none'
            }}>
          <defs>
            <linearGradient id="flameOuter" x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#ea5a0c" />
              <stop offset="60%" stopColor="#f57c00" />
              <stop offset="100%" stopColor="#ff9800" />
            </linearGradient>
          </defs>

          {/* Outer body — rounded, leans right, pinches at the base like the emoji silhouette */}
          <path
            d="M17.5,1
              C15,6 10,10 9,16
              C8,21 9,26 12,29
              C11,25 12,21 14,19
              C13,24 15,28 19,30
              C24,32 29,28 29,22
              C29,18 27,15 25,13
              C26,16 25,19 23,20
              C24,15 21,10 17.5,1 Z"
            fill="url(#flameOuter)"
          />

          {/* Inner yellow flame — offset lower-left, matches the emoji's bright core */}
          <path
            d="M17,14
              C14,18 12,21 12,25
              C12,29 15,32 19,31
              C17,29 16,26 18,23
              C18,27 21,29 24,28
              C27,27 27,23 25,20
              C25,22 24,24 22,24
              C23,19 20,16 17,14 Z"
            fill="#ffc021"
          />
        </svg>
      )}

      {avatar.decal === 'decal-lightning' && (
        <svg viewBox="0 0 100 100" style={
          {
            position: 'absolute',
            bottom: '3%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3,
            width: '21%',
            height: '21%',
            overflow: 'visible',
            pointerEvents: 'none',
          }}>
          <polygon
            points="42,10 78,10 53,42 74,42 32,90 47,55 22,55"
            fill="#fde047"
            stroke="#e2bc22"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {avatar.decal === 'decal-stripes' && (
        <svg viewBox="0 0 100 100" style={{
          position: 'absolute',
          bottom: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          width: '51%',
          height: '46%',
          overflow: 'visible',
          pointerEvents: 'none'
        }}>
          <rect x="0" y="35" width="100" height="7" fill="#ffffff" />
          <rect x="0" y="58" width="100" height="7" fill="#ffffff" />
        </svg>
      )}

      {(avatar.decal === 'decal-num-single' || avatar.decal === 'decal-num-double') && avatar.customNumber && (
        <svg viewBox="0 0 100 100" style={{...DECAL_BOX}}>
          <g transform="rotate(0 50 50)">
            <rect
              x="15"
              y="50"
              width="70"
              height="60"
              rx="10"
              fill="#ffffff"
              stroke="#000000"
              strokeWidth="5"
            />
            <text
              x="50"
              y="80"
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="'java', monospace"
              fontWeight={900}
              fontSize={avatar.decal === 'decal-num-double' ? 34 : 40}
              fill="#000000"
            >
              {avatar.customNumber}
            </text>
          </g>
        </svg>
      )}

      {/* 4. Accessory Layer */}
      {avatar.accessory === 'acc-crown' && (
        <svg
          viewBox="0 0 100 60"
          style={{
            position: 'absolute',
            top: '-5%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 4,
            width: '30%',
            height: '20%',
            overflow: 'visible',
          }}
        >
          <polygon
            points="2,58 2,20 25,45 50,2 75,45 98,20 98,58"
            fill="#fde047"
            stroke="#dfc027"
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      )}

      {avatar.accessory === 'acc-visor' && (
        <svg
          viewBox="0 0 100 40"
          style={{
            position: 'absolute',
            top: '35%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 4,
            width: '50%',
            height: '14%',
            overflow: 'visible',
          }}
        >
          <rect
            x="2"
            y="4"
            width="96"
            height="32"
            rx="16"
            fill="#00f2fe"
            fillOpacity="0.95"
            stroke="#0b0b0f"
            strokeWidth="4"
          />
          <rect x="12" y="12" width="30" height="10" rx="5" fill="#ffffff" fillOpacity="0.35" />
        </svg>
      )}
    </div>
  )
}