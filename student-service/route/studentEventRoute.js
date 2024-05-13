// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentEventController');

router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.post('/', studentController.addStudent);
router.put('/:id', studentController.editStudent);
router.delete('/:id', studentController.removeStudent);

module.exports = router;
