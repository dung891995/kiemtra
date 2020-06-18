var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var UserModel =require('../Models/userModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', function (req, res, next) {
  UserModel.create(req.body).then((result) => {
    res.json(result)
  }).catch((err) => {

  });
})

router.post('/login', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  UserModel.findOne({ email: email, password: password }).then((result) => {
    if (result) {
      var token = jwt.sign({ id: result._id }, 'dung891995', { expiresIn: '1d' });
      res.cookie('token', token, { maxAge: 1000 * 3600 * 12 });
      res.json('login thanh cong')
    }
    return res.json('sai tk or mk')
  }).catch((err) => {

  });
})


module.exports = router;
