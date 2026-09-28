import { DEFAULT_NOTE_COLOR } from '../../../utils/constants'
import { IconBell, IconPin } from '../../common/Icons/Icons'
import NoteToolbar from '../NoteToolbar/NoteToolbar'

export default function NoteCard({ note, filterType, popover, actions, ...toolbarProps }) {
  const hasOpenPopover = popover.type !== null && popover.noteId === note._id
  const isDefaultColor = !note.color || note.color === DEFAULT_NOTE_COLOR
  const showPin = filterType !== 'trash' && filterType !== 'shared'

  return (
    <div
      className={`note-card ${hasOpenPopover ? 'popover-open' : ''}`}
      data-default={isDefaultColor}
      style={{ background: isDefaultColor ? 'var(--card-bg)' : note.color }}
    >
      {showPin && (
        <button
          className="pin-corner-btn"
          title={note.isPinned ? 'Unpin note' : 'Pin note'}
          onClick={() => actions.togglePin(note)}
        >
          <IconPin className={note.isPinned ? 'pin-on' : 'pin-off'} />
        </button>
      )}

      <div className="note-body">
        {note.title && <h3 className="note-title">{note.title}</h3>}
        {note.description && <p className="note-desc">{note.description}</p>}
        {note.reminder?.dateTime && (
          <span className="reminder-chip">
            <IconBell /> {new Date(note.reminder.dateTime).toLocaleString()}
          </span>
        )}
        {note.labels?.length > 0 && (
          <div className="note-label-chips">
            {note.labels.map((l) => (
              <span className="label-chip" key={l._id}>{l.name}</span>
            ))}
          </div>
        )}
      </div>

      <NoteToolbar
        note={note}
        filterType={filterType}
        popover={popover}
        actions={actions}
        {...toolbarProps}
      />
    </div>
  )
}
