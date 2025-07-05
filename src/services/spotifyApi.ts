const CLIENT_ID = '8f6caedce8224fa882b38ab9971b3643';
const CLIENT_SECRET = '5fdd4bedc402480283a94958571f25b4';

let accessToken: string | null = null;
let tokenExpiry: number | null = null;

async function fetchSpotifyToken() {
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }
  const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${creds}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  if (!res.ok) throw new Error('Failed to fetch Spotify token');
  const data = await res.json();
  accessToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000; // expire 1 min early
  return accessToken;
}

export async function fetchSpotifyPlaylist(playlistId: string) {
  const token = await fetchSpotifyToken();
  const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch playlist');
  return await res.json();
} 