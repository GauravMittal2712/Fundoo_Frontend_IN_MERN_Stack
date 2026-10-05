import { useContext } from 'react'
import { ToastContext } from '../context/contexts'

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export default useToast
