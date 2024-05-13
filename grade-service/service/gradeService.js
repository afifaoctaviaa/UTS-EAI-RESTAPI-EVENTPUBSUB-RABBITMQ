// services/gradeService.js
const Grade = require('../model/Grade');
const amqp = require('amqplib/callback_api');

// Publishes an event when a new grade is added
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

// Grade Service Methods
const GradeService = {
    getAllGrades: (req, res) => {
        Grade.getAll((err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || 'Some error occurred while retrieving grades.'
                });
            } else {
                res.send(data);
            }
        });
    },

    getGradeById: (req, res) => {
        Grade.getById(req.params.id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || `Error retrieving grade with id ${req.params.id}`
                });
            } else {
                res.send(data);
            }
        });
    },

    addGrade: (req, res) => {
        const grade = req.body;
        Grade.add(grade, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || 'Some error occurred while adding the grade.'
                });
            } else {
                // Publish the event
                publishEvent('grade_added', data);
                res.send(data);
            }
        });
    },

    editGrade: (req, res) => {
        const grade = req.body;
        Grade.edit(req.params.id, grade, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || `Error updating grade with id ${req.params.id}`
                });
            } else {
                // Publish the event
                publishEvent('grade_updated', data);
                res.send(data);
            }
        });
    },

    removeGrade: (req, res) => {
        Grade.remove(req.params.id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || `Error deleting grade with id ${req.params.id}`
                });
            } else {
                // Publish the event
                publishEvent('grade_deleted', { id: req.params.id });
                res.send({ message: 'Grade deleted successfully!' });
            }
        });
    }
};

module.exports = GradeService;
