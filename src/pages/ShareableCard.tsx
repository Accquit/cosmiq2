import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CosmicCard from '../components/CosmicCard';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ShareableCard: React.FC = () => {
  const query = useQuery();
  const planet = query.get('planet') || '';
  const name = query.get('name') || '';
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cosmic-black px-2 py-8">
      <CosmicCard planetId={planet} userName={name} readOnly />
      <button
        onClick={() => navigate('/')}
        className="mt-8 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white px-6 py-2 text-base font-medium shadow transition-all"
      >
        ← Back to COSMIQ
      </button>
    </div>
  );
};

export default ShareableCard; 