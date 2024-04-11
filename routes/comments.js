const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comments');

router.post('/', commentCtrl.create);
router.get('/:id', commentCtrl.getOne);
router.put('/:id', commentCtrl.update);
router.delete('/:id', commentCtrl.delete);
router.post('/:id/comments', commentCtrl.create);

module.exports = router;
