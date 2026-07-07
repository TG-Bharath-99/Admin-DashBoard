import { useState } from 'react';
import {
  HiOutlineSquares2X2,
  HiOutlineUsers,
  HiOutlineChartBarSquare,
  HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi2';
import toast from 'react-hot-toast';
import './Sidebar.css';

const menuItems = [
  { section: 'Main' },
  { id: 'dashboard', label: 'Dashboard', icon: HiOutlineSquares2X2 },
  { id: 'users', label: 'Users', icon: HiOutlineUsers },
  { id: 'analytics', label: 'Analytics', icon: HiOutlineChartBarSquare },
  { section: 'Preferences' },
  { id: 'settings', label: 'Settings', icon: HiOutlineCog6Tooth },
];

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleNavClick = (id) => {
    setActiveItem(id);
    if (window.innerWidth <= 1024) {
      setMobileOpen(false);
    }
  };

  const handleLogout = () => {
    toast('Logged out successfully!', {
      icon: '👋',
      style: {
        borderRadius: '10px',
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-light)',
      },
    });
  };

  return (
    <>
      <div className={`sidebar-overlay ${mobileOpen ? 'visible' : ''}`} onClick={() => setMobileOpen(false)} />
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <rect width="34" height="34" rx="8" fill="url(#logoGrad)" />
              <path d="M10 12L17 8L24 12V22L17 26L10 22V12Z" stroke="white" strokeWidth="1.8" fill="none" />
              <path d="M17 8V26M10 12L24 22M24 12L10 22" stroke="white" strokeWidth="1.2" opacity="0.5" />
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="34" y2="34">
                  <stop stopColor="#3b5bf7" />
                  <stop offset="1" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="sidebar-logo-text">cerso.</span>
        </div>

        {/* Toggle */}
        <div className="sidebar-toggle-wrapper">
          <button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">
            {collapsed ? <HiChevronRight size={14} /> : <HiChevronLeft size={14} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          {menuItems.map((item, idx) => {
            if (item.section) {
              return (
                <div key={`section-${idx}`} className="sidebar-section-label">
                  {item.section}
                </div>
              );
            }
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`sidebar-link ${activeItem === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
                title={collapsed ? item.label : ''}
              >
                <span className="sidebar-link-icon"><Icon /></span>
                <span className="sidebar-link-text">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <button className="sidebar-link" onClick={handleLogout} title={collapsed ? 'Logout' : ''}>
            <span className="sidebar-link-icon"><HiOutlineArrowRightOnRectangle /></span>
            <span className="sidebar-link-text">Logout</span>
          </button>
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">BK</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">Bharath K</div>
              <div className="sidebar-user-role">Administrator</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
