const { DB_USER, DB_PASSWORD } = require("mysql");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : DB_USER,
  password : DB_PASSWORD,
  database : 'site-hero'
});

connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
});

module.exports.connection = connection;
