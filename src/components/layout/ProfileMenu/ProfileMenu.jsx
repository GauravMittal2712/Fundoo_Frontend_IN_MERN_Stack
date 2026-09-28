import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import useClickOutside from '../../../hooks/useClickOutside'
import { getFullName, getInitials } from '../../../utils/helpers'
import { ROUTES } from '../../../utils/constants'
import { IconLogout } from '../../common/Icons/Icons'
import './ProfileMenu.css'

export default function ProfileMenu() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  const close = () => setOpen(false)
  useClickOutside(menuRef, close, open)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const handleSignOut = () => {
    close()
    logout()
    navigate(ROUTES.LOGIN, { replace: true })
  }

  const initials = getInitials(user) || '?'
  const fullName = getFullName(user)

  return (
    <div className="profile-menu" ref={menuRef}>
      <button
        type="button"
        className="avatar"
        title={fullName ? `Account: ${fullName}` : 'Account'}
        aria-label={fullName ? `Account: ${fullName}` : 'Account'}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {initials}
      </button>

      {open && (
        <div className="profile-panel" role="menu">
          <p className="profile-email">{user?.email}</p>
          <div className="profile-avatar-lg">{initials}</div>
          <p className="profile-greeting">Hi, {user?.firstName || 'there'}!</p>
          {fullName && <p className="profile-name">{fullName}</p>}

          <button type="button" className="profile-signout" role="menuitem" onClick={handleSignOut}>
            <IconLogout />
            <span>Sign out</span>
          </button>
        </div>
      )}
    </div>
  )
}
