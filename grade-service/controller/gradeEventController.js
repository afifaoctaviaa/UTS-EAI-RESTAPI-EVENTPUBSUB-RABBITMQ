
const Grade = require('../model/Grade');
const GradeService = require('../service/gradeService');

exports.getAllGrades = (req, res) => {
    GradeService.getAllGrades(req, res);
};

exports.getGradeById = (req, res) => {
    GradeService.getGradeById(req, res);
};

exports.addGrade = (req, res) => {
    GradeService.addGrade(req, res);
};

exports.editGrade = (req, res) => {
    GradeService.editGrade(req, res);
};

exports.removeGrade = (req, res) => {
    GradeService.removeGrade(req, res);
};
