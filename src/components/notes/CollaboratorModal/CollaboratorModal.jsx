import { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import * as collaboratorService from '../../../services/collaboratorService'
import { getErrorMessage, getInitials } from '../../../utils/helpers'
import { IconCheck, IconClose, IconPersonAdd } from '../../common/Icons/Icons'
import Modal from '../../common/Modal/Modal'

export default function CollaboratorModal({ note, onClose }) {
  const { user } = useAuth()
  const [list, setList] = useState([])
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    collaboratorService
      .getCollaborators(note._id)
      .then((data) => !cancelled && setList(data))
      .catch((err) => !cancelled && setError(getErrorMessage(err, 'Failed to load collaborators')))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [note._id])

  const submit = async (e) => {
    e.preventDefault()
    const value = email.trim().toLowerCase()
    if (!value) return
    setError('')
    try {
      await collaboratorService.addCollaborator(note._id, value)
      setEmail('')
      setList(await collaboratorService.getCollaborators(note._id))
    } catch (err) {
      setError(getErrorMessage(err, 'Could not add collaborator'))
    }
  }

  const remove = async (c) => {
    try {
      await collaboratorService.removeCollaborator(c._id)
      setList((prev) => prev.filter((x) => x._id !== c._id))
    } catch (err) {
      setError(getErrorMessage(err, 'Could not remove collaborator'))
    }
  }

  return (
    <Modal className="collab-modal" onClose={onClose}>
      <h3>Collaborators</h3>
      <div className="collab-row">
        <span className="collab-avatar">{getInitials(user) || '?'}</span>
        <div className="collab-info">
          <strong>{user?.firstName} {user?.lastName} (Owner)</strong>
          <small>{user?.email}</small>
        </div>
      </div>

      {loading && <p className="empty-text small">Loading...</p>}
      {list.map((c) => {
        const name = c.userId?.firstName ? `${c.userId.firstName} ${c.userId.lastName || ''}` : c.email
        return (
          <div className="collab-row" key={c._id}>
            <span className="collab-avatar">{(name[0] || '?').toUpperCase()}</span>
            <div className="collab-info">
              <strong>{name}</strong>
              <small>{c.email}</small>
            </div>
            <button className="icon-btn small" title="Remove" onClick={() => remove(c)}>
              <IconClose />
            </button>
          </div>
        )
      })}

      <form className="collab-add" onSubmit={submit}>
        <IconPersonAdd className="collab-add-icon" />
        <input
          type="email"
          placeholder="Person or email to share with"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="icon-btn small" title="Add">
          <IconCheck />
        </button>
      </form>
      {error && <p className="collab-error">{error}</p>}

      <div className="modal-actions">
        <button className="text-btn primary" onClick={onClose}>Done</button>
      </div>
    </Modal>
  )
}
