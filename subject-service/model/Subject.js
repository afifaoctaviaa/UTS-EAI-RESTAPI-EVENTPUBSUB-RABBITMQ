
const connection = require('../config/db');

const Subject = {};
Subject.getAll = (result) => {
    connection.query('SELECT * FROM subjects', (err, rows) => {
        if (err) throw err;
        result(null, rows);
    });
};

Subject.getById = (id, result) => {
    connection.query('SELECT * FROM subjects WHERE id = ?', [id], (err, rows) => {
        if (err) throw err;
        result(null, rows);
    });
};

Subject.add = (subject, result) => {
    connection.query('INSERT INTO subjects SET ?', subject, (err, res) => {
        if (err) throw err;
        result(null, { id: res.insertId, ...subject });
    });
};

Subject.edit = (id, subject, result) => {
    connection.query('UPDATE subjects SET ? WHERE id = ?', [subject, id], (err, res) => {
        if (err) throw err;
        result(null, { id: id, ...subject });
    });
};

Subject.remove = (id, result) => {
    connection.query('DELETE FROM subjects WHERE id = ?', [id], (err, res) => {
        if (err) throw err;
        result(null, res.affectedRows);
    });
};

module.exports = Subject;
