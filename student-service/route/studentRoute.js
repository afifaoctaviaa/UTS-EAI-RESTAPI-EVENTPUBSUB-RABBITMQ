
const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');

router.get('/', studentController.getAllDataStudent);
router.get('/:id', studentController.getDataById);
router.get('/classroom/:id', studentController.getAllDataByClassroomId);
router.post('/', studentController.addData);
router.put('/:id', studentController.editData);
router.delete('/:id', studentController.removeData);

module.exports = router;
