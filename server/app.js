// FUNCION PAR MANEJAR ERRORES 
import creteError from 'http-errors'
//IMPORTAA EL FRAMEWOR EXPRESS
import express from 'express'
//IMPORTA MODULOS PARA MANEJAAR RUTAS
import path from 'node:path'
//ES PRA LAS COOKIES
import cookieParser from 'cookie-parser'
//REGISTRAAA TODO LO QUE OCURRE EN EL SERVIDOR 
import logger from 'morgan'
//IMPORTS PARAA CREAR PP DIRNAAME
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
//creando variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
//SE IMPORTAAN LAS RUTAS DE LA APLICACION 
import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'
// CREA LA APLICACION EXPRESS
var app = express();

// CONFIGURI EXPRESS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//CONFIGURA LOS MIDLEWAVES
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..','public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//module.exports = app;
export default app;
