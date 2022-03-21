const express = require("express")
const { Server } = require("socket.io")
const { PATHS } = require("./env")


const app = express()
app.use(express.static(PATHS.STATIC))

app.get("/", (req, res) => {
  res.sendFile("index.html")
})

function setupIO (server) {
  const users = [
    {
      name: "Marsouin",
      color: "#14854f",
    },
    {
      name: "Lynx",
      color: "#d6a71a",
    },
    {
      name: "Surricate",
      color: "#e62e4d",
    },
  ]

  const io = new Server(server)
  io.on("connection", (socket) => {
    console.log("User connected")
    socket.on("chat message", (msg, callback) => {
      let {
        user,
        text,
      } = msg
      if (user?.name === undefined) {
        msg.user = users.pop() ?? {
          name: "unknown",
          color: "4F4F4F",
        }
        callback(msg.user)
      }
      console.log(`User ${msg.user.name} sent msg: ${text}`)
      io.emit("chat message", msg)
    })
    socket.on("disconnect", () => {
      console.log("User disconnected")
    })
  })
}

module.exports = {
  app,
  setupIO,
}
