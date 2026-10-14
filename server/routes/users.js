import express from 'express'
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('<h1 style="color:pink"> lista de usuarios amigos🌟</h1>');
});

//module.exports = router;
export default router;