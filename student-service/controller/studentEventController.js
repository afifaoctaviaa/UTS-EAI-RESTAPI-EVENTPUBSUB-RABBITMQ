
const Student = require('../model/Student');
const StudentService = require('../service/studentService');

exports.getAllStudents = (req, res) => {
    StudentService.getAllStudents(req, res);
};

exports.getStudentById = (req, res) => {
    StudentService.getStudentById(req, res);
};

exports.addStudent = (req, res) => {
    StudentService.addStudent(req, res);
};

exports.editStudent = (req, res) => {
    StudentService.editStudent(req, res);
};

exports.removeStudent = (req, res) => {
    StudentService.removeStudent(req, res);
};
