var express = require('express');
var router = express.Router();
const {userSignUp,userLogin} =require('../controllers/index');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', userSignUp);

router.post('/login', userLogin);


module.exports = router;
