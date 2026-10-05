import { useEffect, useRef } from 'react'
import { googleLogin } from '../../../services/authService'

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
const GSI_SRC = 'https://accounts.google.com/gsi/client' ;

// Load Google's script once, no matter how many buttons are mounted.
let scriptPromise
const loadGoogleScript = () => {
  if (window.google?.accounts?.id) return Promise.resolve()
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = GSI_SRC
      script.async = true
      script.defer = true
      script.onload = resolve
      script.onerror = () => {
        scriptPromise = undefined
        reject(new Error('Could not load Google sign-in'))
      }
      document.head.appendChild(script)
    })
  }
  return scriptPromise
}
export default function GoogleSignInButton({ onSuccess, onError, text = 'continue_with' }) {
  const containerRef = useRef(null)
  const onSuccessRef = useRef(onSuccess)
  const onErrorRef = useRef(onError)

  useEffect(() => {
    onSuccessRef.current = onSuccess
    onErrorRef.current = onError
  })

  useEffect(() => {
    if (!CLIENT_ID) return undefined
    let cancelled = false

    const handleCredential = async (response) => {
      try {
        const res = await googleLogin(response.credential)
        const data = res?.data?.data || res?.data
        if (!data?.token || !data?.user) throw new Error('Invalid response from server')
        onSuccessRef.current?.(data)
      } catch (err) {
        onErrorRef.current?.(
          err?.response?.data?.message || err?.message || 'Google sign-in failed'
        )
      }
    }

    loadGoogleScript()
      .then(() => {
        if (cancelled || !containerRef.current) return
        window.google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: handleCredential,
        })
        window.google.accounts.id.renderButton(containerRef.current, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text,
          shape: 'rectangular',
          logo_alignment: 'left',
          width: Math.min(containerRef.current.offsetWidth || 320, 400),
        })
      })
      .catch((err) => onErrorRef.current?.(err.message))

    return () => {
      cancelled = true
    }
  }, [text])

  if (!CLIENT_ID) return null

  return (
    <div style={{ marginTop: 24 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 16,
          color: 'var(--text-secondary, #5f6368)',
          fontSize: 14,
        }}
      >
        <span style={{ flex: 1, height: 1, background: 'var(--border, #dadce0)' }} />
        or
        <span style={{ flex: 1, height: 1, background: 'var(--border, #dadce0)' }} />
      </div>
      <div ref={containerRef} style={{ display: 'flex', justifyContent: 'center', minHeight: 44 }} />
    </div>
  )
}