// services/studentService.js
const Student = require('../model/Student');
const amqp = require('amqplib/callback_api');

// Publishes an event when a new student is added
const publishEvent = (eventName, eventData) => {
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            var exchange = 'events';

            channel.assertExchange(exchange, 'fanout', {
                durable: false
            });

            channel.publish(exchange, '', Buffer.from(JSON.stringify({ event: eventName, data: eventData })));
            console.log(" [x] Sent %s: '%s'", eventName, JSON.stringify(eventData));
        });

        setTimeout(function () {
            connection.close();
        }, 500);
    });
};

// Student Service Methods
const StudentService = {
    getAllStudents: (req, res) => {
        Student.getAll((err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || 'Some error occurred while retrieving students.'
                });
            } else {
                res.send(data);
            }
        });
    },

    getStudentById: (req, res) => {
        Student.getById(req.params.id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || `Error retrieving student with id ${req.params.id}`
                });
            } else {
                res.send(data);
            }
        });
    },

    addStudent: (req, res) => {
        const student = req.body;
        Student.add(student, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || 'Some error occurred while adding the student.'
                });
            } else {
                // Publish the event
                publishEvent('student_added', data);
                res.send(data);
            }
        });
    },

    editStudent: (req, res) => {
        const student = req.body;
        Student.edit(req.params.id, student, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || `Error updating student with id ${req.params.id}`
                });
            } else {
                // Publish the event
                publishEvent('student_updated', data);
                res.send(data);
            }
        });
    },

    removeStudent: (req, res) => {
        Student.remove(req.params.id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || `Error deleting student with id ${req.params.id}`
                });
            } else {
                // Publish the event
                publishEvent('student_deleted', { id: req.params.id });
                res.send({ message: 'Student deleted successfully!' });
            }
        });
    }
};

module.exports = StudentService;
