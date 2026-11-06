import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { create as createHandlebars } from 'express-handlebars';
import { registerViteHelper } from './vite.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Exportar la función de configuración
export default function configureHandlebars(app) {
  // Configurar Handlebars
  const exphbs = createHandlebars({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '../views/layouts'),
  });

  // Registrar el helper de Vite
  registerViteHelper(exphbs.handlebars);

  // Registrar el motor de vistas en Express
  app.engine('hbs', exphbs.engine);
  app.set('view engine', 'hbs');

  // Establecer la ubicación de las vistas
  app.set('views', path.join(__dirname, '../views'));
}