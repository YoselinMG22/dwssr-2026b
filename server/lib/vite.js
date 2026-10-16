
import fs from 'node:fs';
import path from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Obtener la ruta actual del archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Generar las etiquetas de Vite para Handlebars
export function viteAssets() {
    const isDev = process.env.NODE_ENV !== 'production';

    // URL del servidor de desarrollo de Vite
    const viteDevServer =
        process.env.VITE_DEV_SERVER ||
        (
            process.env.CODESPACE_NAME &&
            process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN
                ? `https://${process.env.CODESPACE_NAME}-5173.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`
                : 'http://localhost:5173'
        );

    // Modo desarrollo
    if (isDev) {
        return `
            <script type="module" src="${viteDevServer}/@vite/client"></script>
            <script type="module" src="${viteDevServer}/main.js"></script>
        `;
    }

    // Ruta del manifiesto generado por npm run build
    const manifestPath = path.join(
        __dirname,
        '..',
        '..',
        'dist',
        '.vite',
        'manifest.json'
    );

    if (!fs.existsSync(manifestPath)) {
        console.warn(
            "No se encontró el manifiesto de Vite. Ejecuta 'npm run build'."
        );
        return '';
    }

    // Leer el manifiesto
    const manifest = JSON.parse(
        fs.readFileSync(manifestPath, 'utf-8')
    );

    const mainEntry = manifest['main.js'];

    if (!mainEntry) {
        console.warn('No se encontró main.js en el manifiesto de Vite.');
        return '';
    }

    let tags = '';

    // Cargar los archivos CSS compilados
    if (mainEntry.css) {
        for (const cssFile of mainEntry.css) {
            tags += `<link rel="stylesheet" href="/${cssFile}">\n`;
        }
    }

    // Cargar el JavaScript compilado
    tags += `<script type="module" src="/${mainEntry.file}"></script>`;

    return tags;
}

// Registrar el helper de Handlebars
export function registerViteHelper(hbs) {
    hbs.registerHelper('viteAssets', () => {
        return new hbs.SafeString(viteAssets());
    });
}
