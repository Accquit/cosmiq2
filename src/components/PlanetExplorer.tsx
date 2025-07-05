import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlanetData, usePlanetData } from '../services/nasaApi';
import PlanetInfoCard from './PlanetInfoCard';
import PlanetVibeCard from './PlanetVibeCard';
import PlanetMusicEmbed from './PlanetMusicEmbed';
import StoryMode from './StoryMode';
import PlanetExplorerHeader from './PlanetExplorerHeader';
import CosmicCard from './CosmicCard';
import Loader from './Loader';
import { speakText, speakPageSummary } from '../utils/speakText';
import { mythologyData } from '../data/mythologyData';
import { startVoiceNavigation, stopVoiceNavigation } from '../utils/voiceNavigation';

// Responsive hook
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

const PlanetExplorer: React.FC = () => {
  const [selectedPlanetId, setSelectedPlanetId] = useState<string>('earth');
  const { planetData, loading, error } = usePlanetData(selectedPlanetId);
  const [showSidebar, setShowSidebar] = useState(false);
  const isMobile = useIsMobile();
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareName, setShareName] = useState('');
  const shareUrl = `${window.location.origin}/card?planet=${selectedPlanetId}${shareName ? `&name=${encodeURIComponent(shareName)}` : ''}`;
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
  };
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchPlanetId, setMatchPlanetId] = useState('venus');
  const [accessibilityMode, setAccessibilityMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cosmiq_accessibility') === 'true';
    }
    return false;
  });
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (accessibilityMode) {
      document.body.classList.add('cosmiq-accessibility');
      localStorage.setItem('cosmiq_accessibility', 'true');
    } else {
      document.body.classList.remove('cosmiq-accessibility');
      localStorage.setItem('cosmiq_accessibility', 'false');
    }
  }, [accessibilityMode]);

  const planets = [
    { id: 'mercury', name: 'Mercury', emoji: '☄️', color: 'from-orange-400 to-red-500' },
    { id: 'venus', name: 'Venus', emoji: '♀️', color: 'from-yellow-300 to-orange-400' },
    { id: 'earth', name: 'Earth', emoji: '🌍', color: 'from-blue-400 to-green-500' },
    { id: 'mars', name: 'Mars', emoji: '🔴', color: 'from-red-500 to-orange-600' },
    { id: 'jupiter', name: 'Jupiter', emoji: '🪐', color: 'from-yellow-500 to-orange-400' },
    { id: 'saturn', name: 'Saturn', emoji: '🪐', color: 'from-yellow-400 to-orange-300' },
    { id: 'uranus', name: 'Uranus', emoji: '🔵', color: 'from-cyan-400 to-blue-500' },
    { id: 'neptune', name: 'Neptune', emoji: '🌊', color: 'from-blue-500 to-purple-600' }
  ];

  // Find the selected planet from the planets array
  const selectedPlanet = planets.find(planet => planet.id === selectedPlanetId);

  // Show sidebar on planet change (mobile only)
  React.useEffect(() => {
    if (isMobile && planetData) setShowSidebar(true);
  }, [selectedPlanetId, isMobile, planetData]);

  return (
    <div className="min-h-screen bg-cosmic-black relative overflow-hidden">
      {/* Sticky Cosmic Header */}
      <PlanetExplorerHeader
        planetName={selectedPlanet?.name}
        onShowAbout={() => { /* You can implement About modal logic here if needed */ }}
      />
      <div className="flex flex-col md:flex-row">
        {/* Animated background stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse-star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Story Mode for first-time visitors */}
        <StoryMode />
        
        {/* Planet Selection Sidebar */}
        <motion.div 
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-80 bg-gradient-to-b from-cosmic-black via-cosmic-purple/10 to-cosmic-black p-8 border-r border-cosmic-blue-neon/20 backdrop-blur-sm z-10"
        >
          {/* Planet Selection */}
          <div className="space-y-3">
            <motion.h3 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-cosmic-blue-neon font-semibold mb-4 flex items-center"
            >
              <span className="mr-2">🌌</span>
              Choose Your Planet
            </motion.h3>
            
            <AnimatePresence>
              {planets.map((planet, index) => (
                <motion.button
                  key={planet.id}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPlanetId(planet.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 border ${
                    selectedPlanetId === planet.id 
                      ? 'bg-gradient-to-r from-cosmic-blue-neon/20 to-cosmic-purple/20 border-cosmic-blue-neon/50 text-white shadow-glow' 
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-cosmic-blue-neon/30 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`text-2xl ${selectedPlanetId === planet.id ? 'animate-pulse' : ''}`}>
                      {planet.emoji}
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{planet.name}</div>
                      <div className="text-xs text-gray-400">Click to explore</div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
      </div>

          {/* Footer */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 pt-6 border-t border-cosmic-blue-neon/20"
          >
            <p className="text-xs text-gray-500 text-center">
              Discover your cosmic destiny ✨
            </p>
          </motion.div>
        </motion.div>

        {/* Main Content + Sidebar as flex children */}
        <div className="flex-1 flex flex-row relative">
      {/* Main Content Area */}
          <div className="flex-1 p-8 relative">
            <AnimatePresence mode="wait">
        {loading ? (
                <Loader message="Charting planetary orbits..." planetId={selectedPlanetId} />
        ) : error ? (
                <motion.div 
                  key="error"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center justify-center h-full"
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4">⚠️</div>
                    <div className="text-red-400 text-xl font-medium">Cosmic Connection Error</div>
                    <div className="text-gray-400 text-sm mt-2">{error.message}</div>
                  </div>
                </motion.div>
        ) : planetData ? (
                <motion.div 
                  key="content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8 max-w-4xl mx-auto"
                >
                  {/* Welcome Header */}
                  <div className="flex flex-col items-center mb-4">
                    <div className="glass-panel flex gap-2 p-2 rounded-2xl shadow-lg backdrop-blur bg-white/10 border border-white/20 mb-4">
                      <button
                        onClick={() => setAccessibilityMode(m => !m)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-blue-200 bg-cosmic-accent/20 hover:bg-cosmic-accent/40 focus:ring-2 focus:ring-blue-400 transition-all shadow ${accessibilityMode ? 'bg-blue-900 text-white' : ''}`}
                        title="Toggle Accessibility Mode"
                      >
                        🦮 <span className="hidden sm:inline">Accessibility</span>
                        <span className="sm:hidden">A11y</span>
                        {accessibilityMode ? ' On' : ' Off'}
                      </button>
                      <button
                        onClick={() => {
                          startVoiceNavigation((cmd) => {
                            const c = cmd.toLowerCase();
                            if (c.includes('show')) {
                              for (const planet of planets) {
                                if (c.includes(planet.name.toLowerCase())) {
                                  setSelectedPlanetId(planet.id);
                                  break;
                                }
                              }
                            }
                            if (c.includes('horoscope')) {
                              window.location.href = '/zodiac';
                            }
                            if (c.includes('affirmation')) {
                              const aff = mythologyData[selectedPlanetId]?.affirmation;
                              if (aff) speakText(aff);
                            }
                            if (c.includes('accessibility')) {
                              setAccessibilityMode(m => !m);
                            }
                          }, setListening);
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-blue-200 bg-cosmic-accent/20 hover:bg-cosmic-accent/40 focus:ring-2 focus:ring-blue-400 transition-all shadow"
                        title="Talk to COSMIQ"
                      >
                        🎙 <span className="hidden sm:inline">Talk to COSMIQ</span>
                        <span className="sm:hidden">Voice</span>
                      </button>
                      {listening && <span className="ml-2 text-xs text-green-400 animate-pulse">Listening...</span>}
                    </div>
                    <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center mb-8"
                    >
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        Welcome to {selectedPlanet?.name}
                      </h2>
                      <p className="text-cosmic-blue-light text-lg">
                        Discover your cosmic identity and planetary vibes
                      </p>
                    </motion.div>
                  </div>

                  <div className="flex justify-center mb-4">
                    <button
                      onClick={() => speakPageSummary({
                        page: 'Planet Explorer',
                        planetName: selectedPlanet?.name,
                        mood: mythologyData[selectedPlanetId]?.personality,
                        affirmation: mythologyData[selectedPlanetId]?.affirmation
                      })}
                      className="text-xs text-blue-300 underline hover:text-blue-400 transition-colors"
                      title="Narrate This Page"
                    >
                      🧑‍🚀 Narrate This Page
                    </button>
                  </div>

                  <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
            <PlanetVibeCard planetId={selectedPlanetId} />
                    </motion.div>
                    
          {selectedPlanet && (
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
            <PlanetMusicEmbed planetId={selectedPlanetId} planetName={selectedPlanet.name} />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center justify-center h-full"
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4">🌌</div>
                    <div className="text-white text-xl font-medium">Choose Your Planet</div>
                    <div className="text-cosmic-blue-light text-sm mt-2">Select a planet from the sidebar to begin your cosmic journey</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Share Your Card Button */}
            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={() => setShowShareModal(true)}
                className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white px-6 py-2 text-base font-medium shadow transition-all"
              >
                🚀 Share Your Card
              </button>
              <button
                onClick={() => setShowMatchModal(true)}
                className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white px-6 py-2 text-base font-medium shadow transition-all"
              >
                💫 Compatibility Match
              </button>
            </div>
            {/* Share Modal */}
            <AnimatePresence>
              {showShareModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                  onClick={() => setShowShareModal(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 40 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 40 }}
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
                    className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-sm w-full shadow-2xl text-white flex flex-col items-center"
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      className="absolute top-4 right-4 text-white text-xl bg-white/10 rounded-full p-2 hover:bg-white/20 focus:outline-none"
                      onClick={() => setShowShareModal(false)}
                      aria-label="Close"
                      title="Close"
                    >
                      ✕
                    </button>
                    <h2 className="text-xl font-bold mb-2">Share Your Cosmic Card</h2>
                    <input
                      type="text"
                      placeholder="Your name (optional)"
                      value={shareName}
                      onChange={e => setShareName(e.target.value)}
                      className="w-full rounded-lg px-3 py-2 mb-4 bg-black/30 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cosmic-accent"
                      maxLength={24}
                    />
                    <CosmicCard planetId={selectedPlanetId} userName={shareName} readOnly />
                    <div className="flex flex-col gap-2 w-full mt-4">
                      <button
                        onClick={handleCopyLink}
                        className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white px-4 py-2 text-sm font-medium shadow transition-all"
                      >
                        📋 Copy Share Link
                      </button>
                      <a
                        href={shareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white px-4 py-2 text-sm font-medium shadow transition-all text-center"
                      >
                        🔗 Open Shareable Card
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Compatibility Match Modal */}
            <AnimatePresence>
              {showMatchModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                  onClick={() => setShowMatchModal(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 40 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 40 }}
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
                    className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-sm w-full shadow-2xl text-white flex flex-col items-center"
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      className="absolute top-4 right-4 text-white text-xl bg-white/10 rounded-full p-2 hover:bg-white/20 focus:outline-none"
                      onClick={() => setShowMatchModal(false)}
                      aria-label="Close"
                      title="Close"
                    >
                      ✕
                    </button>
                    <h2 className="text-xl font-bold mb-2">Cosmic Compatibility Match</h2>
                    <div className="w-full mb-4">
                      <label className="block text-sm mb-2">Select another planet to compare:</label>
                      <select
                        value={matchPlanetId}
                        onChange={e => setMatchPlanetId(e.target.value)}
                        className="w-full rounded-lg px-3 py-2 bg-black/30 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cosmic-accent"
                      >
                        {planets.filter(p => p.id !== selectedPlanetId).map(planet => (
                          <option key={planet.id} value={planet.id}>{planet.emoji} {planet.name}</option>
                        ))}
                      </select>
                    </div>
                    <a
                      href={`/match?user1=${selectedPlanetId}&user2=${matchPlanetId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white px-4 py-2 text-sm font-medium shadow transition-all text-center mt-2"
                    >
                      🔗 View Compatibility
                    </a>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Sidebar: Desktop as flex child, Mobile as overlay */}
          <AnimatePresence>
            {planetData && !isMobile && (
              <PlanetInfoCard key="info-card" planetData={planetData} isOverlay={false} />
            )}
            {planetData && isMobile && showSidebar && (
              <motion.div
                key="mobile-info-card"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                className="fixed inset-0 z-50 flex justify-end bg-black/40"
                onClick={() => setShowSidebar(false)}
              >
                <div onClick={e => e.stopPropagation()} className="w-11/12 max-w-md h-full">
                  <PlanetInfoCard planetData={planetData} onClose={() => setShowSidebar(false)} isOverlay={true} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PlanetExplorer;