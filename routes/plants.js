var express = require('express');
var router = express.Router();
var plantsCtrl = require('../controllers/plants');

router.get('/', plantsCtrl.index);
router.get('/new', plantsCtrl.newPlantForm);
router.post('/add', plantsCtrl.create);
router.get('/:id', plantsCtrl.showDetails);

module.exports = router;
