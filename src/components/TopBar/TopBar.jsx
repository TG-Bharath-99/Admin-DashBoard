import { useState, useRef, useEffect } from 'react';
import {
  HiOutlineMagnifyingGlass,
  HiOutlineBell,
  HiBars3,
  HiOutlineSun,
  HiOutlineMoon,
} from 'react-icons/hi2';
import { useTheme } from '../../context/ThemeContext';
import { notifications } from '../../data/dashboardData';
import './TopBar.css';

export default function TopBar({ collapsed, onMenuClick, searchQuery, setSearchQuery }) {
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`topbar ${collapsed ? 'collapsed' : ''}`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1 }}>
        <button className="hamburger-btn" onClick={onMenuClick} aria-label="Toggle menu">
          <HiBars3 />
        </button>

        <div className="topbar-search">
          <span className="topbar-search-icon"><HiOutlineMagnifyingGlass /></span>
          <input
            className="topbar-search-input"
            type="text"
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            id="search-input"
          />
          <span className="topbar-search-shortcut">⌘K</span>
        </div>
      </div>

      <div className="topbar-right">
        {/* Notifications */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button
            className="topbar-icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            id="notification-btn"
          >
            <HiOutlineBell />
            {unreadCount > 0 && <span className="topbar-badge-count">{unreadCount}</span>}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-dropdown-header">
                <h4>Notifications</h4>
                <span>Mark all read</span>
              </div>
              {notifications.map((notif) => (
                <div key={notif.id} className="notification-item">
                  <div className={`notification-dot ${notif.read ? 'read' : ''}`} />
                  <div>
                    <div className="notification-text">{notif.text}</div>
                    <div className="notification-time">{notif.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="topbar-divider" />

        {/* Theme Toggle */}
        <button
          className={`theme-toggle ${theme === 'dark' ? 'dark' : ''}`}
          onClick={toggleTheme}
          aria-label="Toggle theme"
          id="theme-toggle"
        >
          <div className="theme-toggle-knob">
            {theme === 'dark' ? <HiOutlineMoon /> : <HiOutlineSun />}
          </div>
        </button>

        <div className="topbar-divider" />

        {/* Profile */}
        <div className="topbar-profile" id="user-profile">
          <div className="topbar-profile-avatar">BK</div>
          <span className="topbar-profile-name">Bharath U</span>
        </div>
      </div>
    </header>
  );
}
