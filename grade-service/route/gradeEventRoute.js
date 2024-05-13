
const express = require('express');
const router = express.Router();
const gradeController = require('../controller/gradeEventController');

router.get('/', gradeController.getAllGrades);
router.get('/:id', gradeController.getGradeById);
router.post('/', gradeController.addGrade);
router.put('/:id', gradeController.editGrade);
router.delete('/:id', gradeController.removeGrade);

module.exports = router;
