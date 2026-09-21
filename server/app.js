// FUNCION PAR MANEJAR ERRORES 
//✖️var createError = require('http-errors');
import creteError from 'http-errors'
//IMPORTAA EL FRAMEWOR EXPRESS
//✖️var express = require('express');
import express from 'express'
//IMPORTA MODULOS PARA MANEJAAR RUTAS
//✖️var path = require('path');
import path from 'node:path'
//ES PRA LAS COOKIES
//✖️var cookieParser = require('cookie-parser');
import cookieParser from 'cookie-parser'
//REGISTRAAA TODO LO QUE OCURRE EN EL SERVIDOR 
//✖️var logger = require('morgan');
import logger from 'morgan'
//SE IMPORTAAN LAS RUTAS DE LA APLICACION 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
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

module.exports = app;
