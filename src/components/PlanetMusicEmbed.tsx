import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchSpotifyPlaylist } from '../services/spotifyApi';
import Loader from './Loader';

import { spotifyPlaylists } from '../data/spotifyPlaylists';

interface PlanetMusicEmbedProps {
  planetId: string;
  planetName: string;
}

const playlistMap: Record<string, string> = {
  mercury: '37i9dQZF1DXcBWIGoYBM5M', // Today's Top Hits
  venus: '37i9dQZF1DX4WYpdgoIcn6',  // Chill Hits
  earth: '37i9dQZF1DX4UtSsGT1Sbe',  // All Out 80s
  mars: '37i9dQZF1DX1lVhptIYRda',   // Rock Classics
  jupiter: '37i9dQZF1DX0XUsuxWHRQd',// RapCaviar
  saturn: '37i9dQZF1DX4SBhb3fqCJd', // Peaceful Piano
  uranus: '37i9dQZF1DX4fpCWaHOned', // Jazz Classics
  neptune: '37i9dQZF1DX2sUQwD7tbmL',// Deep Focus
};

const PlanetMusicEmbed: React.FC<PlanetMusicEmbedProps> = ({ planetId, planetName }) => {
  const [playlist, setPlaylist] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const playlistId = playlistMap[planetId];

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');
    setPlaylist(null);
    if (!playlistId) {
      setError('No playlist found for this planet.');
      setLoading(false);
      return;
    }
    fetchSpotifyPlaylist(playlistId)
      .then(data => {
        if (mounted) {
          setPlaylist(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setError('Could not load playlist.');
          setLoading(false);
        }
      });
    return () => { mounted = false; };
  }, [playlistId]);

  if (loading) return <Loader message={`Tuning into ${planetName}'s cosmic playlist...`} planetId={planetId} />;
  if (error) return <div className="text-red-400 py-8 text-center">{error}</div>;
  if (!playlist) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8 rounded-2xl shadow-2xl bg-gradient-to-br from-white/10 via-cosmic-purple/5 to-cosmic-blue-neon/5 backdrop-blur-md border border-cosmic-blue-neon/20 relative overflow-hidden"
    >
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cosmic-purple/10 via-cosmic-blue-neon/5 to-cosmic-purple/10 blur-xl"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.4 }}
            className="text-6xl mb-4"
    >
            🎧
          </motion.div>
          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cosmic-blue-neon to-cosmic-purple-light mb-2">
            The Sound of {planetName}
      </h3>
          <p className="text-cosmic-blue-light text-lg">
            Immerse yourself in cosmic vibrations
          </p>
        </motion.div>

        {/* Music Player */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
            {playlist.images?.[0]?.url && (
              <img src={playlist.images[0].url} alt="Playlist cover" className="w-24 h-24 rounded-xl shadow-lg object-cover" />
            )}
            <div className="flex-1 min-w-0">
              <div className="text-lg font-bold text-white truncate">{playlist.name}</div>
              <div className="text-cosmic-gray-light text-sm mb-2 truncate">{playlist.description?.replace(/<[^>]+>/g, '')}</div>
              <div className="text-xs text-cosmic-blue-light mb-1">Top Tracks:</div>
              <ol className="list-decimal list-inside space-y-1">
                {playlist.tracks?.items?.slice(0, 5).map((item: any, i: number) => (
                  <li key={item.track.id || i} className="text-white/90 truncate">
                    {item.track.name} <span className="text-cosmic-blue-light">by {item.track.artists.map((a: any) => a.name).join(', ')}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        <iframe
            src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
          width="100%"
          height="80"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
            className="rounded-lg"
            title="Spotify Playlist"
          />
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 pt-4 border-t border-cosmic-blue-neon/30 text-center"
        >
          <p className="text-xs text-gray-500">
            Let the music guide your cosmic journey ✨
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PlanetMusicEmbed;