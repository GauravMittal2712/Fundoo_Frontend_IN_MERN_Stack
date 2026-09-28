import { useEffect, useRef } from 'react'

// Calls `handler` when the user presses/taps anywhere outside `ref`'s element.
export default function useClickOutside(ref, handler, active = true) {
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  })

  useEffect(() => {
    if (!active) return undefined
    const listener = (e) => {
      if (ref.current && !ref.current.contains(e.target)) handlerRef.current(e)
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, active])
}
