
const Classroom = require('../model/Classroom');
const amqp = require('amqplib/callback_api');

// Publishes an event when a new classroom is added
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

// Classroom Service Methods
const ClassroomService = {
    getAllClassrooms: (req, res) => {
        Classroom.getAll((err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || 'Some error occurred while retrieving classrooms.'
                });
            } else {
                res.send(data);
            }
        });
    },

    getClassroomById: (req, res) => {
        Classroom.getById(req.params.id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || `Error retrieving classroom with id ${req.params.id}`
                });
            } else {
                res.send(data);
            }
        });
    },

    addClassroom: (req, res) => {
        const classroom = req.body;
        Classroom.add(classroom, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || 'Some error occurred while adding the classroom.'
                });
            } else {
                // Publish the event
                publishEvent('classroom_added', data);
                res.send(data);
            }
        });
    },

    editClassroom: (req, res) => {
        const classroom = req.body;
        Classroom.edit(req.params.id, classroom, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || `Error updating classroom with id ${req.params.id}`
                });
            } else {
                // Publish the event
                publishEvent('classroom_updated', data);
                res.send(data);
            }
        });
    },

    removeClassroom: (req, res) => {
        Classroom.remove(req.params.id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || `Error deleting classroom with id ${req.params.id}`
                });
            } else {
                // Publish the event
                publishEvent('classroom_deleted', { id: req.params.id });
                res.send({ message: 'Classroom deleted successfully!' });
            }
        });
    }
};

module.exports = ClassroomService;
