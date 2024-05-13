
const Grade = require('../model/Grade');

exports.getAllGrade = (req, res) => {
    Grade.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving grades.'
            });
        } else {
            res.send(data);
        }
    });
};

exports.getAllDataByStudentId = (req, res) => {
    Grade.getAllByStudentId(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || `Error retrieving grades with student id ${req.params.id}`
            });
        } else {
            res.send(data);
        }
    });
};

exports.getDataById = (req, res) => {
    Grade.getById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || `Error retrieving grade with id ${req.params.id}`
            });
        } else {
            res.send(data);
        }
    });
};

exports.addData = (req, res) => {
    const grade = req.body;
    Grade.add(grade, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred while adding the Grade.'
            });
        } else {
            res.send(data);
        }
    });
};

exports.editData = (req, res) => {
    const grade = req.body;
    Grade.edit(req.params.id, grade, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || `Error updating grade with id ${req.params.id}`
            });
        } else {
            res.send(data);
        }
    });
};

exports.removeData = (req, res) => {
    Grade.remove(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || `Error deleting grade with id ${req.params.id}`
            });
        } else {
            res.send({ message: 'grade deleted successfully!' });
        }
    });
};