
const express = require('express');
const router = express.Router();
const mainController = require('../controller/mainController');

router.get('/classrooms/:classroomId/students', mainController.getAllStudentsByClassroom);
router.get('/students/:studentId', mainController.getDetailStudent);

module.exports = router;
