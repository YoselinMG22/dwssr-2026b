import express from 'express'

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, _next) => {
  res.send('<h1 style="color:pink"> lista de usuarios amigos🌟</h1>');
});

//module.exports = router;
export default router;