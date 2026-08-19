import { useEffect } from 'react'
import CharacterCreator from '../components/CharacterCreator/CharacterCreator'
// // // Route: /profile
export default function ProfilePage() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <div />
}