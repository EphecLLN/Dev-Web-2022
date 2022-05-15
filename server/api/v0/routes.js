const express = require("express")
const bodyParser = require("body-parser")
const router = express.Router()
const db = require("../../database")
const hash = require("../../hash")
const inventory = require("./inventory")
const scenario = require("./scenario")

router.use("/scenario", scenario)
router.use("/inventory", inventory)

let jsonParser = bodyParser.json()

/* GET  */
router.get("/", (_req, res,) => {
  res.status(200).send("api is working")
})

/* GET users listing. */
router.get("/user", (_req, res,) => {

  db.connection.query("SELECT id, pseudo FROM users;", (err, rows) => {
    if(err) throw err
    res.status(200).json(rows)
  })
})

/* GET user. */
router.get("/user/:id", (req, res,) => {
  db.connection.query(
    "SELECT id, pseudo FROM users WHERE id="
    + `${db.connection.escape(req.params.id)};`,
    (err, rows) => {
      if(err) throw err
      if(rows.length == 1) {
        res.status(200).json(rows)
      } else {
        res.status(404).send("user not found")
      }
    }
  )
})

/* POST a new user. */
router.post("/register", jsonParser, (req, res,) => {
  // TODO: make only one query
  let pseudo = req.body.pseudo
  let password = req.body.password

  let isPseudo = typeof pseudo === "string"
  let isPassword = typeof password === "string"
  if (isPseudo && isPassword) {
    db.connection.query(
      "SELECT pseudo FROM users WHERE pseudo="
      + `${db.connection.escape(req.body.pseudo)};`,
      (err, rows) => {
        if(err) throw err
        if(rows.length == 0) {
          let h = hash.saltHashPassword(req.body.password)
          db.connection.query(
            "INSERT INTO users (pseudo, password, salt) VALUES ("
            + `${db.connection.escape(req.body.pseudo)}, `
            + `${db.connection.escape(h.passwordHash)}, `
            + `${db.connection.escape(h.salt)});`,
            (err, _rows) => {
              if(err) throw err
              res.status(200).send("you are registered")
            }
          )
        } else {
          res.status(404).send("pseudo is already used")
        }
      }
    )
  } else { res.status(400).send("wrong body request") }
})
/* PUT user modification. */
router.put("/user/:id", jsonParser, (req, res,) => {
  res.send("working")
})

/* DELETE user from DB. */
router.delete("/user/:id", jsonParser, (req, res,) => {
  db.connection.query(
    `DELETE FROM users WHERE id=${req.params.id};`,
    (err, _rows) => {
      if(err) throw err
      res.status(200).send("user deleted")
    }
  )
})

/* login user. */
router.post("/login", jsonParser, (req, res,) => {
  // TODO: make only one query
  db.connection.query(
    "SELECT pseudo FROM users WHERE pseudo="
    + `${db.connection.escape(req.body.pseudo)};`,
    (err, rows) => {
      if(err) throw err
      if(rows.length > 0) {
        db.connection.query(
          "SELECT SALT, PASSWORD FROM users WHERE pseudo="
          + `'${req.body.pseudo}';`,
          (err, rows) => {
            if(err) throw err
            if(hash.login(req.body.password,rows[0].SALT,rows[0].PASSWORD)) {
              res.status(200).send("you are logged in")
            } else {
              res.status(401).send("wrong password or username")
            }
          }
        )
      } else {
        res.status(404).send("wrong password or username")
      }
    }
  )
})

module.exports = router
