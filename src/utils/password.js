// Same rule as the backend (Fundoo_backend/src/validations/auth.validation.js)
export const PASSWORD_HINT =
  'Use 8 or more characters with an uppercase letter, a lowercase letter, a number & a symbol'

// Returns '' when the password is fine, otherwise a message listing what is missing.
export const getPasswordError = (password = '') => {
  const missing = []
  if (password.length < 8) missing.push('at least 8 characters')
  if (!/[a-z]/.test(password)) missing.push('a lowercase letter')
  if (!/[A-Z]/.test(password)) missing.push('an uppercase letter')
  if (!/[0-9]/.test(password)) missing.push('a number')
  if (!/[^A-Za-z0-9]/.test(password)) missing.push('a special character')
  if (password.length > 72) return 'Password must be at most 72 characters'
  return missing.length ? `Password needs ${missing.join(', ')}` : ''
}
