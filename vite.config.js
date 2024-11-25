import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'https://sneakershop-6lmk.onrender.com', // API server
        changeOrigin: true, // Verandert de origin van het verzoek
        secure: false, // Als je met een zelfondertekend certificaat werkt, stel dit in op false
        rewrite: (path) => path.replace(/^\/api/, ''), // Zorg ervoor dat /api correct wordt doorgegeven
      },
      '/socket.io': {
        target: 'https://sneakershop-6lmk.onrender.com', // WebSocket server
        ws: true,  // Enable WebSocket proxying
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
