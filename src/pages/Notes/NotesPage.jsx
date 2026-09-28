import { useOutletContext } from 'react-router-dom'
import useNotes from '../../hooks/useNotes'
import NoteInput from '../../components/notes/NoteInput/NoteInput'
import NoteList from '../../components/notes/NoteList/NoteList'

export default function NotesPage() {
  const { labels, refreshKey } = useOutletContext()
  const { notes, loading, error, clearError, createNote, actions } = useNotes({ type: 'notes', refreshKey })

  return (
    <>
      <NoteInput onCreate={createNote} />
      <NoteList
        notes={notes}
        loading={loading}
        error={error}
        onDismissError={clearError}
        filterType="notes"
        labels={labels}
        actions={actions}
        groupPins
      />
    </>
  )
}
