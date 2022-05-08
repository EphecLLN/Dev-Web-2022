const {StatusCodes: HTTP} = require("http-status-codes")
const express = require("express")
const router = express.Router()
const db = require("../../database")

router.get("/:id", (req, res) => {
  db.connection.query(
    `SELECT users.id, users.pseudo, scenario.texte
    FROM scenario INNER JOIN users
    ON users.id = scenario.user_id
    WHERE scenario.id = ${db.connection.escape(req.params.id)};`,
    (err, rows) => {
      if (err) {
        res.status(HTTP.INTERNAL_SERVER_ERROR)
        res.json({reason: `${err}`})
      }
      else if (rows.length > 1) {
        res.status(HTTP.INTERNAL_SERVER_ERROR)
        res.json({reason: "Too many results"})
      } else if (rows.length < 1) {
        res.status(HTTP.NOT_FOUND)
      } else {
        const {id, pseudo, texte} = rows.pop()
        res.status(HTTP.OK)
        res.json({owner: {id, pseudo}, scenario: texte})
      }
    }
  )
})

module.exports = router
