const express = require("express")
var bodyParser = require('body-parser')
const router = express.Router()
const db = require("./database");
const cypto = require('crypto');


var jsonParser = bodyParser.json()

/* GET  */
router.get("/", (req, res,) => {
    res.send("WORKING")
})

/* GET users listing. */
router.get("/users", (req, res,) => {
    db.connection.query("SELECT * FROM users;", (err, rows) => {
        if(err) throw err;
        res.json(rows);
    })
})

/* POST a new user. */
router.post("/users", jsonParser, (req, res,) => {
    console.log(req.body)
    db.connection.query(`INSERT INTO users (pseudo, password) VALUES ('${req.body.pseudo}', '${req.body.password}');`, (err, rows) => {
        if(err) throw err;
        res.json(rows);
    })
})

/* PUT user modification. */
router.put("/user/:userId", (req, res,) => {
    res.send("")
})

/* DELETE user from DB. */
router.delete("/user/:userId", (req, res,) => {
    res.send("")
})

module.exports = router
