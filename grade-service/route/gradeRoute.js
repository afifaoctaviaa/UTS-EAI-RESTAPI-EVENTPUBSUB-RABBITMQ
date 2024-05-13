
const express = require('express');
const router = express.Router();
const gradeController = require('../controller/gradeController');

router.get('/', gradeController.getAllGrade);
router.get('/:id', gradeController.getDataById);
router.get('/student/:id', gradeController.getAllDataByStudentId);
router.post('/', gradeController.addData);
router.put('/:id', gradeController.editData);
router.delete('/:id', gradeController.removeData);

module.exports = router;
