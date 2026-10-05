// Biblioteca File Stream
import fs from 'node:fs';
// Biblioteca de rutas
import path from 'node:path';
import { fileURLToPath } from 'node:url'
//creando variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
//helper para hadelbars que genera las etiquetas de vite en desarrollo 
//conecta al servidor de desarrollo 
//en produccion usa los compilados de vite 
    // Obtener modo de ejecución
export function viteAssets() {

    // Obtener modo de ejecución
    const isDev = process.env.NODE_ENV !== 'production';

    // URL del servidor de desarrollo
    const viteDevServer =
        process.env.VITE_DEV_SERVER || 'http://localhost:5173';

    if (isDev) {

        // En desarrollo, cargamos los archivos
        // del front-end directamente del servidor
        // de desarrollo de Vite

        return `
            <script type="module" src="${viteDevServer}/@vite/client"></script>
            <script type="module" src="${viteDevServer}/main.js"></script>
        `;
    }
    //en produccion leemos el manifest y generamos las etiquetas finales de produccion
    const manifestPath = path.join(__dirname,'..','..','dist', '.vite', 'manifest.json');
    // Si no existe el manifest
    if (!fs.existsSync(manifestPath)) {
        console.warn(
            "Vite manifest not found. Run 'npm run build' first."
        );
        return ''
}
}