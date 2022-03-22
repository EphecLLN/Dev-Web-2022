'use strict';


const express = require('express');

const PORT = process.env.PORT || 3333;

const app = express();

app.get('/api', (req, res) => {
    res.json({message: 'hello world'})
});

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
});
