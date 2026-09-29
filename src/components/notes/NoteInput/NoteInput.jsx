import { useState } from 'react'
import { DEFAULT_NOTE_COLOR } from '../../../utils/constants'
import { IconAdd, IconPalette, IconPin } from '../../common/Icons/Icons'
import useTheme from '../../../hooks/useTheme'
import { getNoteBackground } from '../../../utils/helpers'
import ColorPalette from '../ColorPalette/ColorPalette'

const EMPTY_NOTE = { title: '', description: '', color: DEFAULT_NOTE_COLOR, isPinned: false }

// The "Take a note..." box. `onCreate(payload)` must resolve to true when saved.
export default function NoteInput({ onCreate }) {
  const { theme } = useTheme()
  const [open, setOpen] = useState(false)
  const [note, setNote] = useState(EMPTY_NOTE)
  const [colorOpen, setColorOpen] = useState(false)

  const close = () => {
    setOpen(false)
    setColorOpen(false)
    setNote(EMPTY_NOTE)
  }

  const submit = async (e) => {
    e?.preventDefault()
    if (!note.title.trim() && !note.description.trim()) {
      close()
      return
    }
    const saved = await onCreate({
      title: note.title.trim() || 'Untitled',
      description: note.description,
      color: note.color,
      isPinned: note.isPinned,
    })
    if (saved) close()
  }

  if (!open) {
    return (
      <div className="composer-wrapper">
        <div className="composer-collapsed" onClick={() => setOpen(true)}>
          <span>Take a note...</span>
          <IconAdd className="composer-add-icon" />
        </div>
      </div>
    )
  }

  return (
    <div className="composer-wrapper">
      {colorOpen && <div className="backdrop" onClick={() => setColorOpen(false)} />}
      <form
        className="composer-form"
        style={{ background: getNoteBackground(note.color, theme) }}
        onSubmit={submit}
      >
        <div className="composer-top">
          <input
            autoFocus
            type="text"
            placeholder="Title"
            value={note.title}
            onChange={(e) => setNote((n) => ({ ...n, title: e.target.value }))}
            className="composer-title"
          />
          <button
            type="button"
            className="icon-btn small pin-btn"
            title={note.isPinned ? 'Unpin note' : 'Pin note'}
            onClick={() => setNote((n) => ({ ...n, isPinned: !n.isPinned }))}
          >
            <IconPin className={note.isPinned ? 'pin-on' : 'pin-off'} />
          </button>
        </div>
        <textarea
          placeholder="Take a note..."
          value={note.description}
          onChange={(e) => setNote((n) => ({ ...n, description: e.target.value }))}
          rows={3}
          className="composer-desc"
        />
        <div className="composer-actions">
          <div className="popover-anchor">
            <button
              type="button"
              className="icon-btn"
              title="Choose color"
              onClick={(e) => {
                e.stopPropagation()
                setColorOpen((s) => !s)
              }}
            >
              <IconPalette />
            </button>
            {colorOpen && (
              <ColorPalette
                current={note.color}
                onPick={(color) => {
                  setNote((n) => ({ ...n, color }))
                  setColorOpen(false)
                }}
              />
            )}
          </div>
          <div className="spacer" />
          <button type="button" className="text-btn" onClick={close}>Close</button>
          <button type="submit" className="text-btn primary">Done</button>
        </div>
      </form>
    </div>
  )
}