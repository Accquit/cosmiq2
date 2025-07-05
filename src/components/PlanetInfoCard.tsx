import React from 'react';
import { PlanetData } from '../services/nasaApi';
import { motion } from 'framer-motion';

interface PlanetInfoCardProps {
  planetData: PlanetData;
  onClose?: () => void;
}

const PlanetInfoCard: React.FC<PlanetInfoCardProps> = ({ planetData, onClose }) => {
  if (!planetData) return null;

  return (
    <motion.div
      className="fixed right-0 top-0 h-full w-96 bg-gradient-to-b from-cosmic-black via-cosmic-purple/10 to-cosmic-black p-8 z-20 overflow-y-auto border-l border-cosmic-blue-neon/30 backdrop-blur-md shadow-2xl"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
    >
      {/* Close button */}
      {onClose && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          onClick={onClose}
          className="absolute top-6 right-6 text-white hover:text-cosmic-blue-neon transition-colors p-2 rounded-full bg-white/10 hover:bg-white/20"
          aria-label="Close planet information"
        >
          <span className="text-xl">✕</span>
        </motion.button>
      )}

      <div className="mt-8">
        {/* Planet Name Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cosmic-blue-neon to-cosmic-purple-light mb-2">
            {planetData.name}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cosmic-blue-neon to-cosmic-purple-light rounded-full"></div>
        </motion.div>
        
        {/* Planet Information */}
        <div className="space-y-6">
          {/* Stats Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-cosmic-blue-neon/20"
          >
            <h3 className="text-cosmic-blue-neon font-bold mb-4 flex items-center text-lg">
              <span className="mr-2">🔭</span>
              Cosmic Data
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-gray-300 text-sm">Distance from Sun:</span>
                <span className="text-white font-semibold">{planetData.distanceFromSun}M km</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-gray-300 text-sm">Orbit Period:</span>
                <span className="text-white font-semibold">{planetData.orbitPeriod} days</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-gray-300 text-sm">Rotation Period:</span>
                <span className="text-white font-semibold">{planetData.rotationPeriod}h</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-gray-300 text-sm">Temperature:</span>
                <span className="text-white font-semibold">{planetData.averageTemperature}°C</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-gray-300 text-sm">Moons:</span>
                <span className="text-white font-semibold">{planetData.moons}</span>
              </div>
            </div>
          </motion.div>

          {/* Additional Information Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-cosmic-blue-neon/20"
          >
            <h3 className="text-cosmic-blue-neon font-bold mb-4 flex items-center text-lg">
              <span className="mr-2">✨</span>
              Did You Know?
            </h3>
            <p className="text-gray-200 text-sm leading-relaxed">
              {getPlanetFact(planetData.id)}
            </p>
          </motion.div>

          {/* Cosmic Connection */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center pt-6 border-t border-cosmic-blue-neon/30"
          >
            <div className="text-3xl mb-2">🌌</div>
            <p className="text-cosmic-blue-light text-sm">
              Connected to the cosmic web
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Helper function to get a fun fact about each planet
const getPlanetFact = (planetId: string): string => {
  const facts: Record<string, string> = {
    mercury: "Mercury's day is longer than its year! A single day on Mercury lasts about 176 Earth days, while its year is only 88 Earth days.",
    venus: "Venus rotates in the opposite direction to most planets, meaning the Sun rises in the west and sets in the east.",
    earth: "Earth is the only planet not named after a god. It comes from the Old English word 'ertha' meaning ground or land.",
    mars: "Mars has the largest dust storms in our solar system, which can last for months and cover the entire planet.",
    jupiter: "Jupiter's Great Red Spot is a storm that has been raging for at least 400 years and is larger than Earth.",
    saturn: "Saturn's rings are made mostly of ice particles, with a small amount of rocky debris and dust.",
    uranus: "Uranus rotates on its side, with its axis pointing nearly 90 degrees away from the Sun.",
    neptune: "Neptune has the strongest winds in the solar system, reaching speeds of over 2,100 km/h (1,300 mph).",
    pluto: "Although no longer classified as a planet, Pluto has five moons despite being smaller than Earth's moon."
  };

  return facts[planetId.toLowerCase()] || "This celestial body holds many mysteries waiting to be discovered.";
};

export default PlanetInfoCard;