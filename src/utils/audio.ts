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

export const unlockMobileAudio = (): void => {
  if (typeof window === 'undefined') return;
  try {
    const ctx = getAudioContext();
    if (ctx) {
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      // Play iOS silent buffer warmup to lift hardware mute lock
      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
    }
    preloadKeyboardBuffer();
  } catch {
    // Ignore
  }
};

export const initSoundState = (): boolean => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('espacio_sound_enabled');
    soundEnabled = saved !== '0';

    const handleUnlock = () => {
      unlockMobileAudio();
    };

    ['touchstart', 'touchend', 'click', 'pointerdown', 'keydown'].forEach((evt) => {
      window.addEventListener(evt, handleUnlock, { passive: true, once: false });
    });
    
    // Also try immediately
    unlockMobileAudio();
  }
  return soundEnabled;
};

// Initialize immediately on module load
if (typeof window !== 'undefined') {
  initSoundState();
}

let decodedTypingBuffer: AudioBuffer | null = null;
let isDecodingBuffer = false;

// Preload and decode the authentic keyboard typing audio buffer
export const preloadKeyboardBuffer = async (): Promise<void> => {
  if (typeof window === 'undefined' || decodedTypingBuffer || isDecodingBuffer) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  isDecodingBuffer = true;
  try {
    const res = await fetch('./keyboard-typing.mp3');
    const arrayBuf = await res.arrayBuffer();
    decodedTypingBuffer = await ctx.decodeAudioData(arrayBuf);
  } catch {
    // Graceful fallback
  } finally {
    isDecodingBuffer = false;
  }
};

// Precise keystroke transient timestamps inside keyboard-typing.mp3
const KEYSTROKE_SLICES = [
  0.06, 0.18, 0.32, 0.46, 0.60, 0.74, 0.88, 1.02, 1.16, 1.30, 1.44, 1.58, 1.72
];

let lastSliceIdx = -1;

const playSynthKeyStroke = (ctx: AudioContext, now: number, isSpace: boolean): void => {
  const pitch = (isSpace ? 0.75 : 1.0) * (0.92 + Math.random() * 0.16);

  const osc = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime((isSpace ? 1400 : 2800) * pitch, now);
  osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

  filter.type = 'highpass';
  filter.frequency.setValueAtTime(600, now);

  gain.gain.setValueAtTime(isSpace ? 1.4 : 1.2, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.055);
};

/** Plays an authentic keystroke sound in exact synchronization with each typed character (Ultra Boosted Loudness) */
export const playCharTypingSound = (isSpace = false): void => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    if (!decodedTypingBuffer && !isDecodingBuffer) {
      preloadKeyboardBuffer();
    }

    const now = ctx.currentTime;

    if (decodedTypingBuffer) {
      // Pick next varied keystroke slice
      let sliceIdx = Math.floor(Math.random() * KEYSTROKE_SLICES.length);
      if (sliceIdx === lastSliceIdx) {
        sliceIdx = (sliceIdx + 1) % KEYSTROKE_SLICES.length;
      }
      lastSliceIdx = sliceIdx;

      const offset = KEYSTROKE_SLICES[sliceIdx];
      const sliceDuration = isSpace ? 0.14 : 0.11;

      const source = ctx.createBufferSource();
      source.buffer = decodedTypingBuffer;
      source.playbackRate.setValueAtTime(0.96 + Math.random() * 0.08, now);

      // Studio-grade punch compressor to maximize acoustic energy without clipping
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-10, now);
      compressor.knee.setValueAtTime(6, now);
      compressor.ratio.setValueAtTime(6, now);
      compressor.attack.setValueAtTime(0.001, now);
      compressor.release.setValueAtTime(0.06, now);

      // High-gain pre-amp boost (6.5x loud volume)
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(isSpace ? 7.5 : 6.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + sliceDuration);

      source.connect(gain);
      gain.connect(compressor);
      compressor.connect(ctx.destination);

      source.start(now, offset, sliceDuration);
    } else {
      playSynthKeyStroke(ctx, now, isSpace);
      // Extra mobile HTMLAudio backup if Web Audio is still loading
      try {
        const a = new Audio('./keyboard-typing.mp3');
        a.volume = 1.0;
        a.play().catch(() => {});
      } catch {}
    }
  } catch {
    // Ignore
  }
};

export const playTypingSound = (): void => {
  playCharTypingSound(false);
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
