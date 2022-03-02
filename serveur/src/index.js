const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan')

const app = express();

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('common'))
const port = process.env.port || 8080;

app.listen(port,() => console.log(`server started on port ${port}`));

app.get("/test",(req,res) => {
    res.send({
        message:'test'
    })
})

app.get("/",(req,res) => {
    res.send({
        message:'test2'
    })
})