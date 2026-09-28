import { useState } from 'react'
import { getErrorMessage } from '../../../utils/helpers'
import { IconCheck, IconEdit, IconLabelTag, IconTrash } from '../../common/Icons/Icons'
import Modal from '../../common/Modal/Modal'

// "Edit labels" popup. onCreate / onRename / onDelete may throw; we show the message here.
export default function LabelsModal({ labels, onClose, onCreate, onRename, onDelete }) {
  const [newName, setNewName] = useState('')
  const [editing, setEditing] = useState({ id: null, name: '' })
  const [error, setError] = useState('')

  const guard = async (fn, fallback) => {
    setError('')
    try {
      await fn()
    } catch (err) {
      setError(getErrorMessage(err, fallback))
    }
  }

  const submitNew = (e) => {
    e.preventDefault()
    const name = newName.trim()
    if (!name) return
    guard(async () => {
      await onCreate(name)
      setNewName('')
    }, 'Failed to create label')
  }

  const saveRename = () => {
    const name = editing.name.trim()
    if (!name || !editing.id) {
      setEditing({ id: null, name: '' })
      return
    }
    guard(async () => {
      await onRename(editing.id, name)
      setEditing({ id: null, name: '' })
    }, 'Failed to rename label')
  }

  return (
    <Modal className="labels-modal" onClose={onClose}>
      <h3>Edit labels</h3>
      <form className="label-row new-label-row" onSubmit={submitNew}>
        <IconLabelTag className="label-row-icon muted" />
        <input
          type="text"
          placeholder="Create new label"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button type="submit" className="icon-btn small" title="Create">
          <IconCheck />
        </button>
      </form>

      <div className="labels-list">
        {labels.length === 0 && <p className="empty-text small">No labels yet</p>}
        {labels.map((l) => (
          <div className="label-row" key={l._id}>
            <IconLabelTag className="label-row-icon muted" />
            {editing.id === l._id ? (
              <input
                autoFocus
                type="text"
                value={editing.name}
                onChange={(e) => setEditing((s) => ({ ...s, name: e.target.value }))}
                onKeyDown={(e) => e.key === 'Enter' && saveRename()}
              />
            ) : (
              <span className="label-row-name">{l.name}</span>
            )}

            {editing.id === l._id ? (
              <button className="icon-btn small" title="Save" onClick={saveRename}>
                <IconCheck />
              </button>
            ) : (
              <button
                className="icon-btn small"
                title="Rename"
                onClick={() => setEditing({ id: l._id, name: l.name })}
              >
                <IconEdit />
              </button>
            )}
            <button
              className="icon-btn small"
              title="Delete"
              onClick={() => guard(() => onDelete(l._id), 'Failed to delete label')}
            >
              <IconTrash />
            </button>
          </div>
        ))}
      </div>

      {error && <p className="collab-error">{error}</p>}

      <div className="modal-actions">
        <button className="text-btn primary" onClick={onClose}>Done</button>
      </div>
    </Modal>
  )
}
