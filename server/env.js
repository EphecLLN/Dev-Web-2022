const path = require("path")
const debug = require("debug")("dev-web-2022:server")

const root_dir = path.resolve(path.dirname(process.env.DEV3_ROOT || "../"))
const static_dir = path.join(root_dir, process.env.DEV3_STATIC || "dist")

const default_port_dev = 8080
let port_dev = parseInt(process.env.DEV3_PORT || `${default_port_dev}`)
if (isNaN(port_dev)) {
  // Named pipe
  port_dev = default_port_dev
} else if (port_dev < 0) {
  debug(`Invalid port number: ${port_dev}`)
  process.exit(1)
}

module.exports = {
  PATHS: {ROOT: root_dir, STATIC: static_dir},
  PORT: {DEV: port_dev, PROD: 80}
}
