import { useState, useEffect } from 'react';
import { useGame, useSounds } from '../engine/GameContext';
import { SecretCode } from '../components/SecretCode/SecretCode';
import { Puzzle } from '../components/Puzzle/Puzzle';
import { ProgressBar } from '../components/ProgressBar/ProgressBar';
import { Button } from '../components/Button/Button';
import { Modal } from '../components/Modal/Modal';
import { formatTime, getElapsedSeconds } from '../utils/timer';

export function Game() {
  const { state, dispatch } = useGame();
  const { play } = useSounds();
  const [elapsed, setElapsed] = useState(0);
  const [showLevelComplete, setShowLevelComplete] = useState(false);

  const level = state.levels[state.currentLevelIndex];
  const isLastLevel = state.currentLevelIndex >= state.levels.length - 1;
  const showTimer = state.config?.showTimer ?? true;
  const showProgress = state.config?.showProgress ?? true;

  useEffect(() => {
    if (!state.startTime || state.phase === 'home' || state.phase === 'gameComplete') return;
    const interval = setInterval(() => {
      setElapsed(getElapsedSeconds(state.startTime!));
    }, 1000);
    return () => clearInterval(interval);
  }, [state.startTime, state.phase]);

  const handleCodeCorrect = () => {
    play('success');
    dispatch({ type: 'ADD_SCORE', payload: 100 });
    dispatch({ type: 'CODE_COMPLETE' });
  };

  const handleCodeError = () => {
    play('error');
    dispatch({ type: 'ADD_ERROR' });
  };

  const handlePuzzleComplete = () => {
    play('finish');
    dispatch({ type: 'ADD_SCORE', payload: 200 });
    dispatch({ type: 'PUZZLE_COMPLETE' });

    if (!isLastLevel) {
      setShowLevelComplete(true);
    } else {
      dispatch({ type: 'GAME_COMPLETE' });
    }
  };

  const handleNextLevel = () => {
    setShowLevelComplete(false);
    dispatch({ type: 'NEXT_LEVEL' });
  };

  if (!level) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <p>Cargando nivel...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1rem', width: '100%' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}>
        <Button variant="danger" onClick={() => dispatch({ type: 'GO_HOME' })}>
          ← Salir
        </Button>

        {showTimer && (
          <div style={{
            padding: '8px 16px',
            background: '#f0f0f0',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '1.2rem',
            fontWeight: 700,
            color: '#555',
          }}>
            ⏱ {formatTime(elapsed)}
          </div>
        )}

        <div style={{
          padding: '8px 16px',
          background: '#f0f0f0',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: 700,
          color: '#555',
        }}>
          ⭐ {state.score}
        </div>
      </div>

      {showProgress && (
        <ProgressBar
          current={state.currentLevelIndex + 1}
          total={state.levels.length}
          primaryColor={state.currentTheme?.primaryColor}
        />
      )}

      <h2 style={{
        textAlign: 'center',
        color: state.currentTheme?.primaryColor ?? '#555',
        margin: '1.5rem 0',
        fontSize: '2rem',
      }}>
        {level.titulo}
      </h2>

      {state.phase === 'code' && (
        <SecretCode
          code={level.codigo}
          onCorrect={handleCodeCorrect}
          onError={handleCodeError}
        />
      )}

      {state.phase === 'puzzle' && (
        <Puzzle
          image={level.puzzle.image}
          rows={level.puzzle.rows}
          cols={level.puzzle.cols}
          onComplete={handlePuzzleComplete}
        />
      )}

      <Modal
        open={showLevelComplete}
        title="¡Nivel Completado!"
        onClose={handleNextLevel}
      >
        <p style={{ fontSize: '3rem', margin: '0 0 1rem' }}>🎉</p>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          Puntaje: +300 puntos
        </p>
        <Button onClick={handleNextLevel}>
          {isLastLevel ? 'Ver resultado' : 'Siguiente nivel →'}
        </Button>
      </Modal>
    </div>
  );
}
