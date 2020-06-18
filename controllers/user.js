const UserModel = require("../models/userModel");
var jwt = require("jsonwebtoken");

module.exports = {
  userUpdate(req, res, next) {
    var id = req.params.id;
    var data = req.body;
    var userInfor = {};
    if (data.name) {
      userInfor.name = req.body.name;
    }
    if (data.email) {
      userInfor.email = req.body.email;
    }
    if (data.password) {
      userInfor.password = req.body.password;
    }
    if (data.age) {
      userInfor.age = req.body.age;
    }
    if (data.role) {
      userInfor.role = req.body.role;
    }
    UserModel.updateOne({ _id: id }, userInfor)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {});
  },
  userDelete(req, res, next) {
    var id = req.params.id;
    UserModel.deleteOne({ _id: id }).then((result) => {
      console.log(result);
    }).catch((err) => {
  
    });
  },
};
