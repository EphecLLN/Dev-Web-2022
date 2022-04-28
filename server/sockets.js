const { Server } = require("socket.io")
const { AuthManager } = require("./auth")

class SocketIOServer {
  #auth = new AuthManager()
  #server
  #clients = {}

  constructor (http) {
    this.#auth = new AuthManager()
    this.#server = new Server(http)
    this.#server.on("connection", (s) => this.onConnection(s))
  }

  onConnection (socket) {
    console.log("User connected")

    socket.on("register", (p, a) => this.onRegister(socket, p, a))
    socket.on("authenticate", (p, a) => this.onAuthenticate(socket, p, a))
    socket.on("refresh", (p, a) => this.onRefresh(socket, p, a))
    socket.on("chatMessage", p => this.onChatMessage(socket, p))
    socket.on("sendPoll", p => this.onSendPoll(socket, p))
    socket.on("disconnect", () => this.onDisconnect(socket))
  }

  onDisconnect (socket) {
    if (socket.id in this.#clients) {
      console.log(
        `User ${this.#clients[socket.id].name} (${socket.id}) disconnected`,
      )
    }
    delete this.#clients[socket.id]
    this.#auth.purge(socket.id)
  }

  onRegister (socket, {name, color}, ack) {
    const resp = this.#auth.getGrant(socket.id, name)
    if (resp.success) {
      this.#clients[socket.id] = {
        name,
        color,
      }
    }
    ack(resp)
  }

  onAuthenticate (socket, grant, ack) {
    ack(this.#auth.getTokens(socket.id, grant))
  }

  onRefresh (socket, refresh, ack) {
    ack(this.#auth.refreshTokens(socket.id, refresh))
  }

  onChatMessage (socket, {token, msg}) {
    if (this.#auth.validateAccess(socket.id, token)) {
      console.log(`User ${this.#clients[socket.id].name} sent msg: ${msg}`)
      this.#server.emit(
        "broadcastMessage",
        Object.assign({ msg }, this.#clients[socket.id]),
      )
    }
  }

  onSendPoll (socket, {token, text, choices}) {
    if (this.#auth.validateAccess(socket.id, token)) {
      console.log(`User ${this.#clients[socket.id].name} created a poll: ${text} ${choices}`)
      this.#server.emit(
        "broadcastPoll",
        Object.assign({ text,choices }, this.#clients[socket.id]),
      )
    }
  }
}

module.exports = { SocketIOServer }
