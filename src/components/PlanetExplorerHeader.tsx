import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
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

interface PlanetExplorerHeaderProps {
  planetName?: string;
  onShowAbout?: () => void;
}

const PlanetExplorerHeader: React.FC<PlanetExplorerHeaderProps> = ({ planetName, onShowAbout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cosmiq_theme') || 'nebula';
    }
    return 'nebula';
  });

  useEffect(() => {
    if (location.pathname === '/') {
      document.body.classList.remove(...COSMIC_THEMES.map(t => t.className));
      document.body.style.background = '';
      return;
    }
    document.body.classList.remove(...COSMIC_THEMES.map(t => t.className));
    const themeObj = COSMIC_THEMES.find(t => t.id === theme) || COSMIC_THEMES[0];
    document.body.classList.add(themeObj.className);
    Object.entries(themeObj.colors).forEach(([k, v]) => {
      document.body.style.setProperty(k, v);
    });
    localStorage.setItem('cosmiq_theme', theme);
  }, [theme, location.pathname]);

  const cycleTheme = () => {
    setTheme(getNextThemeId(theme));
  };
  const themeObj = COSMIC_THEMES.find(t => t.id === theme) || COSMIC_THEMES[0];

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full bg-black/40 backdrop-blur border-b border-white/10 px-4 md:px-8 py-2 flex items-center justify-between gap-2"
    >
      {/* Left: Brand (clickable) */}
      <button
        onClick={() => navigate('/')}
        className="flex-1 min-w-0 flex flex-col items-start text-left group focus:outline-none"
        aria-label="Go to Home"
        title="Go to Home"
      >
        <span className="font-bold text-lg md:text-xl tracking-widest text-white select-none group-hover:underline">COSMIQ</span>
        <span className="text-xs md:text-sm text-white/70 mt-0.5 group-hover:text-cosmic-blue-light transition-colors">the void knows you</span>
      </button>

      {/* Center: Dynamic Title */}
      <div className="flex-1 min-w-0 text-center">
        <span className="text-base md:text-lg font-medium text-white/90 truncate">
          {planetName ? `Welcome to ${planetName}` : 'Planet Explorer'}
        </span>
      </div>

      {/* Right: Actions */}
      <div className="flex-1 min-w-0 flex justify-end items-center gap-2">
        {/* Cosmic Theme Switcher */}
        <motion.button
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.96 }}
          onClick={cycleTheme}
          className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white p-2 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow"
          aria-label="Switch Cosmic Theme"
          title={`Theme: ${themeObj.name} ${THEME_EMOJIS[themeObj.id]}`}
        >
          <span className="text-xl">{THEME_EMOJIS[themeObj.id]}</span>
        </motion.button>
        {/* Help/About */}
        <motion.button
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={onShowAbout}
          className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white p-2 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 shadow"
          aria-label="Help / About"
          title="Help / About"
        >
          <span className="text-xl">❓</span>
        </motion.button>
      </div>
    </motion.header>
  );
};

export default PlanetExplorerHeader; 