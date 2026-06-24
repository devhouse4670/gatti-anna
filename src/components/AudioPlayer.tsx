import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';

export default function AudioPlayer({ lightTheme }: { lightTheme: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{
    oscillators: OscillatorNode[];
    gainNode: GainNode;
    noiseNode?: AudioWorkletNode | ScriptProcessorNode;
  } | null>(null);

  // Play/Stop ambient synthesizer
  const toggleSound = () => {
    if (isPlaying) {
      stopAmbience();
    } else {
      startAmbience();
    }
  };

  const startAmbience = () => {
    try {
      // Create audio context
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master output gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      // Fade in master volume
      masterGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 2);
      masterGain.connect(ctx.destination);

      // Lowpass filter for cozy night atmosphere
      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(450, ctx.currentTime);
      lowpass.connect(masterGain);

      // Create a chord progression (Pentatonic Warm Pad)
      // Chords: Cmaj9 -> Am9 -> Fmaj9 -> G6 (simulated by notes)
      const chords = [
        [130.81, 164.81, 196.00, 246.94, 293.66], // C3, E3, G3, B3, D4
        [110.00, 130.81, 164.81, 196.00, 220.00], // A2, C3, E3, G3, A3
        [87.31,  130.81, 174.61, 218.27, 261.63], // F2, C3, F3, A3, C4
        [98.00,  146.83, 196.00, 246.94, 293.66], // G2, D3, G3, B3, D4
      ];

      const oscillators: OscillatorNode[] = [];
      
      // We will loop through chords every 6 seconds
      let chordIndex = 0;
      
      const playChord = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        
        const now = ctx.currentTime;
        const frequencies = chords[chordIndex];
        
        // Clear old notes scheduled
        // Spawn 4 cozy triangle-wave oscillators
        frequencies.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);
          
          // Slight detune for analog warm richness
          osc.detune.setValueAtTime((Math.random() - 0.5) * 8, now);
          
          // Soft volume envelope
          oscGain.gain.setValueAtTime(0, now);
          oscGain.gain.linearRampToValueAtTime(0.04, now + 1.5 + Math.random());
          // Fade out slightly before the next chord transition
          oscGain.gain.setValueAtTime(0.04, now + 4.5);
          oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 5.9);
          
          osc.connect(oscGain);
          oscGain.connect(lowpass);
          osc.start(now);
          osc.stop(now + 6);
          
          oscillators.push(osc);
        });

        chordIndex = (chordIndex + 1) % chords.length;
      };

      // Play first chord immediately
      playChord();
      
      // Schedule chord switching
      const intervalId = setInterval(() => {
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
          playChord();
        } else {
          clearInterval(intervalId);
        }
      }, 6000);

      // Create a crackling cafe background noise (white noise passed through highpass + bandpass)
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter for rain / crackle texture
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 1200;
      noiseFilter.Q.value = 1.0;

      const noiseGain = ctx.createGain();
      noiseGain.gain.value = 0.006; // extremely low background vinyl crackle

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);
      whiteNoise.start();

      nodesRef.current = {
        oscillators,
        gainNode: masterGain,
      };

      setIsPlaying(true);
    } catch (e) {
      console.warn('Failed to initialize ambient synthesized audio:', e);
    }
  };

  const stopAmbience = () => {
    if (nodesRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      nodesRef.current.gainNode.gain.setValueAtTime(nodesRef.current.gainNode.gain.value, now);
      nodesRef.current.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
      
      setTimeout(() => {
        try {
          audioCtxRef.current?.close();
        } catch (e) {}
        audioCtxRef.current = null;
        nodesRef.current = null;
        setIsPlaying(false);
      }, 600);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (e) {}
      }
    };
  }, []);

  return (
    <div 
      className={`fixed bottom-6 left-6 z-50 flex items-center gap-3 py-2 px-3 rounded-full shadow-lg glass-panel transition-all duration-300 group hover:pr-4 ${
        isPlaying ? 'border-brand-accent/30' : 'border-white/5'
      }`}
      id="sound-player-widget"
    >
      <button
        onClick={toggleSound}
        className="relative flex items-center justify-center w-9 h-9 rounded-full bg-brand-accent text-brand-bg transition-transform hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Toggle ambient music"
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4 text-brand-bg" />
        )}
      </button>

      <div className="flex flex-col text-left max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out">
        <span className="text-[10px] font-mono text-brand-accent tracking-widest uppercase">
          Lounge Sound
        </span>
        <span className={`text-[11px] font-medium whitespace-nowrap ${lightTheme ? 'text-zinc-800' : 'text-zinc-200'}`}>
          {isPlaying ? 'Late-Night Cafe Synthesizer' : 'Sound Ambient Off'}
        </span>
      </div>

      {isPlaying && (
        <div className="flex items-end gap-0.5 h-3 px-1">
          <div className="w-0.5 bg-brand-accent animate-[bounce_1s_infinite_100ms]" style={{ height: '60%' }}></div>
          <div className="w-0.5 bg-brand-accent animate-[bounce_1s_infinite_300ms]" style={{ height: '100%' }}></div>
          <div className="w-0.5 bg-brand-accent animate-[bounce_1s_infinite_500ms]" style={{ height: '40%' }}></div>
        </div>
      )}
    </div>
  );
}
