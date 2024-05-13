
const express = require('express');
const bodyParser = require('body-parser');
const classroomRoutes = require('./route/classroomEventRoute');

const app = express();

app.use(bodyParser.json());
app.use('/classrooms', classroomRoutes);

const port = 5001;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
