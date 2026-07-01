import type { CSSProperties } from 'react';

interface ButtonProps {
  children: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  style?: CSSProperties;
}

const baseStyle: CSSProperties = {
  padding: '14px 36px',
  fontSize: '1.1rem',
  fontWeight: 700,
  border: 'none',
  borderRadius: '12px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  textTransform: 'uppercase',
  letterSpacing: '1px',
};

export function Button({ children, onClick, variant = 'primary', disabled, style }: ButtonProps) {
  const colors: Record<string, CSSProperties> = {
    primary: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#fff',
      boxShadow: '0 4px 15px rgba(102,126,234,0.4)',
    },
    secondary: {
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      color: '#fff',
      boxShadow: '0 4px 15px rgba(245,87,108,0.4)',
    },
    danger: {
      background: 'linear-gradient(135deg, #fc5c7d 0%, #6a82fb 100%)',
      color: '#fff',
      boxShadow: '0 4px 15px rgba(252,92,125,0.4)',
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...baseStyle,
        ...colors[variant],
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
    >
      {children}
    </button>
  );
}
