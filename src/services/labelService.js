import api from './api'

export const getLabels = async () => {
  const res = await api.get('/labels')
  return res?.data?.data || []
}

export const createLabel = async (name) => {
  const res = await api.post('/labels', { name })
  return res?.data?.data
}

export const updateLabel = async (labelId, name) => {
  const res = await api.put(`/labels/${labelId}`, { name })
  return res?.data?.data
}

export const deleteLabel = async (labelId) => {
  await api.delete(`/labels/${labelId}`)
}

export const addLabelToNote = async (labelId, noteId) => {
  const res = await api.post(`/labels/${labelId}/notes/${noteId}`)
  return res?.data?.data
}

export const removeLabelFromNote = async (labelId, noteId) => {
  const res = await api.delete(`/labels/${labelId}/notes/${noteId}`)
  return res?.data?.data
}

export const getNotesByLabel = async (labelId) => {
  const res = await api.get(`/labels/${labelId}/notes`)
  return res?.data?.data || []
}