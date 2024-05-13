
const connection = require('../config/db');

const Classroom = {};

Classroom.getAll = (result) => {
    connection.query('SELECT * FROM classrooms', (err, rows) => {
        if (err) throw err;
        result(null, rows);
    });
};

Classroom.getById = (id, result) => {
    connection.query('SELECT * FROM classrooms WHERE id = ?', [id], (err, rows) => {
        if (err) throw err;
        result(null, rows);
    });
};

Classroom.add = (classroom, result) => {
    connection.query('INSERT INTO classrooms SET ?', classroom, (err, res) => {
        if (err) throw err;
        result(null, { id: res.insertId, ...classroom });
    });
};

Classroom.edit = (id, classroom, result) => {
    connection.query('UPDATE classrooms SET ? WHERE id = ?', [classroom, id], (err, res) => {
        if (err) throw err;
        result(null, { id: id, ...classroom });
    });
};

Classroom.remove = (id, result) => {
    connection.query('DELETE FROM classrooms WHERE id = ?', [id], (err, res) => {
        if (err) throw err;
        result(null, res.affectedRows);
    });
};

module.exports = Classroom;
