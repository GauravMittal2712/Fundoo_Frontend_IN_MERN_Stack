import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ToastContext } from './contexts'

const DEFAULT_DURATION = 3500
const ERROR_DURATION = 5000
const MAX_VISIBLE = 4

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])
  const nextId = useRef(0)
  const timers = useRef(new Map())

  const dismiss = useCallback((id) => {
    clearTimeout(timers.current.get(id))
    timers.current.delete(id)
    setToasts((list) => list.filter((t) => t.id !== id))
  }, [])

  const show = useCallback(
    (message, type = 'info', duration = DEFAULT_DURATION) => {
      if (!message) return null
      nextId.current += 1
      const id = nextId.current
      setToasts((list) => [...list, { id, message, type }].slice(-MAX_VISIBLE))
      if (duration > 0) timers.current.set(id, setTimeout(() => dismiss(id), duration))
      return id
    },
    [dismiss],
  )

  // Clear pending timers if the provider ever unmounts
  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach((t) => clearTimeout(t))
  }, [])

  // Stable object: safe to put in other hooks' dependency arrays
  const api = useMemo(
    () => ({
      show,
      dismiss,
      success: (message, duration) => show(message, 'success', duration),
      error: (message, duration = ERROR_DURATION) => show(message, 'error', duration),
      info: (message, duration) => show(message, 'info', duration),
    }),
    [show, dismiss],
  )

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="toast-viewport" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`} role={t.type === 'error' ? 'alert' : 'status'}>
            <span className="toast-message">{t.message}</span>
            <button type="button" className="toast-close" aria-label="Dismiss" onClick={() => dismiss(t.id)}>
              &times;
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
