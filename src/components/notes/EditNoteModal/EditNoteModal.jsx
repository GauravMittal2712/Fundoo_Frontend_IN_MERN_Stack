import { useState } from 'react'
import useTheme from '../../../hooks/useTheme'
import { getNoteBackground } from '../../../utils/helpers'
import Modal from '../../common/Modal/Modal'

// Opens a note for editing. `onSave({ title, description })` must resolve to true when saved.
export default function EditNoteModal({ note, onSave, onClose }) {
  const { theme } = useTheme()
  const [title, setTitle] = useState(note.title || '')
  const [description, setDescription] = useState(note.description || '')
  const [saving, setSaving] = useState(false)

  const unchanged = title === (note.title || '') && description === (note.description || '')

  const submit = async (e) => {
    e.preventDefault()
    if (unchanged) {
      onClose()
      return
    }
    setSaving(true)
    const saved = await onSave({ title: title.trim() || 'Untitled', description })
    setSaving(false)
    if (saved) onClose()
  }

  return (
    <Modal className="edit-note-modal" onClose={onClose}>
      <form
        className="edit-note-form"
        style={{ background: getNoteBackground(note.color, theme) }}
        onSubmit={submit}
      >
        <input
          autoFocus
          type="text"
          placeholder="Title"
          value={title}
          maxLength={200}
          onChange={(e) => setTitle(e.target.value)}
          className="composer-title"
        />
        <textarea
          placeholder="Take a note..."
          value={description}
          maxLength={5000}
          rows={8}
          onChange={(e) => setDescription(e.target.value)}
          className="composer-desc"
        />
        <div className="composer-actions">
          <div className="spacer" />
          <button type="button" className="text-btn" onClick={onClose}>Cancel</button>
          <button type="submit" className="text-btn primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
