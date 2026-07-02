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
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

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

  const swapPieces = (from: number, to: number) => {
    const next = [...pieces];
    [next[from], next[to]] = [next[to], next[from]];
    next[from] = { ...next[from], currentIndex: from };
    next[to] = { ...next[to], currentIndex: to };
    setPieces(next);

    if (isPuzzleComplete(next)) {
      setComplete(true);
      setTimeout(onComplete, 800);
    }
  };

  const handlePieceClick = (index: number) => {
    if (complete) return;

    if (selected === null) {
      setSelected(index);
    } else if (selected === index) {
      setSelected(null);
    } else {
      swapPieces(selected, index);
      setSelected(null);
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (complete) return;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (complete) return;
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    if (complete) return;
    e.preventDefault();
    const sourceIndexStr = e.dataTransfer.getData('text/plain');
    const sourceIndex = sourceIndexStr ? parseInt(sourceIndexStr, 10) : draggedIndex;
    if (sourceIndex === null || sourceIndex === targetIndex) return;

    swapPieces(sourceIndex, targetIndex);
    setDraggedIndex(null);
    setSelected(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '2rem', animation: 'spin 1s linear infinite' }}>🌀</div>
        <p style={{ color: '#666' }}>Preparando rompecabezas...</p>
      </div>
    );
  }

  const gap = 2;
  const isDesktop = window.innerWidth >= 768;
  const containerWidth = isDesktop
    ? Math.min(750, window.innerWidth - 320)
    : Math.min(480, window.innerWidth - 32);

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

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '1.5rem',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '1rem',
      }}>
        {/* Contenedor del tablero del rompecabezas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: `${gap}px`,
            width: '100%',
            maxWidth: `${containerWidth}px`,
            background: '#e0e0e0',
            padding: `${gap}px`,
            borderRadius: '12px',
          }}
        >
          {pieces.map((piece, i) => {
            const isSelected = selected === i;
            const isDragging = draggedIndex === i;
            return (
              <div
                key={piece.id}
                onClick={() => handlePieceClick(i)}
                draggable={!complete}
                onDragStart={e => handleDragStart(e, i)}
                onDragOver={handleDragOver}
                onDrop={e => handleDrop(e, i)}
                onDragEnd={handleDragEnd}
                style={{
                  aspectRatio: `${aspectRatio}`,
                  backgroundImage: `url(${piece.dataUrl})`,
                  backgroundSize: '100% 100%',
                  backgroundPosition: 'center',
                  border: '1px solid rgba(0,0,0,0.15)',
                  borderRadius: '3px',
                  cursor: complete ? 'default' : isSelected || isDragging ? 'grabbing' : 'grab',
                  transition: 'all 0.2s ease',
                  opacity: isDragging ? 0.5 : 1,
                  transform: isSelected || isDragging ? 'scale(0.96)' : 'scale(1)',
                  boxShadow: isSelected ? '0 0 0 3px #667eea, 0 8px 24px rgba(102,126,234,0.4)' : '0 2px 6px rgba(0,0,0,0.08)',
                }}
              />
            );
          })}
        </div>

        {/* Contenedor de la guía visual */}
        {!complete && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: isDesktop ? '220px' : '160px',
            background: 'rgba(255, 255, 255, 0.7)',
            padding: '1rem',
            borderRadius: '16px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            border: '1px solid #eaeaea',
          }}>
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
                    maxWidth: isDesktop ? '200px' : '150px',
                    width: '100%',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    border: '4px solid #ffffff',
                    background: '#ffffff',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    cursor: 'zoom-in',
                    position: 'relative',
                    zIndex: 1,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(2.2)';
                    e.currentTarget.style.zIndex = '10';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.zIndex = '1';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
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
      </div>

      {complete && (
        <div style={{ marginTop: '1rem', fontSize: '2rem', animation: 'bounceIn 0.5s ease' }}>
          🎉
        </div>
      )}
    </div>
  );
}
