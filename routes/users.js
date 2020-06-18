var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.put('/:id', function (req, res, next) {
  var token = req.cookies.token;
  if (token) {
    var jwtDecode = jwt.verify(token, 'dung891995');
    console.log(jwtDecode);
    if (jwtDecode && jwtDecode.role == 'admin') {
      return res.next();
    }
    return res.json('ban ko phai admin')
  }
  return res.json('ban chua dang nhap')

}, function (req, res, next) {
  var id = req.params.id;
  var data = req.body
  var userInfor = {}
  if (data.name) {
    userInfor.name = req.body.name
  }
  if (data.email) {
    userInfor.email = req.body.email
  }
  if (data.password) {
    userInfor.password = req.body.password
  }
  if (data.age) {
    userInfor.age = req.body.age
  }
  if (data.role) {
    userInfor.role = req.body.role
  }
  UserModel.updateOne({ _id: id }, userInfor).then((result) => {
    res.json(result)
  }).catch((err) => {

  });
})

router.delete('/:id', function (req, res, next) {
  var token = req.cookies.token;
  if (token) {
    var jwtDecode = jwt.verify(token, 'dung891995');
    console.log(jwtDecode);
    if (jwtDecode && jwtDecode.role == 'admin') {
      return res.next();
    }
    return res.json('ban ko phai admin')
  }
  return res.json('ban chua dang nhap')
}, function (req, res, next) {
  var id = req.params.id;
  UserModel.deleteOne({ _id: id }).then((result) => {
    console.log(result);
  }).catch((err) => {

  });
})


module.exports = router;
