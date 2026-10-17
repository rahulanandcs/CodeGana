// PNG Avatar Color System
// Maps color letters (R, O, Y, G, B, I, V) to hex colors

export const colorMap: Record<string, { name: string; hex: string }> = {
  'R': { name: 'Red', hex: 'rgb(233, 16, 16)' },
  'O': { name: 'Orange', hex: 'rgb(234, 158, 17)' },
  'Y': { name: 'Yellow', hex: 'rgb(235, 235, 14)' },
  'G': { name: 'Green', hex: 'rgb(10, 205, 10)' },
  'B': { name: 'Blue', hex: 'rgb(11, 107, 234)' },
  'I': { name: 'Purple', hex: 'rgb(170, 11, 238)' },
  'V': { name: 'Pink', hex: '#de0bb7' }
}

export const colorOrder = ['R', 'O', 'Y', 'G', 'B', 'I', 'V'] as const

// Let Vite include every color combination and resolve its production URL.
const avatarImages = import.meta.glob<string>('../images/profileAvatars/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
})

// Get PNG filename from color combination
export function getAvatarFileName(
  primary: string,
  secondary: string,
  tertiary: string
): string {
  return `${primary}${secondary}${tertiary}`
}

// Get full image path
export function getAvatarImagePath(
  primary: string,
  secondary: string,
  tertiary: string
): string {
  const fileName = getAvatarFileName(primary, secondary, tertiary)
  return avatarImages[`../images/profileAvatars/${fileName}.png`]
}