import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { COSMIC_THEMES } from '../data/themes';

const THEME_EMOJIS: Record<string, string> = {
  nebula: '🟣',
  aurora: '🟢',
  supernova: '🟠',
  galaxy: '🌌',
};

function getNextThemeId(currentId: string) {
  const idx = COSMIC_THEMES.findIndex(t => t.id === currentId);
  return COSMIC_THEMES[(idx + 1) % COSMIC_THEMES.length].id;
}

const FloatingNav: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cosmiq_theme') || 'nebula';
    }
    return 'nebula';
  });
  const navigate = useNavigate();
  const location = useLocation();

  // Only apply theme on non-homepage
  useEffect(() => {
    if (location.pathname === '/') {
      document.body.classList.remove(...COSMIC_THEMES.map(t => t.className));
      // Optionally reset to default bg
      document.body.style.background = '';
      return;
    }
    document.body.classList.remove(...COSMIC_THEMES.map(t => t.className));
    const themeObj = COSMIC_THEMES.find(t => t.id === theme) || COSMIC_THEMES[0];
    document.body.classList.add(themeObj.className);
    // Set CSS variables
    Object.entries(themeObj.colors).forEach(([k, v]) => {
      document.body.style.setProperty(k, v);
    });
    localStorage.setItem('cosmiq_theme', theme);
  }, [theme, location.pathname]);

  // Cycle to next theme
  const cycleTheme = () => {
    setTheme(getNextThemeId(theme));
  };

  const themeObj = COSMIC_THEMES.find(t => t.id === theme) || COSMIC_THEMES[0];

  return (
    <div
      className="fixed md:absolute top-auto md:top-6 right-4 md:right-6 bottom-6 md:bottom-auto z-50 flex flex-col md:flex-row gap-3 items-end md:items-center"
    >
      {/* Planet Explorer Button */}
      <motion.button
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => navigate('/planet-explorer')}
        className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white p-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
        aria-label="Go to Planet Explorer"
        title="Explore Planets"
      >
        <span className="text-2xl">🪐</span>
      </motion.button>

      {/* Horoscope Button */}
      <motion.button
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => navigate('/zodiac')}
        className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white p-2 transition-all focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-lg"
        aria-label="Get Zodiac Horoscope"
        title="Zodiac Horoscope"
      >
        <span className="text-2xl">🔮</span>
      </motion.button>

      {/* Info/Story Mode Button */}
      <motion.button
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setShowModal(true)}
        className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white p-2 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-lg"
        aria-label="Show Info"
        title="About / Story Mode"
      >
        <span className="text-2xl">❓</span>
      </motion.button>

      {/* Cosmic Theme Switcher Button */}
      <motion.button
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.96 }}
        onClick={cycleTheme}
        className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white p-2 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg"
        aria-label="Switch Cosmic Theme"
        title={`Theme: ${themeObj.name} ${THEME_EMOJIS[themeObj.id]}`}
      >
        <span className="text-2xl">{THEME_EMOJIS[themeObj.id]}</span>
      </motion.button>

      {/* Modal for Info/Story Mode */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
              className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl text-white"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-white text-xl bg-white/10 rounded-full p-2 hover:bg-white/20 focus:outline-none"
                onClick={() => setShowModal(false)}
                aria-label="Close"
                title="Close"
              >
                ✕
              </button>
              <div className="flex flex-col items-center gap-4">
                <div className="text-4xl">✨</div>
                <h2 className="text-2xl font-bold mb-2">Welcome to COSMIQ</h2>
                <p className="text-center text-base text-white/90 mb-2">
                  COSMIQ is your cosmic guide to the planets. Explore the solar system, discover your cosmic identity, and vibe to planetary music. Click the 🪐 to start exploring, or try Story Mode for a poetic walkthrough.
                </p>
                <button
                  className="mt-2 px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-400/30 text-blue-200 font-medium hover:bg-blue-500/30 transition-all"
                  onClick={() => setShowModal(false)}
                >
                  Got it!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingNav; 