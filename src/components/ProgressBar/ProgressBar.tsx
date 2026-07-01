import type { CSSProperties } from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  primaryColor?: string;
}

export function ProgressBar({ current, total, primaryColor = '#667eea' }: ProgressBarProps) {
  const pct = total > 0 ? (current / total) * 100 : 0;

  const containerStyle: CSSProperties = {
    width: '100%',
    height: '12px',
    background: '#e0e0e0',
    borderRadius: '6px',
    overflow: 'hidden',
  };

  const fillStyle: CSSProperties = {
    width: `${pct}%`,
    height: '100%',
    background: `linear-gradient(90deg, ${primaryColor}, #764ba2)`,
    borderRadius: '6px',
    transition: 'width 0.5s ease',
  };

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <div style={containerStyle}>
        <div style={fillStyle} />
      </div>
      <p style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: '#666' }}>
        Nivel {current} de {total}
      </p>
    </div>
  );
}
