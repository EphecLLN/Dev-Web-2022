const express = require("express")
const router = express.Router()
const db = require("./database");
const cypto = require('crypto');


/* GET  */
router.get("/", (req, res,) => {
    res.send("WORKING")
})

/* GET users listing. */
router.get("/users", (req, res,) => {
    console.log('reponse requete : ' + db.query("SELECT * FROM users;"))
    res.send(db.query("SELECT * FROM users;"))
})

/* POST a new user. */
router.post("/users", (req, res,) => {
    let pseudo = req.body.pseudo
    let password = req.body.password
    res.send(
        db.connection.query(`INSERT INTO users (pseudo, password) VALUES ('${pseudo}', '${password}');`, (err, rows) => {
            if(err) throw err;
            console.log('The data from users table are: \n', rows);
            connection.end();
        });
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
