import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/constants'

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '25vh' }}>
      <h1 style={{ fontSize: 48, fontWeight: 400, marginBottom: 8 }}>404</h1>
      <p style={{ marginBottom: 24, color: '#5f6368' }}>This page doesn&apos;t exist.</p>
      <Link to={ROUTES.NOTES}>Go to your notes</Link>
    </div>
  )
}
