import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://sneakershop-6lmk.onrender.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/socket.io': {
        target: 'https://sneakershop-6lmk.onrender.com',
        ws: true,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

// import { defineConfig } from 'vite';
// import vue from '@vitejs/plugin-vue';
// import tailwindcss from 'tailwindcss';

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://sneakershop-6lmk.onrender.com', // API server
//         changeOrigin: true, // Verandert de origin van het verzoek
//         secure: false, // Als je met een zelfondertekend certificaat werkt, stel dit in op false
//         rewrite: (path) => path.replace(/^\/api/, ''), // Zorg ervoor dat /api correct wordt doorgegeven
//       },
//       '/socket.io': {
//         target: 'https://sneakershop-6lmk.onrender.com', // WebSocket server
//         ws: true,  // Enable WebSocket proxying
//         changeOrigin: true,
//         secure: false,
//       },
//       css: {
//         postcss: {
//           plugins: [tailwindcss]
//         }
//       }
//     },
//   },
// });
