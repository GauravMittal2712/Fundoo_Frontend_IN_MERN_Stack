import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Loader from '../components/common/Loader/Loader'
import { ROUTES } from '../utils/constants'

// Login / signup pages: logged-in users are sent straight to their notes.
export default function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return <Loader />
  if (isAuthenticated) return <Navigate to={ROUTES.NOTES} replace />
  return children || <Outlet />
}
