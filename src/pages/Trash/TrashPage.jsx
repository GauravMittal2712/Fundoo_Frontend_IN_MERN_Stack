import { useOutletContext } from 'react-router-dom'
import useNotes from '../../hooks/useNotes'
import NoteList from '../../components/notes/NoteList/NoteList'

export default function TrashPage() {
  const { labels, refreshKey } = useOutletContext()
  const { notes, loading, error, clearError, actions } = useNotes({ type: 'trash', refreshKey })

  return (
    <>
      <p className="trash-hint">Notes in Trash are kept for a while before they're removed permanently.</p>
      <NoteList
        notes={notes}
        loading={loading}
        error={error}
        onDismissError={clearError}
        filterType="trash"
        labels={labels}
        actions={actions}
      />
    </>
  )
}
