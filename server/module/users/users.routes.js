
import express from 'express';

// Importo la acción que quiero ejecutar
import getUsers from './users.controller.js';

// Creando un enrutador de Express
const userRouter = express.Router();

// Encontrando la acción del controlador users
userRouter.get('/', getUsers);

export default userRouter;
