import React from 'react';
import { motion } from 'framer-motion';
import { mythologyData, MythologyData } from '../data/mythologyData';

interface PlanetVibeCardProps {
  planetId: string;
}

const PlanetVibeCard: React.FC<PlanetVibeCardProps> = ({ planetId }) => {
  const data = mythologyData[planetId.toLowerCase()];

  if (!data) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-cosmic-blue-neon/20 text-white text-center shadow-2xl"
      >
        <div className="text-4xl mb-4">🌌</div>
        <p className="text-lg">No mythological data available for this celestial body.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="p-8 rounded-2xl shadow-2xl bg-gradient-to-br from-white/10 via-cosmic-purple/5 to-cosmic-blue-neon/5 backdrop-blur-md border border-cosmic-blue-neon/20 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cosmic-blue-neon/10 via-cosmic-purple/5 to-cosmic-blue-neon/10 blur-xl"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
            className="text-6xl mb-4"
          >
            ⭐
          </motion.div>
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cosmic-blue-neon to-cosmic-purple-light mb-2"
          >
            {data.god}
          </motion.h2>
          <motion.p 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-cosmic-blue-light text-xl font-medium"
          >
            {data.role}
          </motion.p>
        </div>

        <div className="space-y-8">
          {/* Personality Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
          >
            <h3 className="font-bold text-white mb-3 flex items-center text-lg">
              <span className="mr-2">🌟</span>
              Your Cosmic Personality
            </h3>
            <p className="text-gray-200 leading-relaxed italic">{data.personality}</p>
          </motion.div>

          {/* Myth Snippet Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
          >
            <h3 className="font-bold text-white mb-3 flex items-center text-lg">
              <span className="mr-2">📖</span>
              Ancient Myth
            </h3>
            <p className="text-gray-200 leading-relaxed poetic-text">{data.story}</p>
          </motion.div>

          {/* Affirmation Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="pt-6 border-t border-cosmic-blue-neon/30 text-center"
          >
            <h3 className="font-bold text-white mb-4 flex items-center justify-center text-lg">
              <span className="mr-2">✨</span>
              Your Cosmic Affirmation
            </h3>
            <motion.p 
              className="text-cosmic-blue-neon text-xl font-medium leading-relaxed"
              animate={{ 
                textShadow: [
                  "0 0 5px #3b82f6",
                  "0 0 10px #3b82f6, 0 0 15px #3b82f6",
                  "0 0 5px #3b82f6"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              "{data.affirmation}"
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlanetVibeCard;