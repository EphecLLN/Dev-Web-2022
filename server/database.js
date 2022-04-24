const mysql = require("mysql");
const pool = mysql.createPool({
  database: 'projet',
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 3306,
});

const query = (query, values = []) => {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

module.exports.query = query;