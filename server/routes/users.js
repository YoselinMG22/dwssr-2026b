import express from 'express';

const usersRouter = express.Router();

/* GET users listing. */
usersRouter.get('/', (req, res, _next) => {
  res.send('<h1 style="color:pink"> lista de usuarios amigos🌟</h1>');
});

export default usersRouter;