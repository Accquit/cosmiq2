import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from '../components/LoadingScreen';
import SolarSystem from '../components/SolarSystem';
import StoryMode from '../components/StoryMode';
import FloatingNav from '../components/FloatingNav';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      document.body.classList.add('cosmiq-loading');
    } else {
      document.body.classList.remove('cosmiq-loading');
    }
    return () => {
      document.body.classList.remove('cosmiq-loading');
    };
  }, [isLoading]);

  const handleLoadingComplete = () => {
    console.log('Loading complete, transitioning to solar system');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cosmic-black relative overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onLoadingComplete={handleLoadingComplete} />
        ) : (
          <SolarSystem key="solar-system" />
        )}
      </AnimatePresence>
      
      {/* Story Mode for first-time visitors */}
      <StoryMode />
      {/* Floating Navigation in top-right (only after loading) */}
      {!isLoading && <FloatingNav />}
    </div>
  );
};

export default Index;
