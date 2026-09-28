import api from './api'

export const getCollaborators = async (noteId) => {
  const res = await api.get(`/collaborators/${noteId}`)
  return res?.data?.data || []
}

export const addCollaborator = async (noteId, email) => {
  const res = await api.post('/collaborators', { noteId, email })
  return res?.data?.data
}

export const removeCollaborator = async (collaboratorId) => {
  await api.delete(`/collaborators/${collaboratorId}`)
}

export const getSharedNotes = async () => {
  const res = await api.get('/collaborators/shared-notes')
  return res?.data?.data || []
}