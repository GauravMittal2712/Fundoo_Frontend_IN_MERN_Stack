import { useState } from 'react'
import Modal from '../../common/Modal/Modal'
import GoogleSignInButton from '../../common/GoogleSignInButton/GoogleSignInButton'
import { deleteAccount } from '../../../services/authService'
import { getErrorMessage } from '../../../utils/helpers'
import './DeleteAccountModal.css'

// Asks the person to confirm with their password (or Google) before deleting everything.
// onDeleted() runs after the server has deleted the account.
export default function DeleteAccountModal({ onClose, onDeleted }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [deleting, setDeleting] = useState(false)

  const confirmDelete = async (payload) => {
    setError('')
    setDeleting(true)
    try {
      await deleteAccount(payload)
      onDeleted()
    } catch (err) {
      setError(getErrorMessage(err, 'Could not delete your account. Please try again.'))
      setDeleting(false)
    }
  }

  const submit = (e) => {
    e.preventDefault()
    if (password && !deleting) confirmDelete({ password })
  }

  return (
    <Modal className="delete-account-modal" onClose={deleting ? undefined : onClose}>
      <form onSubmit={submit}>
        <h2 className="delete-account-title">Delete your account?</h2>
        <p className="delete-account-text">
          This permanently deletes your account, all your notes, labels and reminders, and removes
          you from every shared note. This cannot be undone.
        </p>

        {error && <div className="delete-account-error">{error}</div>}

        <label className="delete-account-label" htmlFor="delete-account-password">
          Enter your password to confirm
        </label>
        <input
          id="delete-account-password"
          type="password"
          className="delete-account-input"
          value={password}
          autoFocus
          autoComplete="current-password"
          disabled={deleting}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="delete-account-actions">
          <button type="button" className="delete-account-cancel" disabled={deleting} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="delete-account-danger" disabled={!password || deleting}>
            {deleting ? 'Deleting...' : 'Delete account'}
          </button>
        </div>

        {/* Signed up with Google? There is no password, so confirm with Google instead. */}
        <GoogleSignInButton onCredential={confirmDelete} onError={setError} />
      </form>
    </Modal>
  )
}
