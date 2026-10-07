// Biblioteca File Stream
import fs from 'node:fs';

// Biblioteca de rutas
import path from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Creando variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper para Handlebars que genera las etiquetas de Vite
// Conecta al servidor de desarrollo
// En producción usa los compilados de Vite

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

    // En producción leemos el manifest
    // y generamos las etiquetas finales
    const manifestPath = path.join(
        __dirname,
        '..',
        '..',
        'dist',
        '.vite',
        'manifest.json'
    );

    // Si no existe el manifest
    if (!fs.existsSync(manifestPath)) {
        console.warn(
            "Vite manifest not found. Run 'npm run build' first."
        );
        return '';
    }

    // Leyendo y parseando el archivo de manifiesto que genera Vite
    const manifest = JSON.parse(
        fs.readFileSync(manifestPath, 'utf-8')
    );

    // Obteniendo la ruta del punto de entrada del frontend
    const mainEntry = manifest['main.js'];

    // Si no existe main.js
    if (!mainEntry) {
        console.warn(
            'El archivo main.js no está disponible en el manifiesto de Vite'
        );
        return '';
    }

    let tags = '';

    // CSS files
    if (mainEntry.css) {
        mainEntry.css.forEach((cssFile) => {
            tags += `<link rel="stylesheet" href="/${cssFile}">\n`;
        });
    }

    // JS files
    tags += `<script type="module" src="/${mainEntry.file}"></script>`;

    return tags;
}

// Registrar Helper de Handlebars
export function registerViteHelper(hbs) {
    hbs.registerHelper('viteAssets', () => {
        return new hbs.SafeString(viteAssets());
    });
}