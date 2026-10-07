import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import useToast from '../../../hooks/useToast'
import useClickOutside from '../../../hooks/useClickOutside'
import { getFullName, getInitials } from '../../../utils/helpers'
import { ROUTES } from '../../../utils/constants'
import { IconLogout, IconTrash } from '../../common/Icons/Icons'
import DeleteAccountModal from '../../profile/DeleteAccountModal/DeleteAccountModal'
import './ProfileMenu.css'

export default function ProfileMenu() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()
  const [open, setOpen] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
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
    toast.info('Signed out')
    navigate(ROUTES.LOGIN, { replace: true })
  }

  const openDeleteAccount = () => {
    close()
    setShowDelete(true)
  }

  // The server has already deleted everything: just clear the local login and leave.
  const handleAccountDeleted = () => {
    setShowDelete(false)
    logout()
    toast.success('Your account has been deleted')
    navigate(ROUTES.LOGIN, { replace: true })
  }

  const initials = getInitials(user) || '?'
  const fullName = getFullName(user)

  return (
    <>
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

          <div className="profile-divider" role="separator" />

          <button type="button" className="profile-delete" role="menuitem" onClick={openDeleteAccount}>
            <IconTrash />
            <span>Delete account</span>
          </button>
        </div>
      )}
    </div>

    {showDelete && (
      <DeleteAccountModal onClose={() => setShowDelete(false)} onDeleted={handleAccountDeleted} />
    )}
    </>
  )
}