export default function manifest() {
  return {
    name: 'GameZync - Ultimate Gaming Platform',
    short_name: 'GameZync',
    description: 'The ultimate PC gaming platform. Sync your hardware specs, play instant web games, and download PC titles.',
    start_url: '/',
    display: 'standalone',
    orientation: 'any',
    background_color: '#0a0d14',
    theme_color: '#10b981',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ]
  };
}
