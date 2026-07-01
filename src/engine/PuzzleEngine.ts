import type { PuzzlePiece } from '../types';

export interface SplitResult {
  pieces: PuzzlePiece[];
  aspectRatio: number;
}

function generatePlaceholderImage(
  rows: number,
  cols: number,
  seed: string
): string {
  const size = 400;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue1 = Math.abs(hash % 360);
  const hue2 = (hue1 + 60) % 360;

  const grad = ctx.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, `hsl(${hue1}, 70%, 50%)`);
  grad.addColorStop(1, `hsl(${hue2}, 70%, 60%)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = `hsl(${(hue1 + 30) % 360}, 60%, 40%)`;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * (size / cols) + (size / cols - 30) / 2;
      const y = r * (size / rows) + (size / rows - 30) / 2;
      ctx.fillRect(x, y, 30, 30);
    }
  }

  return canvas.toDataURL('image/jpeg', 0.8);
}

export async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
}

export async function splitImage(
  imageUrl: string,
  rows: number,
  cols: number
): Promise<SplitResult> {
  let img: HTMLImageElement;

  try {
    img = await loadImage(imageUrl);
  } catch {
    const placeholder = generatePlaceholderImage(rows, cols, imageUrl);
    img = await loadImage(placeholder);
  }

  const pieceWidth = img.width / cols;
  const pieceHeight = img.height / rows;
  const aspectRatio = img.width / img.height;

  const canvas = document.createElement('canvas');
  canvas.width = pieceWidth;
  canvas.height = pieceHeight;
  const ctx = canvas.getContext('2d')!;

  const pieces: PuzzlePiece[] = [];
  let idx = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      ctx.clearRect(0, 0, pieceWidth, pieceHeight);
      ctx.drawImage(img, c * pieceWidth, r * pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);

      pieces.push({
        id: idx,
        currentIndex: idx,
        dataUrl: canvas.toDataURL('image/jpeg', 0.8),
      });

      idx++;
    }
  }

  return { pieces, aspectRatio };
}

export function shufflePieces(pieces: PuzzlePiece[]): PuzzlePiece[] {
  const shuffled = [...pieces];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.map((p, i) => ({ ...p, currentIndex: i }));
}

export function isPuzzleComplete(pieces: PuzzlePiece[]): boolean {
  return pieces.every(p => p.id === p.currentIndex);
}
