import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar/Sidebar';
import TopBar from './components/TopBar/TopBar';
import StatsCards from './components/StatsCards/StatsCards';
import Charts from './components/Charts/Charts';
import ActivityTable from './components/ActivityTable/ActivityTable';
import QuickActions from './components/QuickActions/QuickActions';
import { useTheme } from './context/ThemeContext';
import './App.css';

export default function App() {
  const { theme } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="app-layout">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: '14px',
            fontFamily: 'var(--font-family)',
          },
        }}
      />

      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
      />

      <div className={`main-area ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <TopBar
          collapsed={sidebarCollapsed}
          onMenuClick={() => setMobileMenuOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <main className="main-content">
          {/* Header */}
          <div className="dashboard-header">
            <h1 className="dashboard-greeting">
              Welcome back, Bharath <span className="dashboard-greeting-wave">👋</span>
            </h1>
            <p className="dashboard-subtext">Here's what's happening with your projects today.</p>
            <p className="dashboard-date">{today}</p>
          </div>

          {/* Stats */}
          <StatsCards />

          {/* Charts */}
          <Charts />

          {/* Quick Actions */}
          <QuickActions />

          {/* Activity Table */}
          <ActivityTable searchQuery={searchQuery} />

          {/* Footer */}
          <footer className="dashboard-footer">
            <p>© 2026 <a href="#">cerso.</a> — Built with ❤️ for the Web Development Internship</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
