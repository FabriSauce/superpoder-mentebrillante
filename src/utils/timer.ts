export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function getElapsedSeconds(startTime: number): number {
  return Math.floor((Date.now() - startTime) / 1000);
}
