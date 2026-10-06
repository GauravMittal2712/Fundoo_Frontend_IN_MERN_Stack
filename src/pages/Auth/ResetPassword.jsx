import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { resetPassword } from '../../services/authService'
import { getPasswordError, PASSWORD_HINT } from '../../utils/password'
import '../../styles/auth.css'

export default function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({ password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' })
  }

  const validate = () => {
    const errs = {}
    const passwordError = getPasswordError(form.password)
    if (passwordError) errs.password = passwordError
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match'
    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!validate()) return

    setLoading(true)
    try {
      await resetPassword(token, form.password)
      setDone(true)
      setTimeout(() => navigate('/login'), 2500)
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not reset password. Please try again.')
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

        <h1 className="auth-title">Reset password</h1>
        <p className="auth-subtitle">Choose a new password for your Fundoo account.</p>

        {error && (
          <div className="global-error">
            {error}{' '}
            <Link to="/forgot-password" className="btn-text">Request a new link</Link>
          </div>
        )}

        {done ? (
          <>
            <div className="global-success">
              Password reset successful. Redirecting you to login...
            </div>
            <div className="auth-actions">
              <Link to="/login" className="btn-text">Go to login</Link>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className={`form-input ${fieldErrors.password ? 'error' : ''}`}
                placeholder=" "
                value={form.password}
                onChange={handleChange}
                required
                autoFocus
              />
              <label className="form-label">New password*</label>
              {fieldErrors.password && <p className="error-text">{fieldErrors.password}</p>}
              <p className="helper-text">{PASSWORD_HINT}</p>
            </div>

            <div className="form-group">
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                className={`form-input ${fieldErrors.confirmPassword ? 'error' : ''}`}
                placeholder=" "
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              <label className="form-label">Confirm password*</label>
              {fieldErrors.confirmPassword && (
                <p className="error-text">{fieldErrors.confirmPassword}</p>
              )}
            </div>

            <label className="show-password">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>

            <div className="auth-actions">
              <Link to="/login" className="btn-text">Back to login</Link>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Saving...' : 'Reset password'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}