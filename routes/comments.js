const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.post('/', commentCtrl.create);
router.put('/:id', commentCtrl.update);
router.delete('/:id', commentCtrl.delete);
router.post('/:id/comments', commentCtrl.create);
router.post('/plants/:id/comments', ensureLoggedIn, commentCtrl.create);


module.exports = router;
