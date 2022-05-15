const { Server } = require("socket.io")
const { AuthManager } = require("./auth")

let story = {
  // Each index of the array represent the sum of vote for choices
  // So votes.length() == Object.keys(steps[currentStep].choices).length()
  votes:[0,0],
  // contains votes of each player 
  hasVoted: {},
  currentStep: "1",
  steps: {
    0: {
      text:"Merci d'avoir Joué !",
      choices: [{ text: "Rejouer", next: "1" }]
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
        { text: "Tourner à droite", next: "3" },
        { text: "Tourner à gauche", next: "4" },
        { text: "Terminer", next: "0" }
      ]
    },
    3 : {
      text: "Le chemin s'arrête net",
      choices: [
        { text: "Revenir en arrière", next: "2" },
        { text: "Terminer", next: "0" }
      ]
    },
    4 : {
      text: "Vous avez trouver un trésor",
      choices: [{ text: "Terminer l'aventure", next: "0" }]
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
      if(typeof vote == "string") {
        console.log(`User ${this.#clients[socket.id].name} voted: ${vote}`)
        // if player has already voted then change the vote
        if(token in story.hasVoted) {
          story.votes[story.hasVoted[token]] -= 1
        }
        story.hasVoted[token] = vote
        story.votes[vote] += 1
        
      }
      this.#server.emit(
        "broadcastVote",
        Object.assign({votes: story.votes} , this.#clients[socket.id]),
      )
      // if every player has voted
      if(story.votes.reduce((a,b)=>a+b) >= Object.keys(this.#clients).length) {
        console.log("all users have voted")
        let choices = story.steps[story.currentStep].choices
        // update currentStep of story to next step
        let choiceVoted = story.votes.indexOf(Math.max(...story.votes))
        story.currentStep = choices[choiceVoted].next
        // reset the votes
        story.votes = new Array(Object.keys(choices).length).fill(0)
        story.hasVoted = {}
        
        // update the poll and the votes
        this.onSendPoll(socket, {token: token})
        this.onSendVote(socket, {token: token})
      }
    }
  }

  onSendPoll (socket, {token}) {
    if (this.#auth.validateAccess(socket.id, token)) {
      console.log(`User ${this.#clients[socket.id].name} ask for poll`)
      let currentStep = story.steps[story.currentStep]
      let text = currentStep.text
      let choices = currentStep.choices.map((choice) => {return choice.text})
      this.#server.emit(
        "broadcastPoll",
        Object.assign({ text,choices }, this.#clients[socket.id]),
      )
    }
  }
}

module.exports = { SocketIOServer }
