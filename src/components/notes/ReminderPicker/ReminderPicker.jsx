export default function ReminderPicker({ value, onChange, hasReminder, onSave, onRemove }) {
  return (
    <div className="popover reminder-popover" onClick={(e) => e.stopPropagation()}>
      <input type="datetime-local" value={value} onChange={(e) => onChange(e.target.value)} />
      <div className="popover-actions">
        {hasReminder && (
          <button className="text-btn" onClick={onRemove}>Remove</button>
        )}
        <button className="text-btn primary" onClick={onSave}>Save</button>
      </div>
    </div>
  )
}
