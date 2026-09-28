import { useOutletContext } from 'react-router-dom'
import useNotes from '../../hooks/useNotes'
import NoteList from '../../components/notes/NoteList/NoteList'

export default function ArchivePage() {
  const { labels, refreshKey } = useOutletContext()
  const { notes, loading, error, clearError, actions } = useNotes({ type: 'archive', refreshKey })

  return (
    <>
      <h2 className="view-title">Archive</h2>
      <NoteList
        notes={notes}
        loading={loading}
        error={error}
        onDismissError={clearError}
        filterType="archive"
        labels={labels}
        actions={actions}
      />
    </>
  )
}
