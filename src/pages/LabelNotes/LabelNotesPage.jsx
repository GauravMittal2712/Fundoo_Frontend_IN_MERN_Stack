import { useOutletContext, useParams } from 'react-router-dom'
import useNotes from '../../hooks/useNotes'
import NoteList from '../../components/notes/NoteList/NoteList'

export default function LabelNotesPage() {
  const { labelId } = useParams()
  const { labels, refreshKey } = useOutletContext()
  const label = labels.find((l) => l._id === labelId)
  const { notes, loading, error, clearError, actions } = useNotes({ type: 'label', labelId, refreshKey })

  return (
    <>
      <h2 className="view-title">{label?.name}</h2>
      <NoteList
        key={labelId}
        notes={notes}
        loading={loading}
        error={error}
        onDismissError={clearError}
        filterType="label"
        labels={labels}
        actions={actions}
      />
    </>
  )
}
