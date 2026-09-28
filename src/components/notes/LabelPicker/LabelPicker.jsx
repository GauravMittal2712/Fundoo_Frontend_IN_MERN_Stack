export default function LabelPicker({ note, labels, onToggle }) {
  return (
    <div className="popover label-popover" onClick={(e) => e.stopPropagation()}>
      {labels.length === 0 && <p className="empty-text small">No labels yet</p>}
      {labels.map((l) => {
        const checked = (note.labels || []).some((nl) => nl._id === l._id)
        return (
          <label className="label-option" key={l._id}>
            <input type="checkbox" checked={checked} onChange={() => onToggle(note, l)} />
            <span>{l.name}</span>
          </label>
        )
      })}
    </div>
  )
}
