import { useState, useEffect } from 'react';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';
import { revenueChartData, activityChartData } from '../../data/dashboardData';
import './Charts.css';

/* Transform data for Recharts */
const revenueData = revenueChartData.labels.map((label, i) => ({
  month: label,
  '2026': revenueChartData.datasets[0].data[i],
  '2025': revenueChartData.datasets[1].data[i],
}));

const activityData = activityChartData.labels.map((label, i) => ({
  day: label,
  'Page Views': activityChartData.datasets[0].data[i],
  'Unique Visitors': activityChartData.datasets[1].data[i],
}));

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-light)',
      borderRadius: 'var(--radius-md)',
      padding: '12px 16px',
      boxShadow: 'var(--shadow-lg)',
    }}>
      <p style={{ fontWeight: 600, fontSize: 'var(--font-sm)', color: 'var(--text-primary)', marginBottom: 6 }}>
        {label}
      </p>
      {payload.map((entry, idx) => (
        <p key={idx} style={{ fontSize: 'var(--font-xs)', color: entry.color, margin: '2px 0' }}>
          {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
        </p>
      ))}
    </div>
  );
}

function ChartSkeleton() {
  const heights = [60, 80, 50, 90, 70, 40, 75, 85, 55, 95, 65, 45];
  return (
    <div className="chart-skeleton">
      <div className="chart-skeleton-header">
        <div>
          <div className="skeleton skeleton-text" style={{ width: '140px', height: '16px' }} />
          <div className="skeleton skeleton-text" style={{ width: '100px', height: '12px', marginTop: 6 }} />
        </div>
        <div className="skeleton" style={{ width: '160px', height: '28px', borderRadius: 'var(--radius-sm)' }} />
      </div>
      <div className="chart-skeleton-body">
        {heights.map((h, i) => (
          <div key={i} className="chart-skeleton-bar" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

export default function Charts() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [revenuePeriod, setRevenuePeriod] = useState('yearly');
  const [activityPeriod, setActivityPeriod] = useState('weekly');

  const gridColor = theme === 'dark' ? '#1e293b' : '#f1f5f9';
  const textColor = theme === 'dark' ? '#94a3b8' : '#64748b';

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="charts-grid">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    );
  }

  return (
    <div className="charts-grid">
      {/* Revenue Chart */}
      <div className="chart-card animate-fade-in stagger-5" id="revenue-chart">
        <div className="chart-card-header">
          <div>
            <h3 className="chart-card-title">Monthly Revenue</h3>
            <p className="chart-card-subtitle">Compared to previous year</p>
          </div>
          <div className="chart-card-actions">
            {['monthly', 'quarterly', 'yearly'].map((p) => (
              <button
                key={p}
                className={`chart-period-btn ${revenuePeriod === p ? 'active' : ''}`}
                onClick={() => setRevenuePeriod(p)}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="grad2026" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b5bf7" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#3b5bf7" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="grad2025" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
              <Area type="monotone" dataKey="2026" stroke="#3b5bf7" strokeWidth={2.5}
                fill="url(#grad2026)" dot={false} activeDot={{ r: 5, fill: '#3b5bf7' }}
                animationDuration={1500} animationEasing="ease-out" />
              <Area type="monotone" dataKey="2025" stroke="#8b5cf6" strokeWidth={2}
                fill="url(#grad2025)" dot={false} strokeDasharray="5 5"
                activeDot={{ r: 4, fill: '#8b5cf6' }}
                animationDuration={1500} animationEasing="ease-out" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="chart-card animate-fade-in stagger-6" id="activity-chart">
        <div className="chart-card-header">
          <div>
            <h3 className="chart-card-title">Weekly Activity</h3>
            <p className="chart-card-subtitle">Page views &amp; unique visitors</p>
          </div>
          <div className="chart-card-actions">
            {['daily', 'weekly', 'monthly'].map((p) => (
              <button
                key={p}
                className={`chart-period-btn ${activityPeriod === p ? 'active' : ''}`}
                onClick={() => setActivityPeriod(p)}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
              barGap={4} barCategoryGap="25%">
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }}
                tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
              <Bar dataKey="Page Views" fill="#3b5bf7" radius={[6, 6, 0, 0]}
                animationDuration={1200} animationEasing="ease-out" />
              <Bar dataKey="Unique Visitors" fill="#8b5cf6" radius={[6, 6, 0, 0]}
                animationDuration={1200} animationEasing="ease-out" animationBegin={300} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
