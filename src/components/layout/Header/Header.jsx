import useTheme from '../../../hooks/useTheme'
import { IconMenu, IconSearch, IconClose, IconRefresh, IconBulb, IconSun, IconMoon } from '../../common/Icons/Icons'
import ProfileMenu from '../ProfileMenu/ProfileMenu'

export default function Header({ search, onSearchChange, onToggleSidebar, onRefresh }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="keep-topbar">
      <div className="topbar-left">
        <button className="icon-btn" title="Menu" onClick={onToggleSidebar}>
          <IconMenu />
        </button>
        <div className="brand">
          <IconBulb className="brand-icon" />
          <span className="brand-name">Fundoo Keep</span>
        </div>
      </div>

      <div className="topbar-search">
        <IconSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {search && (
          <button className="icon-btn small" title="Clear search" onClick={() => onSearchChange('')}>
            <IconClose />
          </button>
        )}
      </div>

      <div className="topbar-right">
        <button
          className="icon-btn"
          title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <IconSun /> : <IconMoon />}
        </button>
        <button className="icon-btn" title="Refresh" onClick={onRefresh}>
          <IconRefresh />
        </button>
        <ProfileMenu />
      </div>
    </header>
  )
}
