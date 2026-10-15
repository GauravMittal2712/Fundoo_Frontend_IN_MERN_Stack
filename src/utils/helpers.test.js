import { expect } from 'chai'
import { getInitials, getFullName, getErrorMessage } from './helpers'

describe('helpers', () => {
  it('getInitials returns uppercase initials', () => {
    expect(getInitials({ firstName: 'john', lastName: 'doe' })).to.equal('JD')
  })

  it('getInitials handles a missing user', () => {
    expect(getInitials(undefined)).to.equal('')
  })

  it('getFullName joins first and last name', () => {
    expect(getFullName({ firstName: 'John', lastName: 'Doe' })).to.equal('John Doe')
  })

  it('getErrorMessage prefers the server message', () => {
    const err = { response: { data: { message: 'Invalid email' } } }
    expect(getErrorMessage(err, 'Something went wrong')).to.equal('Invalid email')
  })

  it('getErrorMessage falls back when there is no server message', () => {
    expect(getErrorMessage({}, 'Something went wrong')).to.equal('Something went wrong')
  })
})