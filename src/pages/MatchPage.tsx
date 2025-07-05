import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CosmicCard from '../components/CosmicCard';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const COMPATIBILITY: Record<string, Record<string, string>> = {
  mars: {
    venus: 'Fire meets love — a passionate orbit!',
    earth: 'You ground each other in cosmic harmony.',
    mars: 'Twin flames blazing across the stars!',
    // ...add more
  },
  venus: {
    mars: 'Fire meets love — a passionate orbit!',
    earth: 'Love and life in perfect balance.',
    venus: 'A double dose of cosmic romance!',
    // ...add more
  },
  // ...add more planet combos as needed
};

function getCompatibility(user1: string, user2: string) {
  if (COMPATIBILITY[user1]?.[user2]) return COMPATIBILITY[user1][user2];
  if (COMPATIBILITY[user2]?.[user1]) return COMPATIBILITY[user2][user1];
  if (user1 === user2) return 'Twin cosmic souls — a perfect match!';
  return 'Your orbits align in mysterious ways...';
}

const MatchPage: React.FC = () => {
  const query = useQuery();
  const user1 = query.get('user1') || '';
  const user2 = query.get('user2') || '';
  const navigate = useNavigate();

  const compatibility = getCompatibility(user1, user2);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cosmic-black px-2 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">Cosmic Match</h1>
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center w-full max-w-3xl">
        <CosmicCard planetId={user1} readOnly />
        <span className="text-3xl text-cosmic-accent">+</span>
        <CosmicCard planetId={user2} readOnly />
      </div>
      <div className="mt-8 text-lg md:text-xl text-cosmic-accent text-center font-medium max-w-xl">{compatibility}</div>
      <button
        onClick={() => navigate('/')}
        className="mt-8 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white px-6 py-2 text-base font-medium shadow transition-all"
      >
        ← Back to COSMIQ
      </button>
    </div>
  );
};

export default MatchPage; 