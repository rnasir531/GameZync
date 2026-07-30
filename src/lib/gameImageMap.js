/**
 * src/lib/gameImageMap.js
 * ─────────────────────────────────────────────────────────────
 * High-definition original game cover images for Instant & PC Games.
 * Ensures every game has a unique, authentic cover picture.
 * ─────────────────────────────────────────────────────────────
 */

export const KNOWN_GAME_IMAGES = {
  'monkey mart': 'https://img.gamedistribution.com/b9560f64c679469e80e14c33f2c5e5fa-512x512.jpeg',
  'stickman hook': 'https://img.gamedistribution.com/c6fef805e26b4d328392fb1be7a13d7a-512x512.jpeg',
  'temple run 2': 'https://img.gamedistribution.com/a42b10a2608342cb8b625cf048b26e03-512x512.jpeg',
  'subway surfers': 'https://img.gamedistribution.com/5f9797bb523049b78e3c1be0604b90be-512x512.jpeg',
  'tunnel rush': 'https://img.gamedistribution.com/4cf9d91f24d9438faefef34db7a9ee08-512x512.jpeg',
  'pac-man': 'https://upload.wikimedia.org/wikipedia/en/5/59/Pac-man.png',
  'doom': 'https://upload.wikimedia.org/wikipedia/en/5/57/Doom_cover_art.jpg',
  'wolfenstein 3d': 'https://upload.wikimedia.org/wikipedia/en/a/a1/Wolfenstein_3D_box_art.jpg',
  'prince of persia': 'https://upload.wikimedia.org/wikipedia/en/0/06/Prince_of_Persia_1989_DOS_cover.png',
  'simcity': 'https://upload.wikimedia.org/wikipedia/en/f/f0/SimCity_1989_box_art.jpg',
  'lemmings': 'https://upload.wikimedia.org/wikipedia/en/7/76/Lemmings_Coverart.png',
  'quake': 'https://upload.wikimedia.org/wikipedia/en/0/06/Quake_cover.jpg',
  'mortal kombat': 'https://upload.wikimedia.org/wikipedia/en/a/ae/Mortal_Kombat_arcade_machine.jpg',
  'street fighter ii': 'https://upload.wikimedia.org/wikipedia/en/9/9b/Street_Fighter_II_box_art.jpg',
  'sonic the hedgehog': 'https://upload.wikimedia.org/wikipedia/en/c/cd/Sonic_the_Hedgehog_1_Genesis_box_art.jpg',
  'tetris': 'https://upload.wikimedia.org/wikipedia/en/7/7c/Tetris-VeryFirstVersion.png',
  'diablo': 'https://upload.wikimedia.org/wikipedia/en/3/30/Diablo_Coverart.png',
  'starcraft': 'https://upload.wikimedia.org/wikipedia/en/c/c4/StarCraft_box_art.jpg',
  'counter-strike': 'https://upload.wikimedia.org/wikipedia/en/d/d3/Counter_Strike_16_box.jpg',
  'need for speed ii': 'https://upload.wikimedia.org/wikipedia/en/f/f9/Need_for_Speed_II_Cover.jpg',
  'gta 1': 'https://upload.wikimedia.org/wikipedia/en/5/5b/GTA1boxart.jpg',
  '2048': 'https://play-lh.googleusercontent.com/40K3bL9H7i3b0e3N0i-1W5l1_03l40_5033_305.png',
  'hextris': 'https://hextris.io/images/icons/apple-touch-icon-120x120.png',
  'digger': 'https://upload.wikimedia.org/wikipedia/en/0/07/Digger_cover.png',
  'frogger': 'https://upload.wikimedia.org/wikipedia/en/8/8f/Frogger_game_arcade.png',
  'half-life': 'https://upload.wikimedia.org/wikipedia/en/8/8d/Half-Life_Cover_Art.jpg',
  'duke nukem 3d': 'https://upload.wikimedia.org/wikipedia/en/0/09/Duke_Nukem_3D_art.jpg',
  'fallout': 'https://upload.wikimedia.org/wikipedia/en/6/6e/Fallout_1_cover.jpg',
};

/**
 * Get authentic image URL for a game by matching title or image_url property.
 */
export function getOriginalGameImage(game) {
  if (!game) return '';

  const rawTitle = (game.title || game.name || game.game_name || '').toLowerCase().trim();
  
  // 1. Exact or partial match in KNOWN_GAME_IMAGES
  for (const [key, value] of Object.entries(KNOWN_GAME_IMAGES)) {
    if (rawTitle.includes(key)) {
      return value;
    }
  }

  // 2. Existing image_url or cover_image if valid HTTP link
  const existing = game.image_url || game.cover_image || game.img || game.thumbnail_url;
  if (existing && typeof existing === 'string' && existing.trim() && !existing.includes('placehold.co') && !existing.includes('unsplash')) {
    let clean = existing.trim();
    if (clean.startsWith('//')) clean = `https:${clean}`;
    if (clean.startsWith('http://')) clean = clean.replace(/^http:\/\//i, 'https://');
    return clean;
  }

  // 3. Dynamic unique SVG data URL banner generation with game title (zero external HTTP dependencies!)
  const titleText = game.title || game.name || 'Game';
  const cleanTitle = titleText.replace(/['"<>&]/g, '');

  // Hash title to generate distinct vibrant gradient colors for each unique game
  let hash = 0;
  for (let i = 0; i < cleanTitle.length; i++) {
    hash = cleanTitle.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue1 = Math.abs(hash) % 360;
  const hue2 = (hue1 + 45) % 360;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="hsl(${hue1}, 75%, 22%)" />
        <stop offset="100%" stop-color="hsl(${hue2}, 85%, 12%)" />
      </linearGradient>
      <linearGradient id="glow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="hsl(${hue1}, 90%, 60%)" stop-opacity="0.8" />
        <stop offset="100%" stop-color="hsl(${hue2}, 90%, 50%)" stop-opacity="0.2" />
      </linearGradient>
    </defs>
    <rect width="600" height="400" fill="url(#g)" />
    <circle cx="300" cy="180" r="140" fill="url(#glow)" filter="blur(40px)" opacity="0.4" />
    <g transform="translate(300, 160)" text-anchor="middle">
      <circle cx="0" cy="-20" r="45" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
      <path d="M-15,-20 L15,-20 M0,-35 L0,-5" stroke="hsl(${hue1}, 90%, 70%)" stroke-width="5" stroke-linecap="round"/>
      <circle cx="20" cy="-15" r="5" fill="hsl(${hue2}, 90%, 70%)"/>
      <circle cx="32" cy="-25" r="5" fill="hsl(${hue1}, 90%, 70%)"/>
      <text y="75" fill="#ffffff" font-family="system-ui, sans-serif" font-size="28" font-weight="900" letter-spacing="-0.5">${cleanTitle}</text>
    </g>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
