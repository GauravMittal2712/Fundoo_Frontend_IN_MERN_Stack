import { useOutletContext } from 'react-router-dom'
import useNotes from '../../hooks/useNotes'
import NoteList from '../../components/notes/NoteList/NoteList'

export default function RemindersPage() {
  const { labels, refreshKey } = useOutletContext()
  const { notes, loading, error, clearError, actions } = useNotes({ type: 'reminders', refreshKey })

  return (
    <>
      <h2 className="view-title">Reminders</h2>
      <NoteList
        notes={notes}
        loading={loading}
        error={error}
        onDismissError={clearError}
        filterType="reminders"
        labels={labels}
        actions={actions}
      />
    </>
  )
}
