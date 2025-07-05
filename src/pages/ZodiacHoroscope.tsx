import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ZodiacHoroscopeCard from '../components/ZodiacHoroscopeCard';

const ZODIAC_SIGNS = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

const ZODIAC_EMOJIS: Record<string, string> = {
  aries: '♈',
  taurus: '♉',
  gemini: '♊',
  cancer: '♋',
  leo: '♌',
  virgo: '♍',
  libra: '♎',
  scorpio: '♏',
  sagittarius: '♐',
  capricorn: '♑',
  aquarius: '♒',
  pisces: '♓',
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const ZodiacHoroscope: React.FC = () => {
  const [selectedSign, setSelectedSign] = useState<string>('aries');

  return (
    <div className="min-h-screen bg-cosmic-black flex flex-col items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Cosmic floating nav */}
      <motion.button
        onClick={() => window.history.back()}
        className="absolute top-6 left-6 bg-white/10 hover:bg-white/20 text-white rounded-full px-4 py-2 shadow backdrop-blur z-10"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Back"
      >
        ← Back
      </motion.button>
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-serif-display text-white mb-8 text-center drop-shadow-glow"
      >
        ✨ Your Zodiac Horoscope
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="mb-8 flex flex-wrap justify-center gap-3"
      >
        {ZODIAC_SIGNS.map(sign => (
          <button
            key={sign}
            onClick={() => setSelectedSign(sign)}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all flex items-center gap-2 border border-white/20 shadow backdrop-blur
              ${selectedSign === sign ? 'bg-cosmic-accent text-white scale-105' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}
            aria-label={capitalize(sign)}
          >
            <span className="text-lg">{ZODIAC_EMOJIS[sign]}</span>
            {capitalize(sign)}
          </button>
        ))}
      </motion.div>
      <ZodiacHoroscopeCard sign={selectedSign} />
    </div>
  );
};

export default ZodiacHoroscope; 