import {
  HiOutlineUserPlus,
  HiOutlineDocumentChartBar,
  HiOutlineChartBarSquare,
  HiOutlineArrowRight,
} from 'react-icons/hi2';
import toast from 'react-hot-toast';
import './QuickActions.css';

const actions = [
  {
    id: 'add-user',
    title: 'Add User',
    description: 'Create a new user account',
    icon: HiOutlineUserPlus,
    gradient: 'linear-gradient(135deg, #3b5bf7, #60a5fa)',
    message: 'New user form opened!',
  },
  {
    id: 'generate-report',
    title: 'Generate Report',
    description: 'Export analytics report',
    icon: HiOutlineDocumentChartBar,
    gradient: 'linear-gradient(135deg, #10b981, #34d399)',
    message: 'Report generation started!',
  },
  {
    id: 'view-analytics',
    title: 'View Analytics',
    description: 'Deep dive into metrics',
    icon: HiOutlineChartBarSquare,
    gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    message: 'Loading analytics dashboard...',
  },
];

export default function QuickActions() {
  const handleClick = (action) => {
    toast.success(action.message, {
      style: {
        borderRadius: '10px',
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-light)',
      },
      iconTheme: {
        primary: '#3b5bf7',
        secondary: '#fff',
      },
    });
  };

  return (
    <div className="quick-actions-section animate-fade-in" id="quick-actions">
      <div className="section-header">
        <div>
          <h2 className="section-title">Quick Actions</h2>
          <p className="section-subtitle">Common tasks at your fingertips</p>
        </div>
      </div>

      <div className="quick-actions-grid">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              className="quick-action-card"
              onClick={() => handleClick(action)}
              id={`action-${action.id}`}
            >
              <div className="quick-action-icon" style={{ background: action.gradient }}>
                <Icon />
              </div>
              <div className="quick-action-text">
                <h4>{action.title}</h4>
                <p>{action.description}</p>
              </div>
              <span className="quick-action-arrow"><HiOutlineArrowRight /></span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
