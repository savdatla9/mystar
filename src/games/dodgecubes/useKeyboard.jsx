import { useEffect, useRef } from 'react'

export default function useKeyboard() {
  const keys = useRef({ up: 0, down: 0, left: 0, right: 0 })

  useEffect(() => {
    const toDir = (key, v) => {
      if (key === 'ArrowUp' || key === 'w' || key === 'W') keys.current.up = v
      if (key === 'ArrowDown' || key === 's' || key === 'S') keys.current.down = v
      if (key === 'ArrowLeft' || key === 'a' || key === 'A') keys.current.left = v
      if (key === 'ArrowRight' || key === 'd' || key === 'D') keys.current.right = v
    }

    const onDown = (e) => toDir(e.key, 1)
    const onUp = (e) => toDir(e.key, 0)

    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
    }
  }, [])

  return keys
}