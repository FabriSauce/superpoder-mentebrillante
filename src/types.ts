export interface LevelCode {
  symbols: Record<string, string>;
  secret: string;
  answer: string;
}

export interface LevelPuzzle {
  image: string;
  rows: number;
  cols: number;
}

export interface LevelConfig {
  id: string;
  titulo: string;
  codigo: LevelCode;
  puzzle: LevelPuzzle;
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
  primaryColor: string;
  secondaryColor: string;
  levels: string[];
  dataPath: string;
}

export interface GameConfig {
  title: string;
  showTimer: boolean;
  showProgress: boolean;
  sounds: boolean;
  animations: boolean;
}

export interface PuzzlePiece {
  id: number;
  currentIndex: number;
  dataUrl: string;
}

export type GamePhase = 'home' | 'theme' | 'code' | 'puzzle' | 'levelComplete' | 'gameComplete';

export interface GameState {
  phase: GamePhase;
  config: GameConfig | null;
  themes: ThemeConfig[];
  currentTheme: ThemeConfig | null;
  currentLevelIndex: number;
  levels: LevelConfig[];
  score: number;
  errors: number;
  startTime: number | null;
}

export type GameAction =
  | { type: 'SET_CONFIG'; payload: GameConfig }
  | { type: 'SET_THEMES'; payload: ThemeConfig[] }
  | { type: 'SELECT_THEME'; payload: ThemeConfig }
  | { type: 'SET_LEVELS'; payload: LevelConfig[] }
  | { type: 'START_LEVEL' }
  | { type: 'CODE_COMPLETE' }
  | { type: 'PUZZLE_COMPLETE' }
  | { type: 'NEXT_LEVEL' }
  | { type: 'GAME_COMPLETE' }
  | { type: 'ADD_ERROR' }
  | { type: 'ADD_SCORE'; payload: number }
  | { type: 'GO_HOME' };
