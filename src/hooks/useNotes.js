import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as noteService from '../services/noteService'
import * as labelService from '../services/labelService'
import * as collaboratorService from '../services/collaboratorService'
import { getErrorMessage } from '../utils/helpers'

const TYPE_PARAM = { archive: 'archived', trash: 'trash' }

const fetchByView = ({ type, labelId, query }) => {
  if (type === 'search') return query ? noteService.searchNotes(query) : Promise.resolve([])
  if (type === 'shared') return collaboratorService.getSharedNotes()
  if (type === 'reminders') return noteService.getReminderNotes()
  if (type === 'label' && labelId) return labelService.getNotesByLabel(labelId)
  return noteService.getNotes(TYPE_PARAM[type] || 'active')
}

/**
 * Loads the notes for one view and exposes every action you can do on a note.
 * type: 'notes' | 'reminders' | 'shared' | 'archive' | 'trash' | 'label' | 'search'
 */
export default function useNotes({ type = 'notes', labelId = null, query = '', refreshKey = 0 } = {}) {
  // `key` says which view the stored notes belong to. While it differs from the
  // view being asked for, we are "loading".
  const viewKey = `${type}|${labelId}|${query}|${refreshKey}`
  const [state, setState] = useState({ key: null, notes: [], error: '' })
  const loading = state.key !== viewKey

  const latestKey = useRef(viewKey)
  useEffect(() => {
    latestKey.current = viewKey
  }, [viewKey])

  useEffect(() => {
    let ignore = false
    fetchByView({ type, labelId, query })
      .then((data) => !ignore && setState({ key: viewKey, notes: data, error: '' }))
      .catch(() => {
        if (ignore) return
        setState({ key: viewKey, notes: [], error: type === 'search' ? '' : 'Failed to load notes' })
      })
    return () => {
      ignore = true
    }
  }, [type, labelId, query, viewKey])

  const setError = useCallback((error) => setState((s) => ({ ...s, error })), [])
  const clearError = useCallback(() => setError(''), [setError])

  // Re-fetch the current view without showing the "Loading..." state.
  const reload = useCallback(async () => {
    const key = viewKey
    const data = await fetchByView({ type, labelId, query })
    if (latestKey.current === key) setState({ key, notes: data, error: '' })
  }, [type, labelId, query, viewKey])

  const createNote = useCallback(
    async (payload) => {
      try {
        const note = await noteService.createNote(payload)
        if (note) setState((s) => ({ ...s, notes: [note, ...s.notes] }))
        return true
      } catch (err) {
        setError(getErrorMessage(err, 'Failed to create note'))
        return false
      }
    },
    [setError],
  )

  const actions = useMemo(() => {
    const run = async (fn) => {
      try {
        await fn()
        await reload()
      } catch (err) {
        setError(getErrorMessage(err, 'Something went wrong'))
      }
    }

    return {
      togglePin: (note) => run(() => noteService.updateNote(note._id, { isPinned: !note.isPinned })),
      changeColor: (note, color) => run(() => noteService.updateNote(note._id, { color })),
      archive: (note) => run(() => noteService.archiveNote(note._id)),
      unarchive: (note) => run(() => noteService.restoreNote(note._id)),
      trash: (note) => run(() => noteService.trashNote(note._id)),
      restore: (note) => run(() => noteService.restoreNote(note._id)),
      deleteForever: (note) => {
        if (!window.confirm('Delete this note forever? This cannot be undone.')) return
        run(() => noteService.deleteNote(note._id))
      },
      saveReminder: (note, dateTime) => {
        if (!dateTime) return
        run(() => noteService.setReminder(note._id, dateTime))
      },
      removeReminder: (note) => run(() => noteService.removeReminder(note._id)),
      toggleLabel: async (note, label) => {
        const has = (note.labels || []).some((l) => l._id === label._id)
        try {
          const updated = has
            ? await labelService.removeLabelFromNote(label._id, note._id)
            : await labelService.addLabelToNote(label._id, note._id)
          if (!updated) {
            await reload()
            return
          }
          setState((s) => ({
            ...s,
            notes:
              has && type === 'label' && labelId === label._id
                ? s.notes.filter((n) => n._id !== note._id)
                : s.notes.map((n) => (n._id === note._id ? updated : n)),
          }))
        } catch (err) {
          setError(getErrorMessage(err, 'Failed to update label'))
        }
      },
    }
  }, [reload, setError, type, labelId])

  return { notes: state.notes, loading, error: state.error, clearError, createNote, actions }
}
