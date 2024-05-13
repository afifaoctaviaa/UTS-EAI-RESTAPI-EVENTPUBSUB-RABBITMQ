// routes/classroomRoutes.js
const express = require('express');
const router = express.Router();
const classroomController = require('../controller/classroomController');

router.get('/', classroomController.getAllClassroom);
router.get('/:id', classroomController.getDataById);
router.post('/', classroomController.addData);
router.put('/:id', classroomController.editData);
router.delete('/:id', classroomController.removeData);

module.exports = router;
