import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../utils/constants'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import MainLayout from '../components/layout/MainLayout/MainLayout'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import NotesPage from '../pages/Notes/NotesPage'
import RemindersPage from '../pages/Reminders/RemindersPage'
import SharedPage from '../pages/Shared/SharedPage'
import ArchivePage from '../pages/Archive/ArchivePage'
import TrashPage from '../pages/Trash/TrashPage'
import LabelNotesPage from '../pages/LabelNotes/LabelNotesPage'
import NotFound from '../pages/NotFound/NotFound'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<Register />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.NOTES} element={<NotesPage />} />
          <Route path={ROUTES.REMINDERS} element={<RemindersPage />} />
          <Route path={ROUTES.SHARED} element={<SharedPage />} />
          <Route path={ROUTES.ARCHIVE} element={<ArchivePage />} />
          <Route path={ROUTES.TRASH} element={<TrashPage />} />
          <Route path="/label/:labelId" element={<LabelNotesPage />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to={ROUTES.NOTES} replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
