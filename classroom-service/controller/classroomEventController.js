
const Classroom = require('../model/Classroom');
const ClassroomService = require('../service/classroomService');

exports.getAllClassrooms = (req, res) => {
    ClassroomService.getAllClassrooms(req, res);
};

exports.getClassroomById = (req, res) => {
    ClassroomService.getClassroomById(req, res);
};

exports.addClassroom = (req, res) => {
    ClassroomService.addClassroom(req, res);
};

exports.editClassroom = (req, res) => {
    ClassroomService.editClassroom(req, res);
};

exports.removeClassroom = (req, res) => {
    ClassroomService.removeClassroom(req, res);
};
