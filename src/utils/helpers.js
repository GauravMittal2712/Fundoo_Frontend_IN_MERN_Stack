import { DARK_NOTE_COLORS, DEFAULT_NOTE_COLOR } from './constants'

export const getInitials = (user) =>
  `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`.toUpperCase()

export const getFullName = (user) =>
  `${user?.firstName || ''} ${user?.lastName || ''}`.trim()

export const getErrorMessage = (err, fallback) =>
  err?.response?.data?.message || fallback

// Background to display for a note colour in the current theme.
export const getNoteBackground = (color, theme) => {
  if (!color || color === DEFAULT_NOTE_COLOR) return 'var(--card-bg)'
  if (theme === 'dark') return DARK_NOTE_COLORS[color.toLowerCase()] || color
  return color
}