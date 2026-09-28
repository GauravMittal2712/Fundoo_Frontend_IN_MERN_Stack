import {
  IconBell, IconPersonAdd, IconPalette, IconLabelTag, IconArchive, IconUnarchive,
  IconTrash, IconRestore, IconPeople,
} from '../../common/Icons/Icons'
import ColorPalette from '../ColorPalette/ColorPalette'
import LabelPicker from '../LabelPicker/LabelPicker'
import ReminderPicker from '../ReminderPicker/ReminderPicker'

export default function NoteToolbar({
  note, filterType, labels, popover, setPopover, reminderValue, setReminderValue,
  actions, onSaveReminder, onChangeColor, onOpenCollab,
}) {
  const isTrashView = filterType === 'trash'
  const isSharedView = filterType === 'shared'
  // search results can include archived notes, so look at the note itself there
  const isArchived = filterType === 'archive' || (filterType === 'search' && note.isArchived)

  const isOpen = (type) => popover.type === type && popover.noteId === note._id
  const togglePopover = (type, e) => {
    e.stopPropagation()
    setReminderValue(note.reminder?.dateTime ? note.reminder.dateTime.slice(0, 16) : '')
    setPopover(isOpen(type) ? { type: null, noteId: null } : { type, noteId: note._id })
  }

  if (isSharedView) {
    return (
      <div className="note-toolbar">
        <span className="shared-chip"><IconPeople /> Shared with you</span>
      </div>
    )
  }

  if (isTrashView) {
    return (
      <div className="note-toolbar">
        <button className="icon-btn small" title="Restore" onClick={() => actions.restore(note)}>
          <IconRestore />
        </button>
        <button className="icon-btn small" title="Delete forever" onClick={() => actions.deleteForever(note)}>
          <IconTrash />
        </button>
      </div>
    )
  }

  return (
    <div className="note-toolbar">
      <div className="popover-anchor">
        <button className="icon-btn small" title="Remind me" onClick={(e) => togglePopover('reminder', e)}>
          <IconBell />
        </button>
        {isOpen('reminder') && (
          <ReminderPicker
            value={reminderValue}
            onChange={setReminderValue}
            hasReminder={!!note.reminder?.dateTime}
            onSave={() => onSaveReminder(note)}
            onRemove={() => {
              setPopover({ type: null, noteId: null })
              actions.removeReminder(note)
            }}
          />
        )}
      </div>

      <button className="icon-btn small" title="Collaborator" onClick={() => onOpenCollab(note)}>
        <IconPersonAdd />
      </button>

      <div className="popover-anchor">
        <button className="icon-btn small" title="Change color" onClick={(e) => togglePopover('color', e)}>
          <IconPalette />
        </button>
        {isOpen('color') && (
          <ColorPalette current={note.color} onPick={(color) => onChangeColor(note, color)} />
        )}
      </div>

      <div className="popover-anchor">
        <button className="icon-btn small" title="Add label" onClick={(e) => togglePopover('label', e)}>
          <IconLabelTag />
        </button>
        {isOpen('label') && (
          <LabelPicker note={note} labels={labels} onToggle={actions.toggleLabel} />
        )}
      </div>

      {isArchived ? (
        <button className="icon-btn small" title="Unarchive" onClick={() => actions.unarchive(note)}>
          <IconUnarchive />
        </button>
      ) : (
        <button className="icon-btn small" title="Archive" onClick={() => actions.archive(note)}>
          <IconArchive />
        </button>
      )}

      <button className="icon-btn small" title="Delete" onClick={() => actions.trash(note)}>
        <IconTrash />
      </button>
    </div>
  )
}
