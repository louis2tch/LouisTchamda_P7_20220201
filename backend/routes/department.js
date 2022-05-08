const express = require('express');
const router = express.Router();

const departmentCtrl = require('../controllers/department');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', multer, departmentCtrl.createDepartment);
router.put('/:id', auth, multer, departmentCtrl.modifyDepartment);
router.delete('/:id', auth, departmentCtrl.deleteDepartment);
router.get('/:id', auth, departmentCtrl.getoneDepartment);
router.get('/', auth, departmentCtrl.getDepartment);


module.exports = router; 
