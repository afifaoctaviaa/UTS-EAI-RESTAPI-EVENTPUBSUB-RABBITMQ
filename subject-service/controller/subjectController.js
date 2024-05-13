
const Subject = require('../model/Subject');

exports.getAllSubject = (req, res) => {
    Subject.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving subjects.'
            });
        } else {
            res.send(data);
        }
    });
};


exports.getDataById = (req, res) => {
    Subject.getById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || `Error retrieving subject with id ${req.params.id}`
            });
        } else {
            res.send(data);
        }
    });
};

exports.addData = (req, res) => {
    const subject = req.body;
    Subject.add(subject, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred while adding the subject.'
            });
        } else {
            res.send(data);
        }
    });
};

exports.editData = (req, res) => {
    const subject = req.body;
    Subject.edit(req.params.id, subject, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || `Error updating subject with id ${req.params.id}`
            });
        } else {
            res.send(data);
        }
    });
};

exports.removeData = (req, res) => {
    Subject.remove(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || `Error deleting subject with id ${req.params.id}`
            });
        } else {
            res.send({ message: 'subject deleted successfully!' });
        }
    });
};