const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
var mysql = require('mysql2');

 var connection = mysql.createConnection({
     host     : 'localhost',
     user     : 'wassim',
     password : 'wassim',
     database : "gyt"
   });

connection.connect();

const app = express();

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('common'))
const port = process.env.port || 3000;

app.listen(port,() => console.log(`server started on port ${port}`));

app.post("/newclient",(req,res) => {
    const nom = req.body.nom
    const prénom = req.body.prénom
    console.log(nom,prénom)
    try{
    console.log(connection.promise().query("SELECT * from users"));
res.status(201)    
}
    catch(err){
        console.log(err);
    }

})