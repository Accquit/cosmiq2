import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlanetData, usePlanetData } from '../services/nasaApi';
import PlanetInfoCard from './PlanetInfoCard';
import PlanetVibeCard from './PlanetVibeCard';
import PlanetMusicEmbed from './PlanetMusicEmbed';
import StoryMode from './StoryMode';

const PlanetExplorer: React.FC = () => {
  const [selectedPlanetId, setSelectedPlanetId] = useState<string>('earth');
  const { planetData, loading, error } = usePlanetData(selectedPlanetId);

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

  return (
    <div className="min-h-screen bg-cosmic-black flex flex-col md:flex-row relative overflow-hidden">
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
        className="w-full md:w-80 bg-gradient-to-b from-cosmic-black via-cosmic-purple/10 to-cosmic-black p-8 border-r border-cosmic-blue-neon/20 backdrop-blur-sm"
      >
        {/* Header */}
        <div className="mb-8">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cosmic-blue-neon to-cosmic-purple-light mb-2"
          >
            COSMIQ
          </motion.h1>
          <motion.p 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-cosmic-blue-light text-sm"
          >
            Your cosmic identity awaits
          </motion.p>
        </div>

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

      {/* Main Content Area */}
      <div className="flex-1 p-8 relative">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center justify-center h-full"
            >
              <div className="text-center">
                <div className="text-6xl mb-4 animate-spin">🌌</div>
                <div className="text-white text-xl font-medium">Loading cosmic data...</div>
                <div className="text-cosmic-blue-light text-sm mt-2">Connecting to the stars</div>
              </div>
            </motion.div>
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
      </div>
      
      {/* Planet Info Card - rendered separately as a fixed sidebar */}
      <AnimatePresence>
        {planetData && (
          <PlanetInfoCard key="info-card" planetData={planetData} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlanetExplorer;