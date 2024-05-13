// services/subjectService.js
const Subject = require('../model/Subject');
const amqp = require('amqplib/callback_api');

// Publishes an event when a new subject is added
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

// Subject Service Methods
const SubjectService = {
    getAllSubjects: (req, res) => {
        Subject.getAll((err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || 'Some error occurred while retrieving subjects.'
                });
            } else {
                res.send(data);
            }
        });
    },

    getSubjectById: (req, res) => {
        Subject.getById(req.params.id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || `Error retrieving subject with id ${req.params.id}`
                });
            } else {
                res.send(data);
            }
        });
    },

    addSubject: (req, res) => {
        const subject = req.body;
        Subject.add(subject, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || 'Some error occurred while adding the subject.'
                });
            } else {
                // Publish the event
                publishEvent('subject_added', data);
                res.send(data);
            }
        });
    },

    editSubject: (req, res) => {
        const subject = req.body;
        Subject.edit(req.params.id, subject, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || `Error updating subject with id ${req.params.id}`
                });
            } else {
                // Publish the event
                publishEvent('subject_updated', data);
                res.send(data);
            }
        });
    },

    removeSubject: (req, res) => {
        Subject.remove(req.params.id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || `Error deleting subject with id ${req.params.id}`
                });
            } else {
                // Publish the event
                publishEvent('subject_deleted', { id: req.params.id });
                res.send({ message: 'Subject deleted successfully!' });
            }
        });
    }
};

module.exports = SubjectService;
