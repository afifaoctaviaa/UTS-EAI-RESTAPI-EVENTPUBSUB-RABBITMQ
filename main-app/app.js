
const express = require('express');
const bodyParser = require('body-parser');
const mainRoutes = require('./route/mainRoute');

const app = express();

app.use(bodyParser.json());
app.use('/main', mainRoutes);

const port = 5004;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
