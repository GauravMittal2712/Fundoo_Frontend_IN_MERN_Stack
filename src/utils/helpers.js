export const getInitials = (user) =>
  `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`.toUpperCase()

export const getFullName = (user) =>
  `${user?.firstName || ''} ${user?.lastName || ''}`.trim()

export const getErrorMessage = (err, fallback) =>
  err?.response?.data?.message || fallback
