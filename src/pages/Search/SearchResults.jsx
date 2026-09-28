import useNotes from '../../hooks/useNotes'
import NoteList from '../../components/notes/NoteList/NoteList'

// Shown by MainLayout instead of the current page while the search box has text.
export default function SearchResults({ query, labels, refreshKey }) {
  const { notes, loading, error, clearError, actions } = useNotes({ type: 'search', query, refreshKey })

  return (
    <NoteList
      notes={notes}
      loading={loading}
      error={error}
      onDismissError={clearError}
      filterType="search"
      labels={labels}
      actions={actions}
    />
  )
}
