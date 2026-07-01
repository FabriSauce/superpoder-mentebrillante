import { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { GameState, GameAction, ThemeConfig } from '../types';
import { playSound } from '../utils/sounds';

const initialState: GameState = {
  phase: 'home',
  config: null,
  themes: [],
  currentTheme: null,
  currentLevelIndex: 0,
  levels: [],
  score: 0,
  errors: 0,
  startTime: null,
};

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_CONFIG':
      return { ...state, config: action.payload };
    case 'SET_THEMES':
      return { ...state, themes: action.payload };
    case 'SELECT_THEME':
      return { ...state, currentTheme: action.payload, phase: 'theme' };
    case 'SET_LEVELS':
      return { ...state, levels: action.payload };
    case 'START_LEVEL':
      return {
        ...state,
        phase: 'code',
        startTime: Date.now(),
      };
    case 'CODE_COMPLETE':
      return { ...state, phase: 'puzzle' };
    case 'PUZZLE_COMPLETE': {
      const nextIndex = state.currentLevelIndex + 1;
      if (nextIndex >= state.levels.length) {
        return { ...state, phase: 'gameComplete' };
      }
      return { ...state, phase: 'levelComplete' };
    }
    case 'NEXT_LEVEL':
      return {
        ...state,
        currentLevelIndex: state.currentLevelIndex + 1,
        phase: 'code',
      };
    case 'GAME_COMPLETE':
      return { ...state, phase: 'gameComplete' };
    case 'ADD_ERROR':
      return { ...state, errors: state.errors + 1 };
    case 'ADD_SCORE':
      return { ...state, score: state.score + action.payload };
    case 'GO_HOME':
      return {
        ...initialState,
        config: state.config,
        themes: state.themes,
      };
    default:
      return state;
  }
}

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const [configRes, themesRes] = await Promise.all([
          fetch(`${import.meta.env.BASE_URL}config.json`),
          fetch(`${import.meta.env.BASE_URL}themes/index.json`),
        ]);
        const config = await configRes.json();
        const themeList: string[] = await themesRes.json();

        const themes: ThemeConfig[] = await Promise.all(
          themeList.map(async (t) => {
            const res = await fetch(`${import.meta.env.BASE_URL}themes/${t}.json`);
            return res.json();
          })
        );

        dispatch({ type: 'SET_CONFIG', payload: config });
        dispatch({ type: 'SET_THEMES', payload: themes });
      } catch (e) {
        console.error('Failed to load config:', e);
      }
    })();
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}

export function useSounds() {
  const { state } = useGame();
  const enabled = state.config?.sounds ?? false;

  return {
    play: (name: string) => playSound(name, enabled),
    enabled,
  };
}
