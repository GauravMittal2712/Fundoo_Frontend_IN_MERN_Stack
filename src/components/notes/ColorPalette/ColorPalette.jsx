import { NOTE_COLORS } from '../../../utils/constants'
import { IconCheck } from '../../common/Icons/Icons'

export default function ColorPalette({ current, onPick }) {
  return (
    <div className="popover color-popover" onClick={(e) => e.stopPropagation()}>
      {NOTE_COLORS.map((c) => (
        <button
          key={c.value}
          type="button"
          className={`swatch ${current === c.value ? 'swatch-selected' : ''}`}
          style={{ background: c.value }}
          title={c.name}
          onClick={() => onPick(c.value)}
        >
          {current === c.value && <IconCheck />}
        </button>
      ))}
    </div>
  )
}
