const express = require("express")
const { Server } = require("socket.io")
const webpack = require("webpack")

const {
  IS_PROD,
  PATHS,
} = require("./env")


const app = express()

if (!IS_PROD) {
  const config = require("../webpack.config.dev.js")
  const compiler = webpack(config)
  app.use(
    require("webpack-dev-middleware")(compiler, {
      publicPath: config.output.publicPath,
    }),
  )

  app.use(
    require("webpack-hot-middleware")(compiler, {
      log: false,
      path: "/__webpack_hmr",
      heartbeat: 2 * 1000,
    }),
  )
}

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
    socket.on("chatMessage", (player, msg, callback) => {
      let assigned_player
      if (player === null) {
        assigned_player = users.pop()
        console.log(
          `New user is ${assigned_player.name} ${assigned_player.color}`
        )
      } else {
        assigned_player = {
          name: player.name,
          color: player.color.toString(),
        }
      }
      console.log(`User ${assigned_player.name} sent msg: ${msg}`)
      io.emit("chatMessage", assigned_player, msg)
      callback(assigned_player ?? null)
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
