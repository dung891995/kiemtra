var mongoose = require('../config/dbConnect');

const userSchema = new mongoose.Schema({
    name: String,
    email:String,
    age:Number,
    password:String,
    role:{
        type:String,
        default:'user'
    }
  },{
      collection:'user'
  });

  const UserModel = mongoose.model('user', userSchema);
  module.exports=UserModel