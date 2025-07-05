import React, { useState, useEffect } from 'react';
import { PlanetData, usePlanetData } from '../services/nasaApi';
import PlanetInfoCard from './PlanetInfoCard';
import Spline from '@splinetool/react-spline';
import { motion, AnimatePresence } from 'framer-motion';

interface Planet {
  name: string;
  id: string; // Added ID for NASA API
  stats: {
    orbitSpeed: string;
    distanceFromSun: string;
    temperature: string;
    moons: number;
  };
  mythology: {
    god: string;
    description: string;
    origin: string;
  };
  astrology: {
    element: string;
    rulership: string;
    personality: string;
    influence: string;
  };
  affirmation: string;
  spotifyPlaylistId: string;
}

const planets: Planet[] = [
  {
    name: 'Mercury',
    id: 'mercury',
    stats: {
      orbitSpeed: '47.87 km/s',
      distanceFromSun: '57.9 million km',
      temperature: '167°C',
      moons: 0,
    },
    mythology: {
      god: 'Mercury (Hermes)',
      description: 'Roman messenger god of speed and communication',
      origin: 'Named after the fastest-moving planet in Roman mythology',
    },
    astrology: {
      element: 'Air/Earth',
      rulership: 'Gemini & Virgo',
      personality: 'Quick-thinking, communicative, analytical',
      influence: 'Governs communication, travel, and mental processes',
    },
    affirmation: 'Today you burn like Mercury — swift and unstoppable.',
    spotifyPlaylistId: '37i9dQZF1DX0XUsuxWHRQd',
  },
  {
    name: 'Venus',
    id: 'venus',
    stats: {
      orbitSpeed: '35.02 km/s',
      distanceFromSun: '108.2 million km',
      temperature: '464°C',
      moons: 0,
    },
    mythology: {
      god: 'Venus (Aphrodite)',
      description: 'Roman goddess of love and beauty',
      origin: 'Named after the brightest celestial object after the Sun and Moon',
    },
    astrology: {
      element: 'Earth/Water',
      rulership: 'Taurus & Libra',
      personality: 'Loving, artistic, harmonious, sensual',
      influence: 'Rules love, beauty, relationships, and material pleasures',
    },
    affirmation: 'Channel Venus energy — radiate love and magnetic attraction.',
    spotifyPlaylistId: '37i9dQZF1DX4sWSpwq3LiO',
  },
  {
    name: 'Earth',
    id: 'earth',
    stats: {
      orbitSpeed: '29.78 km/s',
      distanceFromSun: '149.6 million km',
      temperature: '15°C',
      moons: 1,
    },
    mythology: {
      god: 'Gaia (Terra)',
      description: 'Greek primordial goddess of Earth',
      origin: 'The only planet not named after a Roman/Greek deity',
    },
    astrology: {
      element: 'Earth',
      rulership: 'All life and nature',
      personality: 'Nurturing, grounded, life-giving, balanced',
      influence: 'Foundation of all earthly experiences and material reality',
    },
    affirmation: 'Ground yourself like Earth — balanced, nurturing, alive.',
    spotifyPlaylistId: '37i9dQZF1DX4UtSsGT1Sbe',
  },
  {
    name: 'Mars',
    id: 'mars',
    stats: {
      orbitSpeed: '24.07 km/s',
      distanceFromSun: '227.9 million km',
      temperature: '-65°C',
      moons: 2,
    },
    mythology: {
      god: 'Mars (Ares)',
      description: 'Roman god of war and courage',
      origin: 'Named for its red color, resembling blood and warfare',
    },
    astrology: {
      element: 'Fire',
      rulership: 'Aries & Scorpio',
      personality: 'Aggressive, passionate, courageous, determined',
      influence: 'Governs action, desire, conflict, and physical energy',
    },
    affirmation: 'Embrace Mars courage — be bold, fierce, unstoppable.',
    spotifyPlaylistId: '37i9dQZF1DX76Wlfdnj7AP',
  },
  {
    name: 'Jupiter',
    id: 'jupiter',
    stats: {
      orbitSpeed: '13.07 km/s',
      distanceFromSun: '778.5 million km',
      temperature: '-110°C',
      moons: 79,
    },
    mythology: {
      god: 'Jupiter (Zeus)',
      description: 'Roman king of gods, ruler of the sky',
      origin: 'Named after the supreme deity due to its massive size',
    },
    astrology: {
      element: 'Fire',
      rulership: 'Sagittarius & Pisces',
      personality: 'Expansive, optimistic, wise, philosophical',
      influence: 'Rules growth, wisdom, higher learning, and good fortune',
    },
    affirmation: 'Expand like Jupiter — think big, lead with wisdom.',
    spotifyPlaylistId: '37i9dQZF1DX4dyzvuaRJ0n',
  },
  {
    name: 'Saturn',
    id: 'saturn',
    stats: {
      orbitSpeed: '9.68 km/s',
      distanceFromSun: '1.43 billion km',
      temperature: '-140°C',
      moons: 82,
    },
    mythology: {
      god: 'Saturn (Cronus)',
      description: 'Roman god of time and agriculture',
      origin: 'Named after the god of time due to its slow orbital period',
    },
    astrology: {
      element: 'Earth',
      rulership: 'Capricorn & Aquarius',
      personality: 'Disciplined, responsible, structured, patient',
      influence: 'Governs discipline, karma, lessons, and life structure',
    },
    affirmation: 'Master time like Saturn — patient, disciplined, enduring.',
    spotifyPlaylistId: '37i9dQZF1DX3YSRoSdA634',
  },
  {
    name: 'Uranus',
    id: 'uranus',
    stats: {
      orbitSpeed: '6.80 km/s',
      distanceFromSun: '2.87 billion km',
      temperature: '-195°C',
      moons: 27,
    },
    mythology: {
      god: 'Uranus (Ouranos)',
      description: 'Greek primordial god of the sky',
      origin: 'First planet discovered in modern times, named after Greek sky god',
    },
    astrology: {
      element: 'Air',
      rulership: 'Aquarius',
      personality: 'Revolutionary, innovative, eccentric, independent',
      influence: 'Rules innovation, rebellion, sudden changes, and awakening',
    },
    affirmation: 'Break free like Uranus — innovate, rebel, transform.',
    spotifyPlaylistId: '37i9dQZF1DX0vHZ8elq0UK',
  },
  {
    name: 'Neptune',
    id: 'neptune',
    stats: {
      orbitSpeed: '5.43 km/s',
      distanceFromSun: '4.50 billion km',
      temperature: '-200°C',
      moons: 14,
    },
    mythology: {
      god: 'Neptune (Poseidon)',
      description: 'Roman god of the sea and storms',
      origin: 'Named after the sea god due to its deep blue color',
    },
    astrology: {
      element: 'Water',
      rulership: 'Pisces',
      personality: 'Mystical, intuitive, dreamy, spiritual',
      influence: 'Governs spirituality, dreams, illusions, and psychic abilities',
    },
    affirmation: 'Flow like Neptune — deep, mysterious, powerful.',
    spotifyPlaylistId: '37i9dQZF1DX3Sp5jK4E6YD',
  },
];

