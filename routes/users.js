var express = require('express');
var router = express.Router();
const {authToken} =require('../middleware/user');
const {userUpdate,userDelete} =require('../controllers/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.put('/:id',authToken,userUpdate);
  
router.delete('/:id',authToken,userDelete);


module.exports = router;
