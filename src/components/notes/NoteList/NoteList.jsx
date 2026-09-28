import { useState } from 'react'
import { EMPTY_COPY } from '../../../utils/constants'
import { IconClose } from '../../common/Icons/Icons'
import NoteCard from '../NoteCard/NoteCard'
import CollaboratorModal from '../CollaboratorModal/CollaboratorModal'

const NO_POPOVER = { type: null, noteId: null }

// Shows loading / error / empty state / (pinned + other) note cards for one view.
export default function NoteList({
  notes, loading, error, onDismissError, filterType, labels, actions, groupPins = false,
}) {
  const [popover, setPopover] = useState(NO_POPOVER)
  const [reminderValue, setReminderValue] = useState('')
  const [collabNote, setCollabNote] = useState(null)

  const closePopovers = () => setPopover(NO_POPOVER)

  const cardProps = {
    filterType,
    labels,
    popover,
    setPopover,
    reminderValue,
    setReminderValue,
    actions,
    onChangeColor: (note, color) => {
      closePopovers()
      actions.changeColor(note, color)
    },
    onSaveReminder: (note) => {
      if (!reminderValue) return
      closePopovers()
      actions.saveReminder(note, reminderValue)
    },
    onOpenCollab: (note) => {
      closePopovers()
      setCollabNote(note)
    },
  }

  const pinned = groupPins ? notes.filter((n) => n.isPinned) : []
  const others = groupPins ? notes.filter((n) => !n.isPinned) : notes
  const emptyCopy = EMPTY_COPY[filterType] || EMPTY_COPY.notes

  return (
    <>
      {popover.type !== null && <div className="backdrop" onClick={closePopovers} />}

      {error && (
        <div className="notes-error">
          {error}
          <button className="icon-btn small" onClick={onDismissError}><IconClose /></button>
        </div>
      )}

      {loading ? (
        <p className="empty-text">Loading notes...</p>
      ) : notes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">{emptyCopy.icon}</div>
          <p className="empty-text">{emptyCopy.text}</p>
        </div>
      ) : (
        <>
          {pinned.length > 0 && (
            <>
              <div className="section-label">PINNED</div>
              <div className="notes-masonry">
                {pinned.map((note) => (
                  <NoteCard key={note._id} note={note} {...cardProps} />
                ))}
              </div>
              <div className="section-label">OTHERS</div>
            </>
          )}
          <div className="notes-masonry">
            {others.map((note) => (
              <NoteCard key={note._id} note={note} {...cardProps} />
            ))}
          </div>
        </>
      )}

      {collabNote && <CollaboratorModal note={collabNote} onClose={() => setCollabNote(null)} />}
    </>
  )
}
