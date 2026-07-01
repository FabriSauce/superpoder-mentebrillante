import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useGame } from '../engine/GameContext';
import type { ThemeConfig, LevelConfig } from '../types';
import { Modal } from '../components/Modal/Modal';
import { Button } from '../components/Button/Button';

const cardStyle: CSSProperties = {
  background: '#fff',
  borderRadius: '20px',
  padding: '2rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
  textAlign: 'center',
  border: '3px solid transparent',
};

const iconStyle: CSSProperties = {
  fontSize: '4rem',
  marginBottom: '1rem',
  display: 'block',
};

const difficultyOptions = [
  {
    id: 'facil',
    ageRange: '4 a 6 años',
    label: 'Explorador Junior',
    emoji: '🐣',
    description: 'Letras y rompecabezas sencillos.',
    color: '#4caf50',
    bgGradient: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
    borderActive: '#2e7d32',
  },
  {
    id: 'medio',
    ageRange: '7 a 9 años',
    label: 'Súper Explorador',
    emoji: '🦊',
    description: 'Palabras más largas y mayor desafío.',
    color: '#ff9800',
    bgGradient: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
    borderActive: '#ef6c00',
  },
  {
    id: 'dificil',
    ageRange: '10 o más años',
    label: 'Leyenda del Espacio',
    emoji: '🦁',
    description: 'Criptogramas complejos y más piezas.',
    color: '#9c27b0',
    bgGradient: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
    borderActive: '#6a1b9a',
  },
];

interface ThemeCardProps {
  theme: ThemeConfig;
  onClick: () => void;
}

function ThemeCard({ theme, onClick }: ThemeCardProps) {
  return (
    <div
      style={cardStyle}
      onClick={onClick}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
        e.currentTarget.style.borderColor = theme.primaryColor;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
        e.currentTarget.style.borderColor = 'transparent';
      }}
    >
      <span style={iconStyle}>{theme.icon}</span>
      <h2 style={{ margin: '0 0 0.5rem', color: theme.primaryColor }}>{theme.name}</h2>
      <p style={{ color: '#777', margin: 0, fontSize: '0.9rem' }}>{theme.description}</p>
    </div>
  );
}

export function Home() {
  const { state, dispatch } = useGame();
  const [selectedTheme, setSelectedTheme] = useState<ThemeConfig | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleThemeClick = (theme: ThemeConfig) => {
    setSelectedTheme(theme);
  };

  const handleSelectDifficulty = async (difficultyId: string) => {
    if (!selectedTheme) return;
    setIsLoading(true);
    try {
      dispatch({ type: 'SELECT_THEME', payload: selectedTheme });

      // Cargar únicamente el nivel que corresponde a la dificultad elegida
      const res = await fetch(`${import.meta.env.BASE_URL}${selectedTheme.dataPath}/${difficultyId}.json`);
      if (!res.ok) {
        throw new Error(`No se pudo cargar el archivo de dificultad: ${difficultyId}`);
      }
      const level: LevelConfig = await res.json();

      dispatch({ type: 'SET_LEVELS', payload: [level] });
      dispatch({ type: 'START_LEVEL' });
      setSelectedTheme(null);
    } catch (e) {
      console.error('Error al cargar la dificultad:', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem 1rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{
          fontSize: '2.2rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 0 0.5rem',
        }}>
          {state.config?.title ?? 'Superpoder: Mente Brillante'}
        </h1>
        <p style={{ color: '#888', fontSize: '1.1rem' }}>
          Elige un tema para comenzar
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1.5rem',
      }}>
        {state.themes.map(theme => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            onClick={() => handleThemeClick(theme)}
          />
        ))}
      </div>

      <Modal
        open={selectedTheme !== null}
        title="¡Elige tu nivel de Súper Héroe!"
        onClose={() => {
          if (!isLoading) setSelectedTheme(null);
        }}
      >
        <p style={{ color: '#666', margin: '0 0 1.5rem', fontSize: '1rem' }}>
          Selecciona la dificultad adecuada para tu edad:
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.2rem',
          marginBottom: '2rem',
        }}>
          {difficultyOptions.map((opt) => (
            <div
              key={opt.id}
              onClick={() => !isLoading && handleSelectDifficulty(opt.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                e.currentTarget.style.borderColor = opt.borderActive;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'transparent';
              }}
              style={{
                background: opt.bgGradient,
                border: '3px solid transparent',
                borderRadius: '16px',
                padding: '1.5rem 1.2rem',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'center',
                boxSizing: 'border-box',
              }}
            >
              <div style={{
                background: opt.color,
                color: '#fff',
                borderRadius: '20px',
                padding: '4px 12px',
                fontSize: '0.85rem',
                fontWeight: 700,
                display: 'inline-block',
                marginBottom: '0.8rem',
              }}>
                {opt.ageRange}
              </div>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{opt.emoji}</div>
              <h3 style={{ margin: '0 0 0.5rem', color: opt.borderActive, fontSize: '1.2rem' }}>
                {opt.label}
              </h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#555', lineHeight: '1.3' }}>
                {opt.description}
              </p>
            </div>
          ))}
        </div>

        <Button
          variant="danger"
          disabled={isLoading}
          onClick={() => setSelectedTheme(null)}
          style={{ width: '100%', maxWidth: '200px' }}
        >
          Atrás
        </Button>
      </Modal>
    </div>
  );
}

