
const express = require('express');
const bodyParser = require('body-parser');
const gradeRoutes = require('./route/gradeEventRoute');

const app = express();

app.use(bodyParser.json());
app.use('/grades', gradeRoutes);

const port = 5003;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
