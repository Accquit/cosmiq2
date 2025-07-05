# COSMIQ 🌌

**COSMIQ** is a space-themed, interactive React + Tailwind web app where users explore planets, discover their cosmic identity, and get daily zodiac horoscopes. Designed for hackathons, it features a beautiful, glassmorphic UI, cosmic themes, and shareable experiences.

---

## 🚀 Features

- **3D Solar System Homepage:**
  - Built with Spline, with floating cosmic navigation (🪐, 🔮, ❓, theme switcher).
- **Planet Explorer:**
  - Select planets, view mythological info, affirmations, and Spotify playlists.
  - Responsive sidebar, sticky header, and cosmic theme switcher.
- **Zodiac Horoscope:**
  - Get your daily horoscope for any zodiac sign (via RapidAPI Aztro).
  - See ruling planet, mood, lucky color/number/time, and share your cosmic message.
- **Shareable Cosmic Identity Card:**
  - Generate a beautiful card with your planet, myth, affirmation, playlist, and name.
  - Download as PNG, copy, or share on Twitter.
- **Cosmic Match:**
  - Compare two planets' cosmic cards and see your compatibility.
- **Story Mode:**
  - Character-guided walkthrough for first-time visitors, with Framer Motion animations.
- **Cosmic Theme Switcher:**
  - Cycle through Nebula, Aurora, Supernova, and Galaxy themes (subpages only).
- **Mobile Responsive & Accessible:**
  - All features are mobile-friendly and keyboard accessible.
- **Glassmorphic, glowing, cosmic design:**
  - Consistent use of Tailwind, gradients, and Framer Motion.

---

## 🛠️ Tech Stack

- **React** (Vite)
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Spline** (3D solar system)
- **RapidAPI Aztro** (zodiac horoscopes)
- **Spotify Embed** (planetary playlists)

---

## ⚡ Quick Start

1. **Clone the repo:**
   ```bash
   git clone https://github.com/Accquit/cosmiq2.git
   cd cosmiq2
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```
3. **Start the dev server:**
   ```bash
   npm run dev
   # or
   bun run dev
   ```
4. **Open in your browser:**
   - Visit [http://localhost:5173](http://localhost:5173)

---

## 🔮 Zodiac Horoscope API
- Uses [Aztro API via RapidAPI](https://rapidapi.com/sameer.kumar/api/aztro)
- You can set your RapidAPI key in the code (see `ZodiacHoroscopeCard.tsx`)
- No authentication or headers needed for other features

---

## ✨ Screenshots

> _Add screenshots or a demo GIF here for hackathon judging!_

---

## 🏆 Hackathon Polish
- **No authentication required** (fast, fun, and shareable)
- **Creative local data** for mythology, affirmations, and playlists
- **Easter eggs, daily facts, and achievements** (suggested for future)
- **Live demo ready** (just deploy to Vercel/Netlify)

---

## 🙏 Credits
- **Aztro API** for horoscopes
- **Spline** for 3D solar system
- **Spotify** for music embeds
- **All contributors and hackathon judges!**

---

## 📄 License
MIT 