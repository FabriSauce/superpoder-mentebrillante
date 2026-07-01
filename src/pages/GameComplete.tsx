import { useGame, useSounds } from '../engine/GameContext';
import { Button } from '../components/Button/Button';
import { formatTime, getElapsedSeconds } from '../utils/timer';
import { useEffect } from 'react';

export function GameComplete() {
  const { state, dispatch } = useGame();
  const { play } = useSounds();

  useEffect(() => {
    if (state.phase === 'gameComplete') {
      play('finish');
    }
  }, []);

  const totalTime = state.startTime ? formatTime(getElapsedSeconds(state.startTime)) : '00:00';

  return (
    <div style={{
      maxWidth: '500px',
      margin: '0 auto',
      padding: '3rem 1rem',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '5rem', marginBottom: '1rem', animation: 'bounceIn 0.6s ease' }}>
        🏆
      </div>

      <h1 style={{
        fontSize: '2.2rem',
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        margin: '0 0 2rem',
      }}>
        ¡Juego Completado!
      </h1>

      <div style={{
        background: '#fff',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
        marginBottom: '2rem',
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ color: '#999', margin: '0 0 0.25rem' }}>Puntaje Final</p>
          <p style={{ fontSize: '3rem', fontWeight: 800, color: '#667eea', margin: 0 }}>
            {state.score}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ background: '#f5f5f5', borderRadius: '12px', padding: '1rem' }}>
            <p style={{ color: '#999', margin: '0 0 0.25rem', fontSize: '0.85rem' }}>Tiempo</p>
            <p style={{ fontSize: '1.3rem', fontWeight: 700, color: '#555', margin: 0 }}>
              ⏱ {totalTime}
            </p>
          </div>
          <div style={{ background: '#f5f5f5', borderRadius: '12px', padding: '1rem' }}>
            <p style={{ color: '#999', margin: '0 0 0.25rem', fontSize: '0.85rem' }}>Errores</p>
            <p style={{ fontSize: '1.3rem', fontWeight: 700, color: '#555', margin: 0 }}>
              ❌ {state.errors}
            </p>
          </div>
        </div>
      </div>

      <Button onClick={() => dispatch({ type: 'GO_HOME' })}>
        Jugar de nuevo
      </Button>
    </div>
  );
}
