import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { mythologyData } from '../data/mythologyData';
import { spotifyPlaylists } from '../data/spotifyPlaylists';

const PLANET_META: Record<string, { name: string; emoji: string; accent: string }> = {
  mercury: { name: 'Mercury', emoji: '☄️', accent: 'from-gray-400 to-gray-600' },
  venus: { name: 'Venus', emoji: '♀️', accent: 'from-pink-400 to-pink-600' },
  earth: { name: 'Earth', emoji: '🌍', accent: 'from-green-400 to-blue-500' },
  mars: { name: 'Mars', emoji: '🔴', accent: 'from-red-500 to-orange-600' },
  jupiter: { name: 'Jupiter', emoji: '🪐', accent: 'from-yellow-400 to-orange-400' },
  saturn: { name: 'Saturn', emoji: '🪐', accent: 'from-yellow-300 to-yellow-500' },
  uranus: { name: 'Uranus', emoji: '🔵', accent: 'from-cyan-400 to-blue-400' },
  neptune: { name: 'Neptune', emoji: '🌊', accent: 'from-blue-500 to-purple-600' },
};

interface CosmicCardProps {
  planetId: string;
  userName?: string;
  readOnly?: boolean;
}

const CosmicCard: React.FC<CosmicCardProps> = ({ planetId, userName, readOnly }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const planet = PLANET_META[planetId.toLowerCase()];
  const myth = mythologyData[planetId.toLowerCase()];
  const playlist = spotifyPlaylists[planetId.toLowerCase()];

  const handleDownload = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, { backgroundColor: null });
    const link = document.createElement('a');
    link.download = `cosmic-card-${planetId}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleCopy = () => {
    const text = `My cosmic identity is ${planet?.name} ${planet?.emoji} — ${myth?.god}: "${myth?.affirmation}" on COSMIQ 🌌`;
    navigator.clipboard.writeText(text);
  };

  const handleTweet = () => {
    const text = `Today I feel like ${planet?.name} ${planet?.emoji} — ${myth?.god}: "${myth?.affirmation}" on COSMIQ 🌌 #cosmicidentity`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  if (!planet || !myth) return null;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`max-w-sm w-full mx-auto rounded-3xl p-6 shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 relative overflow-hidden
        flex flex-col items-center
        bg-gradient-to-br ${planet.accent}`}
      style={{ minHeight: 420 }}
    >
      {/* Planet Emoji & Name */}
      <div className="text-5xl mb-2 drop-shadow-lg">{planet.emoji}</div>
      <div className="text-2xl font-bold text-white mb-1 tracking-wide">{planet.name}</div>
      {userName && (
        <div className="text-base text-cosmic-accent mb-2">for {userName}</div>
      )}
      {/* God & Role */}
      <div className="text-lg font-semibold text-cosmic-accent mb-1">{myth.god}</div>
      <div className="text-sm text-white/80 mb-4">{myth.role}</div>
      {/* Affirmation */}
      <div className="italic text-center text-white text-lg mb-4 px-2">“{myth.affirmation}”</div>
      {/* Playlist */}
      <div className="text-xs text-cosmic-accent2 mb-2">
        {playlist ? 'Vibe: Spotify Playlist' : 'No playlist'}
      </div>
      {/* Myth snippet */}
      <div className="text-xs text-white/70 mb-4 text-center px-2">{myth.story}</div>
      {/* Buttons */}
      {!readOnly && (
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleDownload}
            className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white px-4 py-2 text-sm font-medium shadow transition-all"
            title="Download Card"
          >📥 Download</button>
          <button
            onClick={handleCopy}
            className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white px-4 py-2 text-sm font-medium shadow transition-all"
            title="Copy to Clipboard"
          >📋 Copy</button>
          <button
            onClick={handleTweet}
            className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white px-4 py-2 text-sm font-medium shadow transition-all"
            title="Share on Twitter"
          >🐦 Tweet</button>
        </div>
      )}
    </motion.div>
  );
};

export default CosmicCard; 