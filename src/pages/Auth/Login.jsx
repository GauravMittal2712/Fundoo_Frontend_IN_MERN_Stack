import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../services/authService'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import GoogleSignInButton from '../../components/common/GoogleSignInButton/GoogleSignInButton'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await loginUser({ email, password })
      const data = res?.data?.data || res?.data

      if (!data?.token || !data?.user) {
        throw new Error('Invalid response from server')
      }

      login(data.user, data.token)
      toast.success('Welcome back!')
      navigate('/notes')
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Invalid email or password'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = ({ user, token }) => {
    login(user, token)
    toast.success('Signed in with Google')
    navigate('/notes')
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        
        {/* Google Logo */}
        <div style={styles.logo}>
          <span style={{ color: '#4285F4' }}>G</span>
          <span style={{ color: '#EA4335' }}>o</span>
          <span style={{ color: '#FBBC05' }}>o</span>
          <span style={{ color: '#4285F4' }}>g</span>
          <span style={{ color: '#34A853' }}>l</span>
          <span style={{ color: '#EA4335' }}>e</span>
        </div>

        <h1 style={styles.title}>Login</h1>
        <p style={styles.subtitle}>Use your Fundoo Account</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          
          {/* Email */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Email or phone*</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          {/* Password */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Password*</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          {/* Show Password */}
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              style={{ marginRight: 8 }}
            />
            Show Password
          </label>

          {/* Forgot Password */}
          <div style={{ marginBottom: 32 }}>
             <Link to="/forgot-password" style={styles.link}>
              Forgot password?
            </Link>
          </div>

          {/* Bottom Actions */}
          <div style={styles.actions}>
            <Link to="/signup" style={styles.link}>
              Create account
            </Link>

            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <GoogleSignInButton onSuccess={handleGoogleSuccess} onError={setError} />
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--bg)',
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: 450,
    border: '1px solid var(--border)',
    borderRadius: 8,
    padding: '48px 40px 36px',
  },
  logo: {
    fontSize: 22,
    fontWeight: 500,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 400,
    color: 'var(--text-primary)',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'var(--text-primary)',
    marginBottom: 32,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    display: 'block',
    fontSize: 14,
    color: 'var(--text-secondary)',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 52,
    padding: '0 15px',
    fontSize: 16,
    border: '1px solid var(--border)',
    borderRadius: 4,
    outline: 'none',
    background: 'var(--input-bg)',
    color: 'var(--text-primary)',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    color: 'var(--text-primary)',
    marginBottom: 16,
    cursor: 'pointer',
  },
  link: {
    color: 'var(--accent)',
    fontSize: 14,
    fontWeight: 500,
    textDecoration: 'none',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    background: 'var(--accent)',
    color: 'var(--on-accent)',
    border: 'none',
    borderRadius: 4,
    padding: '10px 24px',
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
  },
  error: {
    background: 'var(--error-bg)',
    color: 'var(--error-text)',
    padding: '12px 16px',
    borderRadius: 4,
    fontSize: 14,
    marginBottom: 20,
  },
}