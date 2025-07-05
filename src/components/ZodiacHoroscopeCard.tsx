import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { zodiacPlanetMap } from '../data/zodiacPlanetMap';

interface ZodiacHoroscopeCardProps {
  sign: string;
}

type HoroscopeData = {
  description: string;
  mood: string;
  lucky_color: string;
  lucky_number: string;
  lucky_time: string;
  date_range: string;
  current_date: string;
};

const PLANET_EMOJIS: Record<string, string> = {
  sun: '☀️',
  moon: '🌙',
  mercury: '☿️',
  venus: '♀️',
  mars: '♂️',
  jupiter: '♃',
  saturn: '♄',
  uranus: '♅',
  neptune: '♆',
  pluto: '♇',
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const ZodiacHoroscopeCard: React.FC<ZodiacHoroscopeCardProps> = ({ sign }) => {
  const [horoscope, setHoroscope] = useState<HoroscopeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [day] = useState<'daily'>('daily');

  const fetchHoroscope = async () => {
    setLoading(true);
    setError('');
    setHoroscope(null);
    try {
      const res = await fetch('https://aztro.sameerkumar.v1.p.rapidapi.com/', {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': 'e0f766a9e2mshe00582990c30743p1918eejsn5bbf1d8241e0',
          'X-RapidAPI-Host': 'aztro.sameerkumar.v1.p.rapidapi.com',
        },
        body: new URLSearchParams({
          sign: sign.toLowerCase(),
          day: 'today',
        }),
      });
      if (!res.ok) throw new Error('Failed to fetch horoscope');
      const data = await res.json();
      setHoroscope({
        description: data.description,
        mood: data.mood,
        lucky_color: data.color,
        lucky_number: data.lucky_number,
        lucky_time: data.lucky_time,
        date_range: data.date_range,
        current_date: data.current_date,
      });
    } catch (err) {
      setError('Could not fetch horoscope. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoroscope();
    // eslint-disable-next-line
  }, [sign]);

  const planet = zodiacPlanetMap[sign.toLowerCase()];
  const planetEmoji = planet ? PLANET_EMOJIS[planet] || '' : '';

  const handleCopy = () => {
    if (!horoscope) return;
    const text = `My ${capitalize(sign)} horoscope: ${horoscope.description} (Mood: ${horoscope.mood}, Lucky color: ${horoscope.lucky_color}, Lucky number: ${horoscope.lucky_number}, Lucky time: ${horoscope.lucky_time}) — via COSMIQ 🌌`;
    navigator.clipboard.writeText(text);
  };

  const handleTweet = () => {
    if (!horoscope) return;
    const text = `My ${capitalize(sign)} horoscope: ${horoscope.description} (Mood: ${horoscope.mood}, Lucky color: ${horoscope.lucky_color}, Lucky number: ${horoscope.lucky_number}, Lucky time: ${horoscope.lucky_time}) — via COSMIQ 🌌 #horoscope #cosmicidentity`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-md w-full mx-auto rounded-3xl p-6 shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 relative overflow-hidden flex flex-col items-center"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-3xl">{capitalize(sign)}</span>
        {planet && (
          <span className="text-xl text-cosmic-accent">{planetEmoji} {capitalize(planet)}</span>
        )}
      </div>
      <div className="text-xs text-white/60 mb-2">{horoscope?.date_range}</div>
      <div className="flex gap-2 mb-4">
        <button
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all bg-cosmic-accent text-white`}
          disabled
        >Today</button>
      </div>
      {loading && <div className="text-white/80 py-8">Loading your cosmic message...</div>}
      {error && <div className="text-red-400 py-8">{error}</div>}
      {horoscope && !loading && !error && (
        <>
          <div className="text-white text-lg text-center mb-4">{horoscope.description}</div>
          <div className="flex flex-wrap gap-4 justify-center mb-4">
            <div className="bg-white/10 rounded-xl px-4 py-2 text-sm text-white flex flex-col items-center">
              <span className="font-semibold">Mood</span>
              <span>{horoscope.mood}</span>
            </div>
            <div className="bg-white/10 rounded-xl px-4 py-2 text-sm text-white flex flex-col items-center">
              <span className="font-semibold">Lucky Color</span>
              <span>{horoscope.lucky_color}</span>
            </div>
            <div className="bg-white/10 rounded-xl px-4 py-2 text-sm text-white flex flex-col items-center">
              <span className="font-semibold">Lucky Number</span>
              <span>{horoscope.lucky_number}</span>
            </div>
            <div className="bg-white/10 rounded-xl px-4 py-2 text-sm text-white flex flex-col items-center">
              <span className="font-semibold">Lucky Time</span>
              <span>{horoscope.lucky_time}</span>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleCopy}
              className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white px-4 py-2 text-sm font-medium shadow transition-all"
              title="Copy Horoscope"
            >📋 Copy</button>
            <button
              onClick={handleTweet}
              className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white px-4 py-2 text-sm font-medium shadow transition-all"
              title="Share on Twitter"
            >🐦 Tweet</button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ZodiacHoroscopeCard; 