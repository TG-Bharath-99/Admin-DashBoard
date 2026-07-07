import { useState, useEffect } from 'react';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { recentActivities } from '../../data/dashboardData';
import './ActivityTable.css';

const avatarColors = [
  'linear-gradient(135deg, #3b5bf7, #60a5fa)',
  'linear-gradient(135deg, #8b5cf6, #a78bfa)',
  'linear-gradient(135deg, #10b981, #34d399)',
  'linear-gradient(135deg, #f59e0b, #fbbf24)',
  'linear-gradient(135deg, #ef4444, #f87171)',
  'linear-gradient(135deg, #ec4899, #f472b6)',
  'linear-gradient(135deg, #06b6d4, #22d3ee)',
];

function TableSkeleton() {
  return (
    <div className="table-wrapper">
      <div style={{ padding: '12px 20px', background: 'var(--bg-tertiary)' }}>
        <div className="skeleton" style={{ width: '100%', height: '14px' }} />
      </div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="table-skeleton-row">
          <div className="skeleton skeleton-circle" style={{ width: 34, height: 34, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div className="skeleton skeleton-text" style={{ width: '120px' }} />
            <div className="skeleton skeleton-text" style={{ width: '160px', height: '10px' }} />
          </div>
          <div className="skeleton" style={{ width: '80px', height: '24px', borderRadius: 'var(--radius-full)' }} />
          <div className="skeleton" style={{ width: '80px', height: '14px' }} />
          <div className="skeleton" style={{ width: '100px', height: '28px', borderRadius: 'var(--radius-sm)' }} />
        </div>
      ))}
    </div>
  );
}

export default function ActivityTable({ searchQuery }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredActivities = recentActivities.filter((activity) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      activity.name.toLowerCase().includes(query) ||
      activity.action.toLowerCase().includes(query) ||
      activity.status.toLowerCase().includes(query) ||
      activity.email.toLowerCase().includes(query)
    );
  });

  const handleView = (name) => {
    toast.success(`Viewing details for ${name}`, {
      style: {
        borderRadius: '10px',
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-light)',
      },
    });
  };

  const handleEdit = (name) => {
    toast(`Editing record for ${name}`, {
      icon: '✏️',
      style: {
        borderRadius: '10px',
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-light)',
      },
    });
  };

  if (loading) return <div className="activity-section"><TableSkeleton /></div>;

  return (
    <div className="activity-section animate-fade-in" id="activity-table">
      <div className="section-header">
        <div>
          <h2 className="section-title">Recent Activity</h2>
          <p className="section-subtitle">Latest actions from your team</p>
        </div>
        <button className="section-action-btn" onClick={() => toast.success('Full report generated!', {
          style: { borderRadius: '10px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-light)' }
        })}>
          View All
        </button>
      </div>

      <div className="table-wrapper">
        <div className="table-scroll">
          <table className="activity-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.length === 0 ? (
                <tr>
                  <td colSpan="4">
                    <div className="no-results">
                      <div className="no-results-icon"><HiOutlineMagnifyingGlass /></div>
                      <div className="no-results-text">No matching activities found</div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredActivities.map((activity, idx) => (
                  <tr key={activity.id}>
                    <td>
                      <div className="table-user">
                        <div
                          className="table-user-avatar"
                          style={{ background: avatarColors[idx % avatarColors.length] }}
                        >
                          {activity.avatar}
                        </div>
                        <div className="table-user-info">
                          <div className="table-user-name">{activity.name}</div>
                          <div className="table-user-email">{activity.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${activity.status.toLowerCase()}`}>
                        {activity.status}
                      </span>
                    </td>
                    <td>
                      <div className="table-date">
                        <div className="table-date-main">{activity.date}</div>
                        <div className="table-date-time">{activity.time}</div>
                      </div>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button className="table-action-btn view" onClick={() => handleView(activity.name)}>
                          View
                        </button>
                        <button className="table-action-btn edit" onClick={() => handleEdit(activity.name)}>
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
