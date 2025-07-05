import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StoryModeProps {
  onClose?: () => void;
}

const StoryMode: React.FC<StoryModeProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const storySteps = [
    "Welcome, cosmic traveler.",
    "This is COSMIQ — your personal guide to the planets.",
    "Click on a planet to reveal your identity.",
    "Feel your orbit. Hear your vibe.",
    "Ready to explore your cosmic destiny?"
  ];

  useEffect(() => {
    // Check if user has seen the story before
    const hasSeenStory = localStorage.getItem('cosmiq_story_seen');
    if (!hasSeenStory) {
      setIsVisible(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < storySteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('cosmiq_story_seen', 'true');
    onClose?.();
  };

  const isLastStep = currentStep === storySteps.length - 1;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 max-w-xs md:max-w-sm"
        >
          {/* Floating Avatar */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
            className="absolute -top-8 -left-4 text-4xl"
          >
            <motion.span
              animate={{ 
                rotate: [0, 10, -10, 0],
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🪐
            </motion.span>
          </motion.div>

          {/* Dialogue Box */}
          <div className="relative">
            {/* Glassmorphic backdrop */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-6 shadow-2xl">
              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-blue-400/20 blur-sm"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Message */}
                <motion.p
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-white text-base md:text-lg font-sora leading-relaxed mb-4 text-shadow-glow"
                >
                  {storySteps[currentStep]}
                </motion.p>

                {/* Progress dots */}
                <div className="flex justify-center gap-2 mb-4">
                  {storySteps.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        index === currentStep 
                          ? 'bg-blue-400 shadow-glow' 
                          : 'bg-white/30'
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    />
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex justify-end gap-3">
                  {!isLastStep && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNext}
                      className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-lg text-blue-200 font-medium transition-all duration-200 hover:shadow-glow"
                    >
                      Next
                    </motion.button>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClose}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isLastStep
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-glow'
                        : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white'
                    }`}
                  >
                    {isLastStep ? 'Got it!' : 'Skip'}
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Speech bubble tail */}
            <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white/10 backdrop-blur-md border-l border-b border-white/20 transform rotate-45"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StoryMode; 