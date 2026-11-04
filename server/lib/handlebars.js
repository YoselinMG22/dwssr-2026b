import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { create as createHandlebars } from 'express-handlebars';
import { registerViteHelper } from './vite.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Exportar la función de configuración
export default function configureHandlebars(app) {

  // Estableciendo la extensión de las vistas en .hbs
  // Y estableciendo el layout principal en main
  const exphbs = createHandlebars({
    extname: '.hbs',
    defaultLayout: 'main',
  });

  // Registrando el helper de Vite
  registerViteHelper(exphbs.handlebars);

  // Registrando Handlebars en Express
  // 1. Registro el engine
  app.engine('hbs', exphbs.engine);

  // 2. Registro el engine de vistas
  app.set('view engine', 'hbs');

  // 3. Estableciendo la ubicación de las vistas
  app.set('views', path.join(__dirname, '../views'));
}