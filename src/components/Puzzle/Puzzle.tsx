import { useState, useEffect } from 'react';
import { splitImage, shufflePieces, isPuzzleComplete } from '../../engine/PuzzleEngine';
import type { PuzzlePiece } from '../../types';

interface PuzzleProps {
  image: string;
  rows: number;
  cols: number;
  onComplete: () => void;
}

export function Puzzle({ image, rows, cols, onComplete }: PuzzleProps) {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [complete, setComplete] = useState(false);
  const [showGuide, setShowGuide] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { pieces: split, aspectRatio: ar } = await splitImage(`${import.meta.env.BASE_URL}${image}`, rows, cols);
      setAspectRatio(ar);
      const shuffled = shufflePieces(split);
      setPieces(shuffled);
      setLoading(false);
    })();
  }, [image, rows, cols]);

  const handlePieceClick = (index: number) => {
    if (complete) return;

    if (selected === null) {
      setSelected(index);
    } else if (selected === index) {
      setSelected(null);
    } else {
      const next = [...pieces];
      [next[selected], next[index]] = [next[index], next[selected]];
      next[selected] = { ...next[selected], currentIndex: selected };
      next[index] = { ...next[index], currentIndex: index };
      setPieces(next);
      setSelected(null);

      if (isPuzzleComplete(next)) {
        setComplete(true);
        setTimeout(onComplete, 800);
      }
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '2rem', animation: 'spin 1s linear infinite' }}>🌀</div>
        <p style={{ color: '#666' }}>Preparando rompecabezas...</p>
      </div>
    );
  }

  const gap = 4;
  const containerWidth = Math.min(500, window.innerWidth - 32);

  return (
    <div style={{ textAlign: 'center', padding: '0.5rem' }}>
      <h3 style={{ color: '#555', marginBottom: '0.5rem' }}>
        {complete ? '¡Completado!' : 'Arma el rompecabezas'}
      </h3>
      {!complete && (
        <p style={{ color: '#999', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
          Toca dos piezas para intercambiarlas
        </p>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: `${gap}px`,
          maxWidth: `${containerWidth}px`,
          margin: '0 auto',
          background: '#e0e0e0',
          padding: `${gap}px`,
          borderRadius: '12px',
        }}
      >
        {pieces.map((piece, i) => {
          const isSelected = selected === i;
          return (
            <div
              key={piece.id}
              onClick={() => handlePieceClick(i)}
              style={{
                aspectRatio: `${aspectRatio}`,
                backgroundImage: `url(${piece.dataUrl})`,
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                border: isSelected ? '3px solid #667eea' : '3px solid transparent',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                transform: isSelected ? 'scale(0.95)' : 'scale(1)',
                boxShadow: isSelected ? '0 0 20px rgba(102,126,234,0.5)' : '0 2px 8px rgba(0,0,0,0.1)',
              }}
            />
          );
        })}
      </div>

      {!complete && (
        <div style={{ marginTop: '1.5rem' }}>
          <button
            onClick={() => setShowGuide(!showGuide)}
            style={{
              background: '#f0f0f0',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 16px',
              fontSize: '0.85rem',
              color: '#555',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
              outline: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e4e4e4';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f0f0f0';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {showGuide ? '👁️ Ocultar Guía' : '👁️ Mostrar Guía'}
          </button>

          {showGuide && (
            <div
              style={{
                marginTop: '1rem',
                opacity: 1,
                transition: 'opacity 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <p style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', color: '#777', fontWeight: 600 }}>
                Así debe quedar:
              </p>
              <div
                style={{
                  maxWidth: '150px',
                  width: '100%',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  border: '4px solid #ffffff',
                  background: '#ffffff',
                  transition: 'transform 0.2s ease',
                  cursor: 'zoom-in',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${image}`}
                  alt="Guía del rompecabezas"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {complete && (
        <div style={{ marginTop: '1rem', fontSize: '2rem', animation: 'bounceIn 0.5s ease' }}>
          🎉
        </div>
      )}
    </div>
  );
}
