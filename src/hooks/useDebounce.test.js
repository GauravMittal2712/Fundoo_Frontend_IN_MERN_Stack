import { expect } from 'chai'
import sinon from 'sinon'
import { renderHook, act } from '@testing-library/react'
import useDebounce from './useDebounce'

describe('useDebounce', () => {
  let clock
  beforeEach(() => { clock = sinon.useFakeTimers() })
  afterEach(() => { clock.restore() })

  it('updates the value only after the delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 350),
      { initialProps: { value: 'a' } }
    )
    rerender({ value: 'ab' })
    expect(result.current).to.equal('a')

    act(() => { clock.tick(350) })
    expect(result.current).to.equal('ab')
  })
})