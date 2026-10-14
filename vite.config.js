// Importando el configurador de Vite
import { defineConfig } from 'vite';

// Importando las rutas
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

// Importando Tailwind CSS
import tailwindcss from '@tailwindcss/vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: 'src',

  // Configuración de Tailwind CSS
  plugins: [tailwindcss()],

  server: {
    port: 5173,
    host: true,
    cors: true,
    strictPort: true
  },

  // Configuración de producción
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    manifest: true,

    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main.js')
      }
    }
  }
});
