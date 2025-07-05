import React from 'react';
import { funFacts } from '../data/funFacts';

const PLANET_EMOJIS: Record<string, string> = {
  mercury: '☿️',
  venus: '♀️',
  earth: '🌍',
  mars: '♂️',
  jupiter: '♃',
  saturn: '♄',
  uranus: '♅',
  neptune: '♆',
  pluto: '♇',
};

interface LoaderProps {
  message?: string;
  planetId?: string;
  variant?: 'default' | 'sidebar' | 'modal';
}

const getRandomFact = () => funFacts[Math.floor(Math.random() * funFacts.length)];

const Loader: React.FC<LoaderProps> = ({ message, planetId, variant = 'default' }) => {
  const planetEmoji = planetId ? PLANET_EMOJIS[planetId.toLowerCase()] : '';
  const fact = getRandomFact();
  return (
    <div className={`flex flex-col items-center justify-center ${variant === 'sidebar' ? 'py-8' : 'min-h-[200px] py-12'} w-full`}>
      {/* Glowing Spinner */}
      <div className="mb-4 animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cosmic-accent shadow-glow"></div>
      {/* Themed Message */}
      <div className="text-white text-xl font-semibold mb-2 flex items-center gap-2">
        {planetEmoji && <span className="text-2xl">{planetEmoji}</span>}
        {message || 'Transmitting cosmic data...'}
      </div>
      {/* Fun Fact */}
      <div className="text-cosmic-blue-light text-sm italic mt-2 text-center max-w-xs">
        <span className="opacity-70">✨ Fun Fact:</span> {fact}
      </div>
    </div>
  );
};

export default Loader; 