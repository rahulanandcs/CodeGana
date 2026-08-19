import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface AvatarState {
  primaryColor: 'R' | 'O' | 'Y' | 'G' | 'B' | 'I' | 'V'
  secondaryColor: 'R' | 'O' | 'Y' | 'G' | 'B' | 'I' | 'V'
  tertiaryColor: 'R' | 'O' | 'Y' | 'G' | 'B' | 'I' | 'V'
  background: string | null     // Spiky explosion background class
  decal: string | null          // Vinyl decal type
  customNumber: string | null   // Typed custom number (e.g. "7" or "99")
  accessory: string | null      // Selected Accessory
  unlockedItems: string[]       // Unlocked item IDs
}

interface AvatarContextType {
  avatar: AvatarState
  updateAvatar: (updates: Partial<AvatarState>) => void
  resetAvatar: () => void
  buyItem: (itemId: string, price: number, xp: number, setXp: (cb: (prev: number) => number) => void) => boolean
}

const defaultAvatar: AvatarState = {
  primaryColor: 'R',
  secondaryColor: 'R',
  tertiaryColor: 'R',
  background: null,
  decal: null,
  customNumber: null,
  accessory: null,
  unlockedItems: []
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined)

export function AvatarProvider({ children }: { children: ReactNode }) {
  const [avatar, setAvatar] = useState<AvatarState>(defaultAvatar)

  useEffect(() => {
    const saved = localStorage.getItem('codegana-avatar')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setAvatar(prev => ({ ...prev, ...parsed }))
      } catch (error) {
        console.error('Failed to load avatar:', error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('codegana-avatar', JSON.stringify(avatar))
  }, [avatar])

  const updateAvatar = (updates: Partial<AvatarState>) => {
    setAvatar(prev => ({ ...prev, ...updates }))
  }

  const resetAvatar = () => {
    setAvatar(defaultAvatar)
    localStorage.removeItem('codegana-avatar')
  }

  const buyItem = (
    itemId: string, 
    price: number, 
    xp: number, 
    setXp: (cb: (prev: number) => number) => void
  ): boolean => {
    if (avatar.unlockedItems.includes(itemId)) return true;
    if (xp < price) return false;

    setXp(prev => prev - price);
    setAvatar(prev => ({
      ...prev,
      unlockedItems: [...prev.unlockedItems, itemId]
    }));
    return true;
  }

  return (
    <AvatarContext.Provider value={{ avatar, updateAvatar, resetAvatar, buyItem }}>
      {children}
    </AvatarContext.Provider>
  )
}

export function useAvatar() {
  const context = useContext(AvatarContext)
  if (!context) {
    throw new Error('useAvatar must be used within AvatarProvider')
  }
  return context
}