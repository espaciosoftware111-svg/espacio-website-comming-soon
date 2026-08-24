// Luxury Web Audio API Sound Synthesizer
let audioCtx: AudioContext | null = null;
let soundEnabled = true;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const isSoundEnabled = (): boolean => soundEnabled;

export const setSoundEnabled = (enabled: boolean): void => {
  soundEnabled = enabled;
  if (typeof window !== 'undefined') {
    localStorage.setItem('espacio_sound_enabled', enabled ? '1' : '0');
  }
};

export const initSoundState = (): boolean => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('espacio_sound_enabled');
    soundEnabled = saved !== '0';
  }
  return soundEnabled;
};

/** Plays a soft luxury crystal chime for the monogram reveal */
export const playLuxuryChime = (): void => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const frequencies = [587.33, 880.0, 1174.66, 1760.0]; // D5, A5, D6, A6

    frequencies.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.08);

      gain.gain.setValueAtTime(0.0001, now + index * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.04 / (index + 1), now + index * 0.08 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + index * 0.08 + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 2.0);
    });
  } catch {
    // Graceful fallback if audio context is blocked
  }
};

/** Plays a subtle metallic shimmer sweep */
export const playShimmerSweep = (): void => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(960, now + 0.6);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, now);
    filter.Q.setValueAtTime(3.0, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.025, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.00001, now + 0.8);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.85);
  } catch {
    // Ignore audio error
  }
};

/** Soft tactile feedback click */
export const playTactileClick = (): void => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.04);

    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch {
    // Ignore
  }
};

/** Warm completion sound on consultation submission */
export const playSuccessChord = (): void => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const chordFreqs = [440.0, 554.37, 659.25, 880.0]; // A major

    chordFreqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.0001, now + idx * 0.05);
      gain.gain.linearRampToValueAtTime(0.03, now + idx * 0.05 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + idx * 0.05 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 1.3);
    });
  } catch {
    // Ignore
  }
};
