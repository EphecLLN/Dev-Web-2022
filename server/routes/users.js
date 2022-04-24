const express = require("express")
const router = express.Router()
const db = require("../database");

/* GET users listing. */
router.get("/users", (req, res,) => {
  res.send("GET WORKING") //db.query("SELECT * FROM users")
})

/* POST a new user. */
router.post("/users", (req, res,) => {
  res.send("")
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
