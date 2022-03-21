import React, { Component } from "react"
import socketIOClient from "socket.io-client"

class Play extends Component {
  componentDidMount () {
    const form = document.getElementById("form")
    const input = document.getElementById("input")
    const messages = document.getElementById("messages")

    const socket = socketIOClient()

    form.addEventListener("submit", (evt) => {
      evt.preventDefault()
      if (input.value) {
        socket.emit("chat message", input.value)
        console.log(`Sent event "chat message": ${input.value}`)
        input.value = ""
      }
    })
    socket.on("chat message", (msg) => {
      // TODO: Make a custom component instead of gluing stuff together
      const item = document.createElement("li")
      item.className = "row"
      const sender = document.createElement("div")
      sender.className = "col-2 bg-primary is-center"
      // TODO: Place some relevant player name here
      sender.textContent = "Marsouin"
      item.appendChild(sender)
      const message = document.createElement("div")
      message.className = "col is-left"
      message.textContent = msg
      item.appendChild(message)
      messages.appendChild(item)
      window.scrollTo(0, document.body.scrollHeight)
    })
  }

  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <ul className="container" id="messages"/>
          </div>
        </div>
        <form className="row is-full-width" id="form" action="">
          <input className="col is-rounded" id="input" autoComplete="off"/>
          <button className="col-1 button primary">Send</button>
        </form>
      </div>
    )
  }
}

export default Play
