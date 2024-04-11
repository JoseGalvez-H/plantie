var express = require('express');
var router = express.Router();
var plantsCtrl = require('../controllers/plants');
var commentsCtrl = require('../controllers/comments');
var ensureLoggedIn = require('../config/ensureLoggedIn'); 


router.get('/', ensureLoggedIn, plantsCtrl.index); 
router.get('/new', ensureLoggedIn, plantsCtrl.newPlantForm); 
router.post('/add', ensureLoggedIn, plantsCtrl.create); 
router.get('/:id', ensureLoggedIn, plantsCtrl.showDetails); 
router.delete('/:id', ensureLoggedIn, plantsCtrl.deletePlant); 
router.post('/:id/comments', ensureLoggedIn, commentsCtrl.create); 
router.post('/:id/water', ensureLoggedIn, plantsCtrl.lastWatered);
router.put('/:id/water', ensureLoggedIn, plantsCtrl.lastWatered);

module.exports = router;
