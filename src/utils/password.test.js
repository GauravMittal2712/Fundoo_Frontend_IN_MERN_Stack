import { expect } from 'chai'
import { getPasswordError } from './password'

describe('getPasswordError', () => {
  it('returns empty string for a strong password', () => {
    expect(getPasswordError('Abcdef1!')).to.equal('')
  })

  it('lists everything that is missing', () => {
    expect(getPasswordError('abc')).to.equal(
      'Password needs at least 8 characters, an uppercase letter, a number, a special character'
    )
  })

  it('rejects passwords longer than 72 characters', () => {
    expect(getPasswordError('Aa1!' + 'a'.repeat(70))).to.equal(
      'Password must be at most 72 characters'
    )
  })
})