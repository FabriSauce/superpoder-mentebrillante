import { GameProvider, useGame } from './engine/GameContext';
import { Home } from './pages/Home';
import { Game } from './pages/Game';
import { GameComplete } from './pages/GameComplete';

function AppContent() {
  const { state } = useGame();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '1rem',
      boxSizing: 'border-box',
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '24px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2.5rem 2rem',
        minHeight: 'calc(100vh - 2rem)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        {state.phase === 'home' && <Home />}
        {(state.phase === 'code' || state.phase === 'puzzle' || state.phase === 'levelComplete') && <Game />}
        {state.phase === 'gameComplete' && <GameComplete />}
      </div>
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;
