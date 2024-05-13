
const axios = require('axios');
const { json } = require('body-parser');

exports.getAllStudentsByClassroom = async (req, res) => {
    try {
        const { classroomId } = req.params;

        const classroomResponse = await axios.get(`http://localhost:5001/classrooms/${classroomId}`)
        const studentResponse = await axios.get(`http://localhost:5000/students/classroom/${classroomId}`);
        const response = {
            classroom:classroomResponse.data[0],
            students:studentResponse.data
        }
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDetailStudent = async (req, res) => {
    try {
        const { studentId } = req.params;

        const studentResponse = await axios.get(`http://localhost:5000/students/${studentId}`);
    
        const classroomResponse = await axios.get(`http://localhost:5001/classrooms/${studentResponse.data[0]['classroom_id']}`);

        const gradeResponse = await axios.get(`http://localhost:5003/grades/student/${studentId}`);
        const gradeData = gradeResponse.data;
  
        const subjectData = [];
        for (const grade of gradeData) {
            const subjectResponse = await axios.get(`http://localhost:5002/subjects/${grade["subject_id"]}`);
            subjectResponse.data[0]["grade"] = grade["grade"];
            subjectData.push(subjectResponse.data[0]);
        }

        const studentDetails = {
            student: studentResponse.data[0],
            class: classroomResponse.data,
            subjects: subjectData
        };
        res.json(studentDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
