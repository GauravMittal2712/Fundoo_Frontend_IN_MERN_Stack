import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../services/authService'
import { useAuth } from '../../hooks/useAuth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

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
            <a href="#" style={styles.link} onClick={(e) => e.preventDefault()}>
              forgot Password?
            </a>
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
    background: '#fff',
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: 450,
    border: '1px solid #dadce0',
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
    color: '#202124',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#202124',
    marginBottom: 32,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    display: 'block',
    fontSize: 14,
    color: '#5f6368',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 52,
    padding: '0 15px',
    fontSize: 16,
    border: '1px solid #dadce0',
    borderRadius: 4,
    outline: 'none',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    color: '#202124',
    marginBottom: 16,
    cursor: 'pointer',
  },
  link: {
    color: '#1a73e8',
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
    background: '#1a73e8',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    padding: '10px 24px',
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
  },
  error: {
    background: '#fce8e6',
    color: '#d93025',
    padding: '12px 16px',
    borderRadius: 4,
    fontSize: 14,
    marginBottom: 20,
  },
}