const express = require("express")
const { Server } = require("socket.io")
const { PATHS } = require("./env")


const app = express()
app.use(express.static(PATHS.STATIC))

app.get("/", (req, res) => {
  res.sendFile("index.html")
})

function setupIO (server) {
  const io = new Server(server)
  io.on("connection", (socket) => {
    socket.on("chat message", msg => {
      io.emit("chat message", msg)
    })
  })
}

module.exports = {
  app,
  setupIO,
}
