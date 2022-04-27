const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const db = require("./database");
const hash = require("./hash");


let jsonParser = bodyParser.json();
let response = (success, message, data) => { return {'success': success, 'message': message, 'data': data}; }

/* GET  */
router.get("/", (req, res,) => {
    res.json(response(true, "API is working"));
})

/* GET users listing. */
router.get("/user", (req, res,) => {
    db.connection.query("SELECT id, pseudo FROM users;", (err, rows) => {
        if(err) throw err;
        res.json(response(true, "list of users", rows));
    })
})

/* GET user. */
router.get("/user/:id", (req, res,) => {
    db.connection.query(`SELECT id, pseudo FROM users WHERE id=${db.connection.escape(req.params.id)};`, (err, rows) => {
        if(err) throw err;
        if(rows.length == 1) {
            res.json(response(true, "asked user", rows));
        } else {
            res.json(response(false, "asked user id does not exist"));
        }
    })
})

/* POST a new user. */
router.post("/register", jsonParser, (req, res,) => {
    db.connection.query(`SELECT pseudo FROM users WHERE pseudo=${db.connection.escape(req.body.pseudo)};`, (err, rows) => {
        if(err) throw err;
        if(rows.length == 0) {
            let h = hash.saltHashPassword(req.body.password);
            db.connection.query(`INSERT INTO users (pseudo, password, salt) VALUES (${db.connection.escape(req.body.pseudo)}, ${db.connection.escape(h.passwordHash)}, ${db.connection.escape(h.salt)});`, (err, rows) => {
                if(err) throw err;
                res.json(response(true, "you are registered"));
            })
        } else {
            res.json(response(false, "pseudo is already used"));
        }
    })
})

/* PUT user modification. */
router.put("/user/:id", jsonParser, (req, res,) => {
    res.send("working");
})

/* DELETE user from DB. */
router.delete("/user/:id", jsonParser, (req, res,) => {
    db.connection.query(`DELETE FROM users WHERE id=${req.params.id};`, (err, rows) => {
        if(err) throw err;
        res.json(response(true, "user deleted"));
    })
})

/* login user. */
router.post("/login", jsonParser, (req, res,) => {
    db.connection.query(`SELECT pseudo FROM users WHERE pseudo=${db.connection.escape(req.body.pseudo)};`, (err, rows) => {
        if(err) throw err;
        if(rows.length == 0) {
            db.connection.query(`SELECT SALT, PASSWORD FROM users WHERE pseudo='${req.body.pseudo}';`, (err, rows) => {
                if(err) throw err;
                if(hash.login(req.body.password,rows[0].SALT,rows[0].PASSWORD)) {
                    res.json(response(true, "you are logged in"));
                } else {
                    res.json(response(false, "wrong password or username"));
                }
            })
        } else {
            res.json(response(false, "wrong password or username"));
        }
    })
})

module.exports = router;
