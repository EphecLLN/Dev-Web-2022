const express = require("express")
const bodyParser = require('body-parser')
const router = express.Router()
const db = require("./database");
const crypto = require('crypto');


let jsonParser = bodyParser.json()
let hash = crypto.createHash('sha512');

let hashed = (word) => { hash.update(word, 'utf-8').digest('hex'); };


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
    let h = hashed(req.body.password)
    db.connection.query(`INSERT INTO users (pseudo, password) VALUES ('${req.body.pseudo}', '${h}');`, (err, rows) => {
        if(err) throw err;
        console.log(h);
        res.json(rows);
    })
})

/* PUT user modification. */
router.put("/user/:userId", jsonParser, (req, res,) => {
    res.send("working");
})

/* DELETE user from DB. */
router.delete("/user/:userId", jsonParser, (req, res,) => {
    res.send('working');
    // db.connection.query(`DELETE FROM users WHERE id=${req.params.userId};`, (err, rows) => {
    //     if(err) throw err;
    //     res.json(rows);
    // })

})

module.exports = router
