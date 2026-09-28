import { useOutletContext } from 'react-router-dom'
import useNotes from '../../hooks/useNotes'
import NoteList from '../../components/notes/NoteList/NoteList'

export default function SharedPage() {
  const { labels, refreshKey } = useOutletContext()
  const { notes, loading, error, clearError, actions } = useNotes({ type: 'shared', refreshKey })

  return (
    <>
      <h2 className="view-title">Shared with me</h2>
      <NoteList
        notes={notes}
        loading={loading}
        error={error}
        onDismissError={clearError}
        filterType="shared"
        labels={labels}
        actions={actions}
      />
    </>
  )
}
