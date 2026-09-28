export default function SidebarItem({ active, expanded, onClick, icon, label }) {
  return (
    <button className={`sidebar-item ${active ? 'active' : ''}`} onClick={onClick} title={label}>
      <span className="sidebar-icon">{icon}</span>
      {expanded && <span className="sidebar-label">{label}</span>}
    </button>
  )
}
