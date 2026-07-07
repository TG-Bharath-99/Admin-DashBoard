import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { statsData } from '../../data/dashboardData';
import './StatsCards.css';

function AnimatedCounter({ value, prefix = '', suffix = '', duration = 1500 }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.round(eased * value));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  const formattedValue = displayValue.toLocaleString();

  return (
    <span ref={ref}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
}

function SkeletonCard() {
  return (
    <div className="stat-card-skeleton">
      <div className="skeleton-row">
        <div className="skeleton skeleton-text" style={{ width: '80px', height: '12px' }} />
        <div className="skeleton skeleton-circle" style={{ width: '40px', height: '40px' }} />
      </div>
      <div className="skeleton skeleton-text" style={{ width: '120px', height: '28px', marginBottom: '12px' }} />
      <div className="skeleton skeleton-text" style={{ width: '100px', height: '14px' }} />
    </div>
  );
}

export default function StatsCards() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="stats-grid">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="stats-grid">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trendIcon;
        return (
          <div
            key={stat.id}
            className={`stat-card animate-fade-in stagger-${index + 1}`}
            style={{ '--glow-color': stat.gradient }}
            id={`stat-${stat.id}`}
          >
            <div className="stat-card-header">
              <span className="stat-card-title">{stat.title}</span>
              <div
                className="stat-card-icon"
                style={{ background: stat.gradient }}
              >
                <Icon />
              </div>
            </div>
            <div className="stat-card-value">
              <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </div>
            <div className="stat-card-footer">
              <span className={`stat-card-trend ${stat.trend}`}>
                <TrendIcon size={13} />
                {Math.abs(stat.change)}%
              </span>
              <span className="stat-card-trend-text">vs last month</span>
            </div>
            <div
              className="stat-card-glow"
              style={{
                position: 'absolute',
                top: '-30px',
                right: '-30px',
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                background: stat.gradient,
                opacity: 0.06,
                pointerEvents: 'none',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
