import { PlanetData, fetchPlanetData } from '../services/nasaApi';

/**
 * Utility function to get data for all planets in the solar system
 * @returns Promise that resolves to an array of PlanetData objects
 */
export const getAllPlanetsData = async (): Promise<PlanetData[]> => {
  const planetIds = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
  
  try {
    // Use Promise.all to fetch data for all planets in parallel
    const planetsData = await Promise.all(
      planetIds.map(id => fetchPlanetData(id))
    );
    
    return planetsData;
  } catch (error) {
    console.error('Error fetching all planets data:', error);
    throw error;
  }
};

/**
 * Get a formatted string of a planet's distance from the Sun
 * @param distanceInMillionKm Distance in million kilometers
 * @returns Formatted string with appropriate unit (million km or billion km)
 */
export const formatDistanceFromSun = (distanceInMillionKm: number): string => {
  if (distanceInMillionKm >= 1000) {
    // Convert to billion km for large distances
    return `${(distanceInMillionKm / 1000).toFixed(2)} billion km`;
  }
  return `${distanceInMillionKm.toFixed(2)} million km`;
};

/**
 * Format temperature with the appropriate unit
 * @param tempInCelsius Temperature in Celsius
 * @returns Formatted temperature string with °C
 */
export const formatTemperature = (tempInCelsius: number): string => {
  return `${tempInCelsius.toFixed(1)} °C`;
};

/**
 * Format the rotation period in a human-readable way
 * @param rotationHours Rotation period in hours
 * @returns Formatted rotation period string
 */
export const formatRotationPeriod = (rotationHours: number): string => {
  if (rotationHours >= 24) {
    const days = rotationHours / 24;
    return `${days.toFixed(1)} Earth days`;
  }
  return `${rotationHours.toFixed(1)} hours`;
};

/**
 * Format the orbit period in a human-readable way
 * @param orbitDays Orbit period in Earth days
 * @returns Formatted orbit period string
 */
export const formatOrbitPeriod = (orbitDays: number): string => {
  if (orbitDays >= 365) {
    const years = orbitDays / 365;
    return `${years.toFixed(1)} Earth years`;
  }
  return `${orbitDays.toFixed(1)} Earth days`;
};