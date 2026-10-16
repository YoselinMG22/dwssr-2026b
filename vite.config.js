
import { defineConfig } from 'vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';

// Obtener la ruta del proyecto
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    // Directorio donde se encuentra main.js
    root: resolve(__dirname, 'src'),

    // Plugin de Tailwind CSS
    plugins: [tailwindcss()],

    // Configuración del servidor de desarrollo

    // Configuración del servidor de desarrollo
    server: {
        port: 5173,
        host: '0.0.0.0',
        cors: {
            origin: [
                'http://localhost:3000',
                'http://127.0.0.1:3000'
            ]
        },
        strictPort: true,
        hmr: {
            host: 'localhost'
        }
    },


    // Configuración de producción
    build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
        manifest: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/main.js')
            }
        }
    }
});
