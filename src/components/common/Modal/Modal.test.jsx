import { expect } from 'chai'
import sinon from 'sinon'
import { render, screen, fireEvent } from '@testing-library/react'
import Modal from './Modal'

describe('<Modal />', () => {
  it('renders its children', () => {
    render(<Modal onClose={() => {}}>Hello modal</Modal>)
    expect(screen.getByText('Hello modal')).to.exist
  })

  it('calls onClose when the backdrop is clicked', () => {
    const onClose = sinon.spy()
    const { container } = render(<Modal onClose={onClose}>Content</Modal>)
    fireEvent.click(container.querySelector('.modal-backdrop'))
    expect(onClose.calledOnce).to.be.true
  })

  it('does not close when the content is clicked', () => {
    const onClose = sinon.spy()
    render(<Modal onClose={onClose}>Content</Modal>)
    fireEvent.click(screen.getByText('Content'))
    expect(onClose.called).to.be.false
  })
})