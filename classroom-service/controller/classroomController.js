// controllers/classroomController.js
const Classroom = require('../model/Classroom');

exports.getAllClassroom = (req, res) => {
    Classroom.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving classrooms.'
            });
        } else {
            res.send(data);
        }
    });
};

exports.getDataById = (req, res) => {
    Classroom.getById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || `Error retrieving classroom with id ${req.params.id}`
            });
        } else {
            res.send(data);
        }
    });
};

exports.addData = (req, res) => {
    const classroom = req.body;
    Classroom.add(classroom, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred while adding the classroom.'
            });
        } else {
            res.send(data);
        }
    });
};

exports.editData = (req, res) => {
    const classroom = req.body;
    Classroom.edit(req.params.id, classroom, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || `Error updating classroom with id ${req.params.id}`
            });
        } else {
            res.send(data);
        }
    });
};

exports.removeData = (req, res) => {
    Classroom.remove(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || `Error deleting classroom with id ${req.params.id}`
            });
        } else {
            res.send({ message: 'classroom deleted successfully!' });
        }
    });
};