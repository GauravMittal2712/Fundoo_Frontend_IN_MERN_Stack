import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  )
}
