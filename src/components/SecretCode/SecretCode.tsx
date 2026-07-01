import { useState, type CSSProperties } from 'react';
import { getSymbolsList, getSymbolSequence, validateAnswer } from '../../engine/CodeEngine';
import type { LevelCode } from '../../types';

interface SecretCodeProps {
  code: LevelCode;
  onCorrect: () => void;
  onError: () => void;
}

const symbolStyle: CSSProperties = {
  fontSize: '2.5rem',
  margin: '0 8px',
  display: 'inline-block',
  animation: 'pulse 1.5s ease infinite',
};

const inputStyle: CSSProperties = {
  padding: '12px 16px',
  fontSize: '1.2rem',
  border: '3px solid #ddd',
  borderRadius: '10px',
  textAlign: 'center',
  letterSpacing: '4px',
  textTransform: 'uppercase',
  width: '200px',
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
      <h3 style={{ color: '#555', marginBottom: '1rem' }}>Descifra el código secreto</h3>

      <div style={{ marginBottom: '1.5rem' }}>
        {symbols.map(({ symbol, letter }) => (
          <div
            key={symbol}
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '0 12px',
              padding: '8px 16px',
              background: '#f5f5f5',
              borderRadius: '10px',
            }}
          >
            <span style={{ fontSize: '2rem' }}>{symbol}</span>
            <span style={{ fontSize: '0.8rem', color: '#999', marginTop: '4px' }}>= {letter}</span>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ color: '#777', marginBottom: '0.5rem' }}>Código:</p>
        <div>
          {sequence.map((s, i) => (
            <span key={i} style={symbolStyle}>
              {s}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <input
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
            padding: '12px 32px',
            fontSize: '1.1rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(102,126,234,0.4)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          Verificar
        </button>
      </div>
    </div>
  );
}
