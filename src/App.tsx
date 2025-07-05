import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import ShareableCard from './pages/ShareableCard';
import MatchPage from './pages/MatchPage';

const PlanetExplorer = lazy(() => import('./components/PlanetExplorer'));
const ZodiacHoroscope = lazy(() => import('./pages/ZodiacHoroscope'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/card" element={<ShareableCard />} />
        <Route path="/match" element={<MatchPage />} />
        <Route path="/planet-explorer" element={
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <PlanetExplorer />
          </Suspense>
        } />
        <Route path="/zodiac" element={
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <ZodiacHoroscope />
          </Suspense>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;