#!/usr/bin/env node

const app = require("../server/app")
const debug = require("debug")("dev-web-2022:server")
const http = require("http")

function onError (error) {
  if (error.syscall !== "listen") {
    throw error
  }

  const bind = typeof port === "string"
    ? `Pipe ${port}`
    : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
  case "EACCES":
    console.error(`${bind} requires elevated privileges`)
    process.exit(1)
    break
  case "EADDRINUSE":
    console.error(`${bind} is already in use`)
    process.exit(1)
    break
  default:
    throw error
  }
}

function onListening () {
  const address = server.address()
  const bind = typeof address === "string"
    ? `pipe ${address}`
    : `port ${address.port}`
  debug(`Listening on ${bind}`)
}

let port = "80"
if (app.get("env") === "development") {
  port = parseInt(process.env.PORT || "8080")
}
if (isNaN(port)) {
  // Named pipe
  port = process.env.PORT
} else if (port < 0) {
  debug(`Invalid port numbeR: ${port}`)
  process.exit(1)
}

const server = http.createServer(app)
server.listen(port)
server.on("error", onError)
server.on("listening", onListening)

