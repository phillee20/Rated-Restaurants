const express = require('express');
const app = express();

app.get('/api', (request, response) => {
    response.status(200).send({msg: "all good here"});
})

app.get('/*',(request, response) => {
    response.status(404).send({msg: "error"});
})

module.exports = app;