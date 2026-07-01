const soundCache: Record<string, HTMLAudioElement> = {};

const SOUND_PATHS: Record<string, string> = {
  success: `${import.meta.env.BASE_URL}sounds/success.mp3`,
  error: `${import.meta.env.BASE_URL}sounds/error.mp3`,
  click: `${import.meta.env.BASE_URL}sounds/click.mp3`,
  finish: `${import.meta.env.BASE_URL}sounds/finish.mp3`,
};

export function playSound(name: string, enabled: boolean): void {
  if (!enabled) return;

  const path = SOUND_PATHS[name];
  if (!path) return;

  try {
    if (!soundCache[name]) {
      soundCache[name] = new Audio(path);
    }
    const audio = soundCache[name].cloneNode() as HTMLAudioElement;
    audio.volume = 0.5;
    audio.play().catch(() => {});
  } catch {
    // silently fail - audio is optional
  }
}
