import api from './api'

export const getNotes = async (type = 'active') => {
  const res = await api.get(`/notes?type=${type}`)
  return res?.data?.data || []
}

export const getReminderNotes = async () => {
  const res = await api.get('/notes/reminders')
  return res?.data?.data || []
}

export const searchNotes = async (q) => {
  const res = await api.get(`/notes/search?q=${encodeURIComponent(q)}`)
  return res?.data?.data || []
}

export const createNote = async (payload) => {
  const res = await api.post('/notes', payload)
  return res?.data?.data
}

export const updateNote = (id, payload) => api.put(`/notes/${id}`, payload)
export const archiveNote = (id) => api.patch(`/notes/${id}/archive`)
export const trashNote = (id) => api.patch(`/notes/${id}/trash`)
// "restore" resets isArchived + isTrashed, so it also works as "unarchive"
export const restoreNote = (id) => api.patch(`/notes/${id}/restore`)
export const deleteNote = (id) => api.delete(`/notes/${id}`)

export const setReminder = (id, dateTime) => api.post(`/notes/${id}/reminder`, { dateTime })
export const removeReminder = (id) => api.delete(`/notes/${id}/reminder`)
