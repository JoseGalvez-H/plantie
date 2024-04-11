var express = require('express');
var router = express.Router();
var plantsCtrl = require('../controllers/plants');
var commentsCtrl = require('../controllers/comments');

router.get('/', plantsCtrl.index);
router.get('/new', plantsCtrl.newPlantForm);
router.post('/add', plantsCtrl.create);
router.get('/:id', plantsCtrl.showDetails);
router.delete('/:id', plantsCtrl.deletePlant);
router.post('/:id/comments', commentsCtrl.create);
router.post('/:id/water', plantsCtrl.lastWatered);
router.put('/:id/water', plantsCtrl.lastWatered);




module.exports = router;
