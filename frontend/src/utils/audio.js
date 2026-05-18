/**
 * Premium sound utility for UI feedback using Web Audio API.
 * No external assets required = faster and more reliable.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      console.log('[SoundEngine] Context Initialized:', this.ctx.state);
    }
    // Resume context if suspended (browser security)
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().then(() => {
        console.log('[SoundEngine] Context Resumed');
      });
    }
  }

  playPop(type = 'success') {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      const now = this.ctx.currentTime;

      if (type === 'success') {
        // Higher pitched, shorter "ping"
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.1);
        
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      } else {
        // Lower, slightly dissonant "alert"
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.15);
        
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.3, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      }

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {
      console.warn('[SoundEngine] Playback failed:', e);
    }
  }

  playSignal(priority = 0) {
    try {
      this.init();
      const now = this.ctx.currentTime;
      
      // Professional Harmonic Signal (Sine based)
      // Standard: C5 (523.25) + G5 (783.99) - Major Fifth for premium feel
      const frequencies = [523.25, 783.99];
      const oscillators = frequencies.map((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        
        // Priority adjustment (slight frequency shift)
        if (priority > 0) {
          osc.frequency.exponentialRampToValueAtTime(freq * 1.05, now + 0.1);
        }

        // Smooth Envelope
        // Attack
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 0.05); // Lower volume to be polite
        
        // Decay/Release
        gain.gain.setValueAtTime(0.08, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        return osc;
      });

      oscillators.forEach(osc => {
        osc.start(now);
        osc.stop(now + 1.2);
      });
    } catch (e) {
      console.warn('[SoundEngine] Signal playback failed:', e);
    }
  }

  // Backwards compatibility for now, pointing to playSignal
  playSiren() {
    this.playSignal(1); 
  }
}

export const sound = new SoundEngine();
