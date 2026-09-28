// Dimmed backdrop + centered box. Clicking the backdrop closes it.
export default function Modal({ onClose, className = '', children }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className={className} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
