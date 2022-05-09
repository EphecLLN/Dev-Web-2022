const { Server } = require("socket.io")
const { AuthManager } = require("./auth")

let story = {
  votes:[0,0],
  currentStep: "1",
  steps: {
    0: {
      text:"Merci d'avoir Joué !"
    },
    1: {
      text: "La partie est lancée !",
      choices: [
        { text: "Continuer", next: "2" },
        { text: "Terminer", next: "0" }
      ]
    },
    2 : {
      text: "L'aventure continue",
      choices: [
        { text: "Revenir en arrière", next: "1" },
        { text: "Terminer", next: "0" }
      ]
    }
  }
}

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
    socket.on("sendLaunch", p => this.onSendVote(socket, p))
    socket.on("sendVote", p => this.onSendVote(socket, p))
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

  onSendVote (socket, {token, vote}) {
    if (this.#auth.validateAccess(socket.id, token)) {
      console.log(
        `User ${this.#clients[socket.id].name} voted: `
        + `${vote}`
      )
      story.votes[vote] += 1
      this.#server.emit(
        "broadcastVote",
        Object.assign({votes: story.votes} , this.#clients[socket.id]),
      )
      if(story.votes.reduce((a, b) => a + b) >= Object.keys(this.#clients).length) {
        console.log("all users have voted")
        story.currentStep = story.steps[story.currentStep].choices[story.votes.indexOf(Math.max(...story.votes))].next
        console.log(Object.keys(this.#clients)[0])
        this.onSendPoll(socket, {token: token})
      }
    }
  }

  onSendPoll (socket, {token, text, choices}) {
    console.log(token)
    if (this.#auth.validateAccess(socket.id, token)) {
      console.log(`User ${this.#clients[socket.id].name} ask for poll`)
      let text = story.steps[story.currentStep].text
      let choices = story.steps[story.currentStep].choices.map((choice) => {return choice.text})
      this.#server.emit(
        "broadcastPoll",
        Object.assign({ text,choices }, this.#clients[socket.id]),
      )
    }
  }
}

module.exports = { SocketIOServer }
