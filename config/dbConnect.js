// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ktra', {useNewUrlParser: true,useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('ket noi db thanh cong');
});

module.exports=mongoose