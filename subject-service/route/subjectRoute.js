
const express = require('express');
const router = express.Router();
const subjectController = require('../controller/subjectController');

router.get('/', subjectController.getAllSubject);
router.get('/:id', subjectController.getDataById);
router.post('/', subjectController.addData);
router.put('/:id', subjectController.editData);
router.delete('/:id', subjectController.removeData);

module.exports = router;