const SolarSystem: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [selectedPlanetId, setSelectedPlanetId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [splineApp, setSplineApp] = useState<any>(null);
  
  // Fetch NASA API data when a planet is selected
  const { planetData, loading: nasaDataLoading, error: nasaDataError } = usePlanetData(
    selectedPlanetId || ''
  );

  const handleSplineLoad = (spline: any) => {
    console.log('Spline scene loaded successfully');
    setSplineApp(spline);
    setIsLoading(false);
    setError(null);
  };

  const handleSplineError = (error: any) => {
    console.error('Spline loading error:', error);
    setError('Failed to load 3D scene');
    setIsLoading(false);
  };

  const handleSplineMouseDown = (e: any) => {
    console.log('=== SPLINE CLICK EVENT DEBUG ===');
    console.log('Event object:', e);
    console.log('SplineApp available:', !!splineApp);

    if (!splineApp) {
      console.log('SplineApp not available yet');
      return;
    }

    // Try to find objects in the scene using splineApp
    try {
      console.log('Attempting to find objects in scene...');
      
      // Get all objects from the scene
      if (splineApp._scene) {
        console.log('Scene available:', splineApp._scene);
        
        // Try different methods to get scene objects
        const scene = splineApp._scene;
        console.log('Scene properties:', Object.keys(scene));
        
        if (scene.children) {
          console.log('Scene children:', scene.children.length);
          scene.children.forEach((child: any, index: number) => {
            console.log(`Child ${index}:`, child.name, child.type);
            if (child.children) {
              child.children.forEach((grandchild: any, gIndex: number) => {
                console.log(`  Grandchild ${gIndex}:`, grandchild.name, grandchild.type);
              });
            }
          });
        }
      }

      // Try to use raycasting to find the clicked object
      if (splineApp._camera && splineApp._renderer) {
        console.log('Camera and renderer available, attempting raycast...');
        
        // Calculate mouse position in normalized device coordinates (-1 to +1)
        const canvas = splineApp.canvas;
        if (canvas) {
          const rect = canvas.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
          
          console.log('Normalized mouse coordinates:', x, y);
          
          // Try to access Three.js raycasting
          if (window.THREE) {
            const raycaster = new window.THREE.Raycaster();
            const mouse = new window.THREE.Vector2(x, y);
            raycaster.setFromCamera(mouse, splineApp._camera);
            
            const intersects = raycaster.intersectObjects(splineApp._scene.children, true);
            console.log('Raycast intersections:', intersects.length);
            
            if (intersects.length > 0) {
              const clickedObject = intersects[0].object;
              console.log('Clicked object:', clickedObject.name, clickedObject.type);
              
              // Try to find planet name in the object hierarchy
              let planetName = '';
              let currentObject: any = clickedObject;
              
              while (currentObject && !planetName) {
                if (currentObject.name && typeof currentObject.name === 'string') {
                  const name = currentObject.name.toLowerCase();
                  console.log('Checking object name:', name);
                  
                  // Check if name contains any planet names
                  const planetMatch = planets.find(p => 
                    name.includes(p.name.toLowerCase()) || 
                    p.name.toLowerCase().includes(name)
                  );
                  
                  if (planetMatch) {
                    planetName = planetMatch.name;
                    console.log('Found planet match:', planetName);
                    break;
                  }
                }
                currentObject = currentObject.parent;
              }
              
              if (planetName) {
                const planet = planets.find(p => p.name === planetName);
                if (planet) {
                  console.log('Setting selected planet:', planet.name);
                  setSelectedPlanet(planet);
                  return;
                }
              }
            }
          }
        }
      }
      
      // Fallback: Use splineApp methods to find objects by name
      console.log('Trying splineApp methods...');
      const splineAppKeys = Object.getOwnPropertyNames(splineApp);
      console.log('SplineApp methods:', splineAppKeys);
      
      // Try to find a method that gives us scene objects
      if (typeof splineApp.findObjectByName === 'function') {
        console.log('findObjectByName method available');
        planets.forEach(planet => {
          try {
            const obj = splineApp.findObjectByName(planet.name);
            if (obj) {
              console.log(`Found ${planet.name} object:`, obj);
            }
          } catch (err) {
            console.log(`Error finding ${planet.name}:`, err);
          }
        });
      }
      
      // Last resort fallback - use mouse position heuristics
      console.log('Using position-based fallback...');
      const canvas = splineApp.canvas;
      if (canvas && e.clientX !== undefined && e.clientY !== undefined) {
        const rect = canvas.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        console.log('Click position relative to canvas:', clickX, clickY);
        console.log('Canvas center:', centerX, centerY);
        
        // More sophisticated position mapping
        const relativeX = (clickX - centerX) / centerX; // -1 to 1
        const relativeY = (clickY - centerY) / centerY; // -1 to 1
        const distanceFromCenter = Math.sqrt(relativeX * relativeX + relativeY * relativeY);
        
        console.log('Relative position:', relativeX, relativeY);
        console.log('Distance from center:', distanceFromCenter);
        
        // Map different screen regions to planets based on typical solar system layout
        let selectedPlanetName = '';
        
        if (distanceFromCenter < 0.1) {
          selectedPlanetName = 'Sun'; // Center
        } else if (distanceFromCenter < 0.2) {
          selectedPlanetName = 'Mercury';
        } else if (distanceFromCenter < 0.3) {
          selectedPlanetName = 'Venus';
        } else if (distanceFromCenter < 0.4) {
          selectedPlanetName = 'Earth';
        } else if (distanceFromCenter < 0.5) {
          selectedPlanetName = 'Mars';
        } else if (distanceFromCenter < 0.7) {
          selectedPlanetName = 'Jupiter';
        } else if (distanceFromCenter < 0.9) {
          selectedPlanetName = 'Saturn';
        } else if (distanceFromCenter < 1.1) {
          selectedPlanetName = 'Uranus';
        } else {
          selectedPlanetName = 'Neptune';
        }
        
        console.log('Position-based planet selection:', selectedPlanetName);
        
        if (selectedPlanetName !== 'Sun') {
          const planet = planets.find(p => p.name === selectedPlanetName);
          if (planet) {
            console.log('Setting planet based on position:', planet.name);
            setSelectedPlanet(planet);
            return;
          }
        }
      }
      
    } catch (error) {
      console.error('Error in click detection:', error);
    }
    
    console.log('No planet detected, not showing panel');
    console.log('=== END SPLINE CLICK DEBUG ===');
  };

  const closePlanetPanel = () => {
    setSelectedPlanet(null);
    setSelectedPlanetId(null);
  };
  
  // Update selectedPlanetId when selectedPlanet changes
  useEffect(() => {
    if (selectedPlanet) {
      setSelectedPlanetId(selectedPlanet.id);
    }
  }, [selectedPlanet]);

  return (
    <div className="w-full h-screen relative bg-cosmic-black">
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-white text-lg">Loading 3D Solar System...</div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-red-400 text-lg text-center">
            <p>{error}</p>
            <p className="text-sm mt-2">Please check your internet connection</p>
          </div>
        </div>
      )}

      {/* Spline 3D Solar System */}
      <div className="w-full h-full">
        <Spline 
          scene="https://prod.spline.design/h532oH-cspaWinGF/scene.splinecode"
          onLoad={handleSplineLoad}
          onError={handleSplineError}
          onMouseDown={handleSplineMouseDown}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Planet Info Panels */}
      <AnimatePresence>
        {/* Original Planet Info Panel */}
        {selectedPlanet && (
          <motion.div
            className="fixed right-0 top-0 h-full w-96 bg-gray-900 p-6 z-10 overflow-y-auto border-l border-cosmic-blue-neon/30"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <button
              onClick={closePlanetPanel}
              className="absolute top-4 right-4 text-white hover:text-cosmic-blue-neon transition-colors"
            >
              ✕
            </button>

            <div className="mt-8">
              <h2 className="text-3xl font-serif-display text-white mb-2">
                {selectedPlanet.name}
              </h2>
              
              {/* NASA API Data Section */}
              {nasaDataLoading ? (
                <div className="p-4 text-white">Loading NASA data...</div>
              ) : nasaDataError ? (
                <div className="p-4 text-red-400">Error loading NASA data</div>
              ) : planetData ? (
                <div className="glass-panel p-4 rounded-lg mb-6">
                  <h3 className="text-cosmic-blue-neon font-semibold mb-3 flex items-center">
                    🚀 NASA Data
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-cosmic-gray-light">Distance from Sun:</span>
                      <span className="text-white ml-2">{planetData.distanceFromSun} million km</span>
                    </div>
                    <div>
                      <span className="text-cosmic-gray-light">Orbit Period:</span>
                      <span className="text-white ml-2">{planetData.orbitPeriod} days</span>
                    </div>
                    <div>
                      <span className="text-cosmic-gray-light">Rotation Period:</span>
                      <span className="text-white ml-2">{planetData.rotationPeriod} hours</span>
                    </div>
                    <div>
                      <span className="text-cosmic-gray-light">Average Temperature:</span>
                      <span className="text-white ml-2">{planetData.averageTemperature} °C</span>
                    </div>
                    <div>
                      <span className="text-cosmic-gray-light">Moons:</span>
                      <span className="text-white ml-2">{planetData.moons}</span>
                    </div>
                  </div>
                </div>
              ) : null}
              
              <div className="space-y-6">
                {/* Stats Section */}
                <div className="glass-panel p-4 rounded-lg">
                  <h3 className="text-cosmic-blue-neon font-semibold mb-3 flex items-center">
                    🔭 Cosmic Stats
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-cosmic-gray-light">Orbit Speed:</span>
                      <span className="text-white ml-2">{selectedPlanet.stats.orbitSpeed}</span>
                    </div>
                    <div>
                      <span className="text-cosmic-gray-light">Distance from Sun:</span>
                      <span className="text-white ml-2">{selectedPlanet.stats.distanceFromSun}</span>
                    </div>
                    <div>
                      <span className="text-cosmic-gray-light">Temperature:</span>
                      <span className="text-white ml-2">{selectedPlanet.stats.temperature}</span>
                    </div>
                    <div>
                      <span className="text-cosmic-gray-light">Moons:</span>
                      <span className="text-white ml-2">{selectedPlanet.stats.moons}</span>
                    </div>
                  </div>
                </div>

                {/* Mythology Section */}
                <div className="glass-panel p-4 rounded-lg">
                  <h3 className="text-cosmic-blue-neon font-semibold mb-3 flex items-center">
                    🧙‍♂️ Ancient Wisdom
                  </h3>
                  <p className="text-white font-semibold">{selectedPlanet.mythology.god}</p>
                  <p className="text-cosmic-gray-light text-sm mt-1">
                    {selectedPlanet.mythology.description}
                  </p>
                  <p className="text-cosmic-gray-light text-sm mt-2 italic">
                    Origin: {selectedPlanet.mythology.origin}
                  </p>
                </div>

                {/* Astrology Section */}
                <div className="glass-panel p-4 rounded-lg">
                  <h3 className="text-cosmic-blue-neon font-semibold mb-3 flex items-center">
                    ⭐ Astrological Influence
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-cosmic-gray-light">Element:</span>
                      <span className="text-white ml-2">{selectedPlanet.astrology.element}</span>
                    </div>
                    <div>
                      <span className="text-cosmic-gray-light">Rules:</span>
                      <span className="text-white ml-2">{selectedPlanet.astrology.rulership}</span>
                    </div>
                    <div>
                      <span className="text-cosmic-gray-light">Personality:</span>
                      <span className="text-white ml-2">{selectedPlanet.astrology.personality}</span>
                    </div>
                    <div className="mt-3">
                      <span className="text-cosmic-gray-light">Influence:</span>
                      <p className="text-white mt-1">{selectedPlanet.astrology.influence}</p>
                    </div>
                  </div>
                </div>

                {/* Affirmation Section */}
                <div className="glass-panel p-4 rounded-lg">
                  <h3 className="text-cosmic-blue-neon font-semibold mb-3 flex items-center">
                    ✨ Daily Affirmation
                  </h3>
                  <p className="text-white italic">"{selectedPlanet.affirmation}"</p>
                </div>

                {/* Spotify Section */}
                <div className="glass-panel p-4 rounded-lg">
                  <h3 className="text-cosmic-blue-neon font-semibold mb-3 flex items-center">
                    🎧 Cosmic Vibes
                  </h3>
                  <iframe
                    src={`https://open.spotify.com/embed/playlist/${selectedPlanet.spotifyPlaylistId}?utm_source=generator&theme=0`}
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating UI */}
      <div className="absolute top-6 left-6 z-10">
        <motion.div
          className="glass-panel px-4 py-2 rounded-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h1 className="text-white font-serif-display text-xl">COSMIQ</h1>
        </motion.div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-6 left-6 z-10">
        <motion.div
          className="glass-panel px-4 py-2 rounded-lg max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <p className="text-cosmic-gray-light text-sm">
            Click on planets to explore their cosmic secrets
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SolarSystem;
