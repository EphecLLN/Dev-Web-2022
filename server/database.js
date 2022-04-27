const mysql = require("mysql");

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : '',
  password : '',
  database : 'site-hero'
});

connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
});

module.exports.connection = connection;
