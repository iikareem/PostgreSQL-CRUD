const express = require('express');
const studentRoute = require('./routes/router');
const port = 3000;

const app = express();


app.use(express.json());

app.use('/api/v1/student',studentRoute);

app.listen(port, ()=>{
    console.log(`Listen on port ${port}`);
});