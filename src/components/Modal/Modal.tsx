import type { CSSProperties, ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose?: () => void;
}

const overlayStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  animation: 'fadeIn 0.3s ease',
};

const modalStyle: CSSProperties = {
  background: '#fff',
  borderRadius: '20px',
  padding: '2rem',
  minWidth: '320px',
  maxWidth: '90vw',
  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  animation: 'slideUp 0.3s ease',
  textAlign: 'center',
};

export function Modal({ open, title, children, onClose }: ModalProps) {
  if (!open) return null;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        <h2 style={{ margin: '0 0 1rem', color: '#333', fontSize: '1.5rem' }}>{title}</h2>
        {children}
      </div>
    </div>
  );
}
