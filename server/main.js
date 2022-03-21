#!/usr/bin/env node

const { app, setupIO } = require("./app")
const { PORT } = require("./env")
const debug = require("debug")("dev-web-2022:server")
const http = require("http")

let port = PORT.PROD
if (app.get("env") === "development") {
  port = PORT.DEV
}

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
    : `${address.address}:${address.port}`
  debug(`Listening on ${bind}`)
}

const server = http.createServer(app)
setupIO(server)
server.listen(port)
server.on("error", onError)
server.on("listening", onListening)

