const express = require('express');
const router = express.Router();

const chatCtrl = require('../controllers/chat');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, chatCtrl.createChat);
router.put('/:id', auth, multer, chatCtrl.modifyChat);
router.delete('/:id', auth, chatCtrl.deleteChat);
router.get('/:id', auth, chatCtrl.getoneChat);
router.get('/',  auth, chatCtrl.getChat);
router.post('/:id/like', auth, chatCtrl.generateLike);
router.post('/:id/dislike', auth, chatCtrl.generateDisLike);
router.post('/images',  chatCtrl.insertImages);

module.exports = router;
