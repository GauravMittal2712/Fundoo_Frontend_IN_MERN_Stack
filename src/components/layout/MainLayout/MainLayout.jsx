import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import useDebounce from '../../../hooks/useDebounce'
import useLabels from '../../../hooks/useLabels'
import { ROUTES } from '../../../utils/constants'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import LabelsModal from '../../notes/LabelsModal/LabelsModal'
import SearchResults from '../../../pages/Search/SearchResults'
import '../../../styles/notes.css'

// Header + Sidebar stay on screen; the routed page is drawn inside <Outlet />.
export default function MainLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { labels, create, rename, remove } = useLabels()

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showLabelsModal, setShowLabelsModal] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search.trim(), 350)
  const isSearching = search.trim().length > 0

  // Leaving a page (sidebar click, browser back/forward) clears the search box.
  const [prevPath, setPrevPath] = useState(pathname)
  if (pathname !== prevPath) {
    setPrevPath(pathname)
    setSearch('')
  }

  const refresh = () => setRefreshKey((k) => k + 1)

  const goTo = (path) => {
    setSearch('')
    navigate(path)
  }

  const renameLabel = async (id, name) => {
    await rename(id, name)
    refresh()
  }

  const deleteLabel = async (id) => {
    await remove(id)
    if (pathname === ROUTES.label(id)) navigate(ROUTES.NOTES)
    else refresh()
  }

  return (
    <div className="keep-app">
      <Header
        search={search}
        onSearchChange={setSearch}
        onToggleSidebar={() => setSidebarOpen((s) => !s)}
        onRefresh={refresh}
      />

      <div className="keep-body">
        <Sidebar
          expanded={sidebarOpen}
          labels={labels}
          onNavigate={goTo}
          onEditLabels={() => setShowLabelsModal(true)}
        />

        <main className="keep-main">
          {isSearching ? (
            <SearchResults query={debouncedSearch} labels={labels} refreshKey={refreshKey} />
          ) : (
            <Outlet context={{ labels, refreshKey }} />
          )}
        </main>
      </div>

      {showLabelsModal && (
        <LabelsModal
          labels={labels}
          onClose={() => setShowLabelsModal(false)}
          onCreate={create}
          onRename={renameLabel}
          onDelete={deleteLabel}
        />
      )}
    </div>
  )
}
