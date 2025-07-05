
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from '../components/LoadingScreen';
import SolarSystem from '../components/SolarSystem';
import StoryMode from '../components/StoryMode';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    console.log('Loading complete, transitioning to solar system');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-cosmic-black overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onLoadingComplete={handleLoadingComplete} />
        ) : (
          <SolarSystem key="solar-system" />
        )}
      </AnimatePresence>
      
      {/* Story Mode for first-time visitors */}
      <StoryMode />
    </div>
  );
};

export default Index;
