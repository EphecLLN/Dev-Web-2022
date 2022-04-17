const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const morgan = require('morgan');
var mysql = require('mysql2');

 var connection = mysql.createConnection({
     host     : 'localhost',
     user     : 'wassim',
     password : 'wassim',
     database : "sys"
   });

connection.connect();


const app = express();

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('common'))

const port = process.env.port || 80;

app.listen(port,() => console.log(`server started on port ${port}`));

app.post("/client",(req,res) => {

    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const date_naissance = req.body.date_naissance
    const pays = req.body.pays
    const ville = req.body.ville
    const code_postal = req.body.code_postal
    const password = req.body.password
    console.log(firstname,lastname,email,date_naissance,pays,ville,code_postal,password)
    var sql = "INSERT into users(firstname,lastname,email,date_naissance,pays,ville,code_postal,password)values (?,?,?,?,?,?,?,?)"
    var values=[firstname,lastname,email,date_naissance,pays,ville,code_postal,password]
    try{
    connection.query(sql,values);
 

}
    catch(err){
        console.log(err);
    }

    
    res.status(201)
    res.send( "test" );

})

app.post("/tools",(req,res) => {
    const tool_name = req.body.tool_name
    const tool_category = req.body.tool_category
    const price_rental_day = req.body.price_rental_day
    const libre = req.body.libre
    const rentor = req.body.rentor
    console.log(tool_name,tool_category,price_rental_day,libre,rentor)
    var sql = "INSERT into tools(tool_name,tool_category,price_rental_day,libre,rentor)values (?,?,?,?,?)"
    var values=[tool_name,tool_category,price_rental_day,libre,rentor]
    try{
    connection.query(sql,values);
 
}
    catch(err){
        console.log(err);
    }
    
    res.status(201)
    res.send( "test" );

})

app.post("/renting",(req,res) => {
    const tool = req.body.tool
    const rent_start = req.body.rent_start
    const rent_finish = req.body.rent_finish
    const price_rental = req.body.price_rental
    console.log(tool,rent_start,rent_finish,price_rental)
    var sql = "INSERT into rental(tool,rent_start,rent_finish,price_rental)values (?,?,?,?)"
    var values=[tool,rent_start,rent_finish,price_rental]
    try{
    connection.query(sql,values);
 
}
    catch(err){
        console.log(err);
    }
    
    res.status(201)
    res.send( "test" );

})

app.get("/",(req,res) => {

    res.send( "test" );


})