import React from 'react';
import { motion } from 'framer-motion';

import { spotifyPlaylists } from '../data/spotifyPlaylists';

interface PlanetMusicEmbedProps {
  planetId: string;
  planetName: string;
}

const PlanetMusicEmbed: React.FC<PlanetMusicEmbedProps> = ({ planetId, planetName }) => {
  const playlistUrl = spotifyPlaylists[planetId.toLowerCase()];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8 rounded-2xl shadow-2xl bg-gradient-to-br from-white/10 via-cosmic-purple/5 to-cosmic-blue-neon/5 backdrop-blur-md border border-cosmic-blue-neon/20 relative overflow-hidden"
    >
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cosmic-purple/10 via-cosmic-blue-neon/5 to-cosmic-purple/10 blur-xl"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.4 }}
            className="text-6xl mb-4"
          >
            🎧
          </motion.div>
          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cosmic-blue-neon to-cosmic-purple-light mb-2">
            The Sound of {planetName}
          </h3>
          <p className="text-cosmic-blue-light text-lg">
            Immerse yourself in cosmic vibrations
          </p>
        </motion.div>

        {/* Music Player */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
        >
          {playlistUrl ? (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <div className="text-2xl mb-2">🎵</div>
                <p className="text-gray-200 text-sm">Your planetary playlist is ready</p>
              </div>
              <iframe
                src={playlistUrl}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ 
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)'
                }}
                className="w-full"
              />
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center py-8"
            >
              <div className="text-4xl mb-4">🎼</div>
              <p className="text-gray-300 text-lg mb-2">No playlist available</p>
              <p className="text-gray-500 text-sm">Check back later for cosmic tunes</p>
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 pt-4 border-t border-cosmic-blue-neon/30 text-center"
        >
          <p className="text-xs text-gray-500">
            Let the music guide your cosmic journey ✨
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PlanetMusicEmbed;