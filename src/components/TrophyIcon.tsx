// export function TrophyIcon({ size = 60 }: { size?: number }) {
//   return (
//     <svg width={size} height={size * 1.2} viewBox="0 0 60 72" xmlns="http://www.w3.org/2000/svg">
//       <defs>
//         <linearGradient id="trophyGold" x1="0%" y1="0%" x2="100%" y2="100%">
//           <stop offset="0%" stopColor="#fff4b8" />
//           <stop offset="45%" stopColor="#ffd700" />
//           <stop offset="100%" stopColor="#e8c503" />
//         </linearGradient>
//         <linearGradient id="trophyBase" x1="0%" y1="0%" x2="0%" y2="100%">
//           <stop offset="0%" stopColor="#e8c15a" />
//           <stop offset="100%" stopColor="#dab550" />
//         </linearGradient>
//       </defs>

//       {/* Handles */}
//       <path
//         d="M14 14 C2 14, 2 30, 12 34 C15 35.5, 18 34, 19 32"
//         fill="none"
//         stroke="url(#trophyGold)"
//         strokeWidth="4"
//         strokeLinecap="round"
//       />
//       <path
//         d="M46 14 C58 14, 58 30, 48 34 C45 35.5, 42 34, 41 32"
//         fill="none"
//         stroke="url(#trophyGold)"
//         strokeWidth="4"
//         strokeLinecap="round"
//       />

//       {/* Cup */}
//       <path
//         d="M16 12 H44 V26 C44 36, 36 42, 30 42 C24 42, 16 36, 16 26 Z"
//         fill="url(#trophyGold)"
//         stroke="#8b6914"
//         strokeWidth="1"
//       />
//       {/* Cup rim highlight */}
//       <rect x="15" y="10" width="30" height="4" rx="2" fill="#fff4b8" />
//       <rect x="15" y="10" width="30" height="4" rx="2" fill="url(#trophyGold)" opacity="0.6" />

//       {/* Stem */}
//       <path d="M27 42 H33 V50 H27 Z" fill="url(#trophyBase)" />
//       <path d="M23 50 H37 L34 55 H26 Z" fill="url(#trophyBase)" />

//       {/* Base */}
//       <rect x="16" y="55" width="28" height="6" rx="1" fill="url(#trophyBase)" stroke="#5c4408" strokeWidth="0.5" />
//       <rect x="12" y="61" width="36" height="7" rx="1.5" fill="url(#trophyBase)" stroke="#5c4408" strokeWidth="0.5" />

//       {/* Star detail */}
//       <path
//         d="M30 18 L31.8 21.6 L35.8 22.1 L32.9 24.9 L33.6 28.9 L30 27 L26.4 28.9 L27.1 24.9 L24.2 22.1 L28.2 21.6 Z"
//         fill="#fff4b8"
//         opacity="0.85"
//       />
//     </svg>
//   );
// }
