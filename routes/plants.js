var express = require('express');
var router = express.Router();
var plantsCtrl = require('../controllers/plants');


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', plantsCtrl.index);

module.exports = router;
