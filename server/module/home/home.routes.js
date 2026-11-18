
import express from 'express';

// Importo la acción que quiero ejecutar
import renderHome from './home.controller.js';

// Creando un enrutador de Express
const homeRouter = express.Router();

// Encontrando la acción (método) del controlador home 
//el get responde a la raiz /
homeRouter.get('/', renderHome);

export default homeRouter;
