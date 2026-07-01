import type { LevelCode } from '../types';

export function parseSecret(code: LevelCode): string {
  const symbols = code.secret.split(' ');
  return symbols.map(s => code.symbols[s] ?? '?').join('');
}

export function validateAnswer(code: LevelCode, userAnswer: string): boolean {
  const cleanAnswer = userAnswer.toUpperCase().trim();
  const expected = code.answer.toUpperCase().trim();
  return cleanAnswer === expected;
}

export function getSymbolsList(code: LevelCode): { symbol: string; letter: string }[] {
  return Object.entries(code.symbols).map(([symbol, letter]) => ({ symbol, letter }));
}

export function getSymbolSequence(code: LevelCode): string[] {
  return code.secret.split(' ');
}
