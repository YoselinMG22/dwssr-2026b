import express from 'express'
const router = express.Router();

let counter = 0;
const numbers= []
/* GET home page. */
router.get('/', function(req, res, _next) {
  res.render('index', { title: 'Express' });
  counter++;
  numbers.push(counter);
  res.render('index', { title: 'MORLES GUDARRAMA YOSELIN', 
    counter,
    numbers
  });
  

});

//
export default router;