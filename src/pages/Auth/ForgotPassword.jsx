import { useState } from 'react'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../../services/authService'
import '../../styles/auth.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await forgotPassword(email.trim())
      setSent(true)
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="google-logo">
          <span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span>
        </div>

        <h1 className="auth-title">Forgot password?</h1>
        <p className="auth-subtitle">
          Enter your email and we&apos;ll send you a link to reset your password.
        </p>

        {error && <div className="global-error">{error}</div>}

        {sent ? (
          <>
            <div className="global-success">
              If an account exists for <strong>{email}</strong>, a reset link is on its way.
              Check your inbox (and spam folder). The link is valid for 15 minutes.
            </div>
            <div className="auth-actions">
              <Link to="/login" className="btn-text">Back to login</Link>
              <button
                type="button"
                className="btn-primary"
                onClick={() => setSent(false)}
              >
                Resend
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-input"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
              <label className="form-label">Email*</label>
            </div>

            <div className="auth-actions">
              <Link to="/login" className="btn-text">Back to login</Link>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Sending...' : 'Send link'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}