import express from 'express'

const router = express.Router();

let counter = 0;
const numbers = [];

/* GET home page. */
router.get('/', function(req, res, _next) {
  counter++;
  numbers.push(counter);

  res.render('index', {
    title: 'MORALES GUADARRAMA YOSELIN',
    counter,
    numbers
  });
});

export default router;