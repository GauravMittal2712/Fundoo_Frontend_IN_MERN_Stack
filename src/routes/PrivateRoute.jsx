import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Loader from '../components/common/Loader/Loader'
import { ROUTES } from '../utils/constants'

// Only logged-in users get through; everyone else is sent to /login.
export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return <Loader />
  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />
  return children || <Outlet />
}
