import React, { Component } from "react"
import { Color } from "../../common/color"
import { Client } from "../../common/proto"

class Play extends Component {
  player = null

  componentDidMount () {
    const form = document.getElementById("form")
    const input = document.getElementById("input")
    const messages = document.getElementById("messages")

    const client = new Client()

    form.addEventListener("submit", (evt) => {
      evt.preventDefault()
      if (input.value) {
        client.sendChat(this.player, input.value).then(
          p => {
            if (this.player === null) {
              this.player = p
            }
          },
          () => {
            this.player = {
              name: "unknown",
              color: Color.GREY,
            }
          },
        )
        console.log(`Sent event "chat message": ${input.value}`)
        input.value = ""
      }
    })
    // noinspection JSUnresolvedVariable
    client.socket.on("chatMessage", (player, msg) => {
      console.log(`received from ${player.name}: ${msg}`)
      // TODO: Make a custom component instead of gluing stuff together
      const item = document.createElement("li")
      item.className = "row"
      const sender = document.createElement("div")
      sender.className = "col-2 is-center"
      sender.style.background = player.color
      sender.textContent = player.name
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
