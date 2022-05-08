const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/', auth, multer, userCtrl.getUser);
router.get('/:id', auth, multer, userCtrl.getoneUser);
router.put('/:id', auth, multer, userCtrl.modifyUser);

module.exports = router;