import { useState, type CSSProperties } from 'react';
import { getSymbolsList, getSymbolSequence, validateAnswer } from '../../engine/CodeEngine';
import type { LevelCode } from '../../types';

interface SecretCodeProps {
  code: LevelCode;
  onCorrect: () => void;
  onError: () => void;
}

const symbolStyle: CSSProperties = {
  fontSize: '3.5rem',
  margin: '0 12px',
  display: 'inline-block',
  animation: 'pulse 1.5s ease infinite',
};

const inputStyle: CSSProperties = {
  padding: '16px 20px',
  fontSize: '1.6rem',
  border: '3px solid #ddd',
  borderRadius: '14px',
  textAlign: 'center',
  letterSpacing: '6px',
  textTransform: 'uppercase',
  width: '280px',
  outline: 'none',
  transition: 'border-color 0.3s',
};

export function SecretCode({ code, onCorrect, onError }: SecretCodeProps) {
  const [answer, setAnswer] = useState('');
  const [shake, setShake] = useState(false);

  const symbols = getSymbolsList(code);
  const sequence = getSymbolSequence(code);

  const handleSubmit = () => {
    if (validateAnswer(code, answer)) {
      onCorrect();
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      onError();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <h3 style={{ color: '#555', marginBottom: '1.5rem', fontSize: '1.6rem' }}>Descifra el código secreto</h3>

      <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        {symbols.map(({ symbol, letter }) => (
          <div
            key={symbol}
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '12px 24px',
              background: '#f5f5f5',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }}
          >
            <span style={{ fontSize: '3.5rem' }}>{symbol}</span>
            <span style={{ fontSize: '1.2rem', color: '#777', marginTop: '4px', fontWeight: 'bold' }}>= {letter}</span>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <p style={{ color: '#666', fontSize: '1.2rem', marginBottom: '0.8rem', fontWeight: 600 }}>Código:</p>
        <div>
          {sequence.map((s, i) => (
            <span key={i} style={symbolStyle} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              {s}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <input
          className="secret-code-input"
          style={{
            ...inputStyle,
            borderColor: shake ? '#ff4444' : '#ddd',
            animation: shake ? 'shake 0.5s ease' : 'none',
          }}
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tu respuesta"
          autoFocus
        />
        <button
          onClick={handleSubmit}
          style={{
            padding: '14px 44px',
            fontSize: '1.3rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(102,126,234,0.4)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Verificar
        </button>
      </div>
    </div>
  );
}
