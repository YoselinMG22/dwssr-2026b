import express from 'express'
const router = express.Router();

let counter = 0;
const numbers= []
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  counter++;
  numbers.push(counter);
  res.render('index', { title: 'Cruz Torres Ricardo', 
    counter,
    numbers
  });
  

});

//
export default router;