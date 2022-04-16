import React, { Component } from "react"
import { Color } from "../../common/color"
import { Client } from "../../common/proto"

class Play extends Component {
  player = null

  state = {
    loggedIn: false,
    messages: [],
    name: null,
    color: {
      red: 150,
      green: 50,
      blue: 250,
    },
  }

  constructor (props) {
    super(props)
    this.client = this.client ?? new Client()
    this.client.socket.on("broadcastMessage", (message) => {
      const {
        name,
        msg,
      } = message
      console.log(`received from ${name}: ${msg}`)
      const { messages } = this.state
      messages.push(message)
      this.setState({ messages: messages })
      window.scrollTo(0, document.body.scrollHeight)
    })
  }

        )
      }

  componentDidMount () {
    const form = document.getElementById("form-login")
    form.addEventListener("submit", (evt) => {
      evt.preventDefault()
      this.setState({
        name: document.getElementById("input-name").value,
        loggedIn: true,
      })
      console.log("successfully logged in"),
    })
  }

  // noinspection JSCheckFunctionSignatures
  componentDidUpdate (prevProps, prevState) {
    if (prevState.loggedIn === false && this.state.loggedIn) {
      const form = document.getElementById("form-msg")
      const input = document.getElementById("input-msg")
      form.addEventListener("submit", (evt) => {
        evt.preventDefault()
        if (input.value) {
          Promise.reject("Client-side auth unimplemented").then((token) => {
            this.client.send("chatMessage", {
              token,
              msg: input.value,
            })
            input.value = ""
          })
          console.log(`Sent event "chatMessage": ${input.value}`)
        }
      })
    }
  }

  render () {
    return <div>
      {!this.state.loggedIn &&
      <form className="container" id="form-login">
        <div className="row is-center">
          <div className="col-1 is-right">Name:</div>
          <input
            className="col-4 is-rounded"
            id="input-name"
            autoComplete="off"
            type="text"
          />
        </div>
        <div className="row is-center">Color:</div>
        {/* TODO: put these in a custom component */}
        <div className="row is-center">
          <div className="col-1 is-right">Red:</div>
          <input
            className="col-3 is-rounded"
            id="input-color-red"
            autoComplete="off"
            type="range" min="0" max="255" defaultValue="150"
            onInput={(evt) => this.setState({
              color: {
                red: clamp(0, evt.target.value, 255),
                green: this.state.color.green,
                blue: this.state.color.blue,
              },
            })}
          />
          <div className="col-1">{this.state.color.red}</div>
        </div>
        <div className="row is-center">
          <div className="col-1 is-right">Green:</div>
          <input
            className="col-3 is-rounded"
            id="input-color-green"
            autoComplete="off"
            type="range" min="0" max="255" defaultValue="50"
            onInput={(evt) => this.setState({
              color: {
                red: this.state.color.red,
                green: clamp(0, evt.target.value, 255),
                blue: this.state.color.blue,
              },
            })}
          />
          <div className="col-1">{this.state.color.green}</div>
        </div>
        <div className="row is-center">
          <div className="col-1 is-right">Blue:</div>
          <input
            className="col-3 is-rounded"
            id="input-color-blue"
            autoComplete="off"
            type="range" min="0" max="255" defaultValue="250"
            onInput={(evt) => this.setState({
              color: {
                red: this.state.color.red,
                green: this.state.color.green,
                blue: clamp(0, evt.target.value, 255),
              },
            })}
          />
          <div className="col-1">{this.state.color.blue}</div>
        </div>
        <div className="row is-center">
          <div
            className="col-1 is-center"
            style={{
              height: 64,
              background: new Color(
                this.state.color.red,
                this.state.color.green,
                this.state.color.blue,
              ).toString(),
            }}
          />
        </div>
        <div className="row is-center">
          <input
            className="col-1 is-center button primary"
            type="submit"
            value="Play"
          />
        </div>
      </form>
      }
      {this.state.loggedIn &&
      <div className="container">
        <div className="row">
          <div className="col">
            <ul className="container" id="messages">
              {
                this.state.messages.map(({
                  name,
                  color,
                  msg,
                }, i) => <li key={i + 1} className="row">
                  <div className="col-2 is-center" style={{ background: color }}>
                    {name}
                  </div>
                  <div className="col is-left">{msg}</div>
                </li>)
              }
            </ul>
          </div>
        </div>
        <form className="row is-full-width" id="form-msg">
          <input
            className="col is-rounded"
            id="input-msg"
            autoComplete="off"
            type="text"
          />
          <input className="col-1 button primary" type="submit" value="Send"/>
        </form>
      </div>
      }
    </div>
  }
}

export default Play
