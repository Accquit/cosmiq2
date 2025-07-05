import { useState, useEffect } from 'react';

// Define the planet data interface
export interface PlanetData {
  id: string;
  name: string;
  distanceFromSun: number; // in million km
  orbitPeriod: number; // in days
  rotationPeriod: number; // in hours
  averageTemperature: number; // in °C
  moons: number;
}

// Function to fetch planet data from NASA Solar System API
export const fetchPlanetData = async (planetId: string): Promise<PlanetData> => {
  try {
    // NASA Solar System API endpoint
    const response = await fetch(`https://api.le-systeme-solaire.net/rest/bodies/${planetId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data for planet ${planetId}`);
    }
    
    const data = await response.json();
    
    // Transform the API response to our PlanetData interface
    return {
      id: planetId,
      name: data.englishName,
      distanceFromSun: data.semimajorAxis ? parseFloat((data.semimajorAxis / 1000000).toFixed(2)) : 0, // Convert to million km
      orbitPeriod: data.sideralOrbit ? parseFloat(data.sideralOrbit.toFixed(2)) : 0,
      rotationPeriod: data.sideralRotation ? parseFloat(data.sideralRotation.toFixed(2)) : 0,
      averageTemperature: data.avgTemp ? parseFloat((data.avgTemp - 273.15).toFixed(2)) : 0, // Convert from K to °C
      moons: data.moons ? data.moons.length : 0
    };
  } catch (error) {
    console.error(`Error fetching planet data for ${planetId}:`, error);
    throw error;
  }
};

// Custom hook to use planet data
export const usePlanetData = (planetId: string) => {
  const [planetData, setPlanetData] = useState<PlanetData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadPlanetData = async () => {
      try {
        setLoading(true);
        const data = await fetchPlanetData(planetId);
        setPlanetData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        setPlanetData(null);
      } finally {
        setLoading(false);
      }
    };

    loadPlanetData();
  }, [planetId]);

  return { planetData, loading, error };
};