// controllers/studentController.js
const Student = require('../model/Student');

exports.getAllDataStudent = (req, res) => {
    Student.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving students.'
            });
        } else {
            res.send(data);
        }
    });
};

exports.getAllDataByClassroomId = (req, res) => {
    Student.getAllByClassroomId(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || `Error retrieving students with classroom id ${req.params.id}`
            });
        } else {
            res.send(data);
        }
    });
};

exports.getDataById = (req, res) => {
    Student.getById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || `Error retrieving student with id ${req.params.id}`
            });
        } else {
            res.send(data);
        }
    });
};

exports.addData = (req, res) => {
    const student = req.body;
    Student.add(student, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred while adding the student.'
            });
        } else {
            res.send(data);
        }
    });
};

exports.editData = (req, res) => {
    const student = req.body;
    Student.edit(req.params.id, student, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || `Error updating student with id ${req.params.id}`
            });
        } else {
            res.send(data);
        }
    });
};

exports.removeData = (req, res) => {
    Student.remove(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || `Error deleting student with id ${req.params.id}`
            });
        } else {
            res.send({ message: 'Student deleted successfully!' });
        }
    });
};
