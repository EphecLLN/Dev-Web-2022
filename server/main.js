#!/usr/bin/env node

const {
  PORT,
  IS_DEV,
  IS_PROD,
  NODE_ENV,
  PATHS,
} = require("./env")
const debug = require("debug")("dev-web-2022:server")
const http = require("http")
const express = require("express")
const webpack = require("webpack")
const { SocketIOServer } = require("./sockets")

let port
if (IS_DEV) {
  port = PORT.DEV
} else if (IS_PROD) {
  port = PORT.PROD
} else {
  console.error(`Invalid environment: ${NODE_ENV}`)
  process.exit(1)
}

class App {
  #port
  #httpSrv
  #socketSrv

  static createExpress () {
    const app = express()

    app.use(express.static(PATHS.STATIC))

    // Files served
    app.get("/", (req, res) => {
      res.sendFile("index.html")
    })

    // Insert hot-reload middleware if in development mode
    if (IS_DEV) {
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


    return app
  }

  constructor (port) {
    this.#port = port
    this.#httpSrv = null
    this.#socketSrv = null
  }

  start () {
    this.#httpSrv = http.createServer(App.createExpress())
    this.#socketSrv = new SocketIOServer(this.#httpSrv)
    this.#httpSrv.on("error", this.onError.bind(this))
    this.#httpSrv.on("listening", this.onListening.bind(this))
    this.#httpSrv.listen(this.#port)
  }

  onError (error) {
    if (error.syscall !== "listen") {
      throw error
    }

    const bind = typeof this.#port === "string"
      ? `Pipe ${this.#port}`
      : `Port ${this.#port}`

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

  onListening () {
    const address = this.#httpSrv.address()
    const bind = typeof address === "string"
      ? `pipe ${address}`
      : `${address.address}:${address.port}`
    debug(`Listening on ${bind}`)
  }

}

new App(port).start()


