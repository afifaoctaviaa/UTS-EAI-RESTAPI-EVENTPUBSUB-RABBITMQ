
const connection = require('../config/db');

const Grade = {};
Grade.getAll = (result) => {
    connection.query('SELECT * FROM grades', (err, rows) => {
        if (err) throw err;
        result(null, rows);
    });
};

Grade.getAllByStudentId = (id, result) => {
    connection.query('SELECT * FROM grades WHERE student_id = ?', [id], (err, rows) => {
        if (err) throw err;
        result(null, rows);
    });
};

Grade.getById = (id, result) => {
    connection.query('SELECT * FROM grades WHERE id = ?', [id], (err, rows) => {
        if (err) throw err;
        result(null, rows);
    });
};

Grade.add = (grade, result) => {
    connection.query('INSERT INTO grades SET ?', grade, (err, res) => {
        if (err) throw err;
        result(null, { id: res.insertId, ...grade });
    });
};

Grade.edit = (id, grade, result) => {
    connection.query('UPDATE grades SET ? WHERE id = ?', [grade, id], (err, res) => {
        if (err) throw err;
        result(null, { id: id, ...grade });
    });
};

Grade.remove = (id, result) => {
    connection.query('DELETE FROM grades WHERE id = ?', [id], (err, res) => {
        if (err) throw err;
        result(null, res.affectedRows);
    });
};

module.exports = Grade;
