import React from 'react';
import { FiCheckCircle, FiClock, FiAlertTriangle, FiList } from 'react-icons/fi';

export default function StatsBar({ stats }) {
  if (!stats) return null;

  const items = [
    { label: 'Total', value: stats.total, icon: <FiList />, color: '#6366f1' },
    { label: 'Completed', value: stats.completed, icon: <FiCheckCircle />, color: '#10b981' },
    { label: 'Pending', value: stats.pending, icon: <FiClock />, color: '#f59e0b' },
    { label: 'High Priority', value: stats.high_priority_count, icon: <FiAlertTriangle />, color: '#ef4444' },
  ];

  return (
    <div className="stats-bar">
      {items.map((item) => (
        <div key={item.label} className="stat-card" style={{ borderTopColor: item.color }}>
          <div className="stat-icon" style={{ color: item.color }}>{item.icon}</div>
          <div className="stat-info">
            <span className="stat-value">{item.value || 0}</span>
            <span className="stat-label">{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
