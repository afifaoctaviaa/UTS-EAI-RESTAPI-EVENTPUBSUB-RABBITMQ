// models/Student.js
const connection = require('../config/db');

const Student = {};

Student.getAll = (result) => {
    connection.query('SELECT * FROM students', (err, rows) => {
        if (err) throw err;
        result(null, rows);
    });
};

Student.getAllByClassroomId = (id, result) => {
    connection.query('SELECT * FROM students WHERE classroom_id = ?', [id], (err, rows) => {
        if (err) throw err;
        result(null, rows);
    });
};

Student.getById = (id, result) => {
    connection.query('SELECT * FROM students WHERE id = ?', [id], (err, rows) => {
        if (err) throw err;
        result(null, rows);
    });
};

Student.add = (student, result) => {
    connection.query('INSERT INTO students SET ?', student, (err, res) => {
        if (err) throw err;
        result(null, { id: res.insertId, ...student });
    });
};

Student.edit = (id, student, result) => {
    connection.query('UPDATE students SET ? WHERE id = ?', [student, id], (err, res) => {
        if (err) throw err;
        result(null, { id: id, ...student });
    });
};

Student.remove = (id, result) => {
    connection.query('DELETE FROM students WHERE id = ?', [id], (err, res) => {
        if (err) throw err;
        result(null, res.affectedRows);
    });
};

module.exports = Student;
