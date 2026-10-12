import express from 'express';

const router = express.Router();

let counter = 0;
const numbers = []
  

/* GET home page. */
router.get('/', function (req, res ) {
  counter++;
  numbers.push(counter);

  res.render('index', {
    title: 'YOSELIN MORALES',
    counter,
    numbers
  });
});

export default router;