var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var UserModel = require('./Models/userModel')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/signup', function (req, res, next) {
  UserModel.create(req.body).then((result) => {
    res.json(result)
  }).catch((err) => {

  });
})

app.post('/login', function (req, res, next) {
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

app.put('/user/:id', function (req, res, next) {
  var token = req.cookies.token;
  if (token) {
    var jwtDecode = jwt.verify(token, 'dung891995');
    console.log(jwtDecode);
    if (jwtDecode.length >= 1 && jwtDecode.role == 'admin') {
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

app.delete('/user/:id', function (req, res, next) {
  var token = req.cookies.token;
  if (token) {
    var jwtDecode = jwt.verify(token, 'dung891995');
    console.log(jwtDecode);
    if (jwtDecode.length >= 1 && jwtDecode.role == 'admin') {
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

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
