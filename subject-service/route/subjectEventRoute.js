
const express = require('express');
const router = express.Router();
const subjectController = require('../controller/subjectEventController');

router.get('/', subjectController.getAllSubjects);
router.get('/:id', subjectController.getSubjectById);
router.post('/', subjectController.addSubject);
router.put('/:id', subjectController.editSubject);
router.delete('/:id', subjectController.removeSubject);

module.exports = router;
