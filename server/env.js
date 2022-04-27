require('dotenv').config()

const path = require("path")
const debug = require("debug")("dev-web-2022:server")

function parse_port(env_var, fallback) {
  let port = parseInt(env_var || `${fallback}`)
  if (isNaN(port)) {
    // Named pipe
    port = fallback
  } else if (port < 0) {
    debug(`Invalid port number: ${port}`)
    process.exit(1)
  }
  return port
}

const root_dir = path.resolve(path.dirname(process.env.DEV3_ROOT || "../"))
const static_dir = path.join(root_dir, process.env.DEV3_STATIC || "dist")

const port_dev = parse_port(process.env.DEV3_PORT, 8080)

const node_env = process.env.NODE_ENV || "development"

module.exports = {
  PATHS: {ROOT: root_dir, STATIC: static_dir},
  PORT: {DEV: port_dev, PROD: 80},
  IS_PROD: node_env === "production",
  IS_DEV: node_env === "development",
  NODE_ENV: node_env,
}
