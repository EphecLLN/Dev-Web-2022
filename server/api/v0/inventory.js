const express = require("express")
const router = express.Router()
const db = require("../../database")

/* GET inventory */
router.get("/:id", (req, res) => {
  db.connection.query(`SELECT id,objet,nom FROM inventory where id_scenario = 
    ${db.connection.escape(
    req.params.id
  )};`, (err, rows) => {
    if (err) throw err
    res.json(rows)
  })
})

module.exports = router 