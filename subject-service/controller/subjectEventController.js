
const Subject = require('../model/Subject');
const SubjectService = require('../service/subjectService');

exports.getAllSubjects = (req, res) => {
    SubjectService.getAllSubjects(req, res);
};

exports.getSubjectById = (req, res) => {
    SubjectService.getSubjectById(req, res);
};

exports.addSubject = (req, res) => {
    SubjectService.addSubject(req, res);
};

exports.editSubject = (req, res) => {
    SubjectService.editSubject(req, res);
};

exports.removeSubject = (req, res) => {
    SubjectService.removeSubject(req, res);
};
