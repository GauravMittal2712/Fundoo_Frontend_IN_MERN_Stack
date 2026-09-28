export const ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  NOTES: '/notes',
  REMINDERS: '/reminders',
  SHARED: '/shared',
  ARCHIVE: '/archive',
  TRASH: '/trash',
  label: (id) => `/label/${id}`,
}

export const DEFAULT_NOTE_COLOR = '#ffffff'

export const NOTE_COLORS = [
  { name: 'Default', value: '#ffffff' },
  { name: 'Coral', value: '#f28b82' },
  { name: 'Peach', value: '#fbbc04' },
  { name: 'Sand', value: '#fff475' },
  { name: 'Mint', value: '#ccff90' },
  { name: 'Sage', value: '#a7ffeb' },
  { name: 'Fog', value: '#cbf0f8' },
  { name: 'Storm', value: '#aecbfa' },
  { name: 'Dusk', value: '#d7aefb' },
  { name: 'Blossom', value: '#fdcfe8' },
  { name: 'Clay', value: '#e6c9a8' },
  { name: 'Chalk', value: '#e8eaed' },
]

export const EMPTY_COPY = {
  notes: { icon: '💡', text: 'Notes you add appear here' },
  reminders: { icon: '🔔', text: 'Notes with upcoming reminders appear here' },
  shared: { icon: '👥', text: 'Notes shared with you appear here' },
  archive: { icon: '📦', text: 'No archived notes' },
  trash: { icon: '🗑️', text: 'No notes in Trash' },
  label: { icon: '🏷️', text: 'No notes with this label yet' },
  search: { icon: '🔍', text: 'No results found' },
}
