
const express = require('express');
const bodyParser = require('body-parser');
const subjectRoutes = require('./route/subjectEventRoute');

const app = express();

app.use(bodyParser.json());
app.use('/subjects', subjectRoutes);

const port = 5002;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
