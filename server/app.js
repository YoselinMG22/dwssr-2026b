
// FUNCIÓN PARA MANEJAR ERRORES
import createError from 'http-errors';

// IMPORTA EL FRAMEWORK EXPRESS
import express from 'express';

// IMPORTA MÓDULOS PARA MANEJAR RUTAS
import path, { dirname } from 'node:path';

// ES PARA LAS COOKIES
import cookieParser from 'cookie-parser';

// REGISTRA TODO LO QUE OCURRE EN EL SERVIDOR
import morgan from 'morgan';

// IMPORTA MÓDULOS PARA CREAR __DIRNAME
import { fileURLToPath } from 'node:url';

// IMPORTA DEBUG
import createDebug from 'debug';

// SE IMPORTAN LAS RUTAS DE LA APLICACIÓN
import router from './routes/index.js';
import usersRouter from './routes/users.js';

// IMPORTA WINSTON
import logger from './lib/winston.js';

// IMPORTA LA CONFIGURACIÓN DE HANDLEBARS
import configureHandlebars from './lib/handlebars.js';

// CREACIÓN DEL DEBUG
const debug = createDebug('dwssr-2026b:server');

// CREANDO VARIABLES
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// CREAR LA APLICACIÓN EXPRESS
logger.info('Creando backend');
const app = express();

// CONFIGURAR EL MOTOR DE VISTAS CON HBS
configureHandlebars(app);

// CONFIGURAR LOS MIDDLEWARES
app.use(
  morgan('dev', {
    stream: {
      write: (msg) => logger.info(msg.trim()),
    },
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ARCHIVOS ESTÁTICOS
debug('Configurando carpeta de archivos estáticos');

// ARCHIVOS COMPILADOS POR VITE
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'dist')));
}

// ARCHIVOS ESTÁTICOS PÚBLICOS
app.use(express.static(path.join(__dirname, '..', 'public')));

// REGISTRANDO RUTAS
debug('Registrando rutas');

app.use('/', router);
app.use('/users', usersRouter);

// CATCH 404 AND FORWARD TO ERROR HANDLER
app.use((req, res, next) => {
  next(createError(404));
});

// ERROR HANDLER
app.use((err, req, res, _next) => {
  // SET LOCALS, ONLY PROVIDING MESSAGE IN DEVELOPMENT
  logger.error(err.stack || err.message);

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // RENDER THE ERROR PAGE
  res.status(err.status || 500);
  res.render('error');
});

// EJEMPLO DE CÓDIGO INALCANZABLE
// (() => {
// let age = 10;
// return age;
// if (age === 10) {
// console.log('codigo');
// }
// })();

// EXPORTAR APLICACIÓN
export default app;
