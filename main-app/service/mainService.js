// services/mainService.js
const studentService = require('./studentService');
const classroomService = require('./classroomService');
const subjectService = require('./subjectService');
const gradeService = require('./gradeService');

const MainService = {
    getAllStudentsByClassroom: (classroomId, callback) => {
        studentService.getAllStudentsByClassroom(classroomId, callback);
    },

    getDetailStudent: (studentId, callback) => {
        let studentData = {};

        studentService.getStudentById(studentId, (err, student) => {
            if (err) {
                callback(err, null);
                return;
            }

            studentData.student = student;

            classroomService.getClassroomById(student.classroomId, (err, classroom) => {
                if (err) {
                    callback(err, null);
                    return;
                }

                studentData.classroom = classroom;

                gradeService.getAllGradesByStudentId(studentId, (err, grades) => {
                    if (err) {
                        callback(err, null);
                        return;
                    }

                    studentData.grades = grades;

                    let subjectIds = grades.map(grade => grade.subjectId);

                    subjectService.getSubjectsByIds(subjectIds, (err, subjects) => {
                        if (err) {
                            callback(err, null);
                            return;
                        }

                        studentData.subjects = subjects;

                        callback(null, studentData);
                    });
                });
            });
        });
    }
};

module.exports = MainService;
