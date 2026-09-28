import { useLocation } from 'react-router-dom'
import { ROUTES } from '../../../utils/constants'
import { IconBulb, IconBell, IconPeople, IconLabelTag, IconEdit, IconArchive, IconTrash } from '../../common/Icons/Icons'
import SidebarItem from './SidebarItem'

export default function Sidebar({ expanded, labels, onNavigate, onEditLabels }) {
  const { pathname } = useLocation()
  const isActive = (path) => pathname === path

  return (
    <aside className={`keep-sidebar ${expanded ? '' : 'collapsed'}`}>
      <SidebarItem
        icon={<IconBulb />}
        label="Notes"
        active={isActive(ROUTES.NOTES)}
        expanded={expanded}
        onClick={() => onNavigate(ROUTES.NOTES)}
      />
      <SidebarItem
        icon={<IconBell />}
        label="Reminders"
        active={isActive(ROUTES.REMINDERS)}
        expanded={expanded}
        onClick={() => onNavigate(ROUTES.REMINDERS)}
      />
      <SidebarItem
        icon={<IconPeople />}
        label="Shared with me"
        active={isActive(ROUTES.SHARED)}
        expanded={expanded}
        onClick={() => onNavigate(ROUTES.SHARED)}
      />

      {labels.map((l) => (
        <SidebarItem
          key={l._id}
          icon={<IconLabelTag />}
          label={l.name}
          active={isActive(ROUTES.label(l._id))}
          expanded={expanded}
          onClick={() => onNavigate(ROUTES.label(l._id))}
        />
      ))}

      <SidebarItem icon={<IconEdit />} label="Edit labels" expanded={expanded} onClick={onEditLabels} />
      <SidebarItem
        icon={<IconArchive />}
        label="Archive"
        active={isActive(ROUTES.ARCHIVE)}
        expanded={expanded}
        onClick={() => onNavigate(ROUTES.ARCHIVE)}
      />
      <SidebarItem
        icon={<IconTrash />}
        label="Trash"
        active={isActive(ROUTES.TRASH)}
        expanded={expanded}
        onClick={() => onNavigate(ROUTES.TRASH)}
      />
    </aside>
  )
}
