
const express = require('express');
const router = express.Router();
const classroomController = require('../controller/classroomEventController');

router.get('/', classroomController.getAllClassrooms);
router.get('/:id', classroomController.getClassroomById);
router.post('/', classroomController.addClassroom);
router.put('/:id', classroomController.editClassroom);
router.delete('/:id', classroomController.removeClassroom);

module.exports = router;
