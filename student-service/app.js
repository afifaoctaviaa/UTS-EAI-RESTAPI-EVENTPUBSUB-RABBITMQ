
const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require('./route/studentEventRoute');

const app = express();

app.use(bodyParser.json());
app.use('/students', studentRoutes);

const port = 5000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
