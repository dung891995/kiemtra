const UserModel = require("../models/userModel");
var jwt = require("jsonwebtoken");

module.exports = {
  userSignUp(req, res, next) {
    UserModel.create(req.body)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {});
  },
  userLogin(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    UserModel.findOne({ email: email, password: password })
      .then((result) => {
        if (result) {
          var token = jwt.sign({ id: result._id }, "dung891995", {
            expiresIn: "1d",
          });
          res.cookie("token", token, { maxAge: 1000 * 3600 * 12 });
          res.json("login thanh cong");
        }
        return res.json("sai tk or mk");
      })
      .catch((err) => {});
  },
};
