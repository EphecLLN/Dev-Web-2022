# Messaging protocol specifications

**_Document version: 0.1.0_**

## Introduction

This document defines simplistic messaging protocol, based on
[`socket.io` v4](https://socket.io/docs/v4/) sockets.

It is intended to provide a reference people implementing this project's server
and/or client, and to help to develop it further while maintaining its
scalability.

## Labels

This section defines the identifiers used for various components of the
protocol.

### Socket

A Socket is a low-latency, bidirectional and event-based communication channel
between a Client and the Server. They MUST be fully-compatible with
[`socket.io`'s v4 sockets](https://socket.io/docs/v4/).

### Server

The server is the central entity connected to Clients.

### Clients

Each Client is connected to the Server through a Socket. Clients MUST NOT
connect to each other

### Players

Players are uniquely identified by a <name>, see
[protocol grammar](#protocol-generic-grammar) for what may or may not be used
as a Player Name.

Players are assigned to a Client by the Server when they first send a message
during the game.

## Protocol common specification

### Messages

Clients and the Server send each other Messages. They have three components:
The Event (always REQUIRED), the Payload (MAY be OPTIONAL) and the
Acknowledgement (MAY be OPTIONAL).

Processing Messages SHOULD NOT block for a substantial amount of time, in order
to conserve the low-latency and asynchronous nature of the Sockets.

### Events

Events are string of ASCII composed of at least one alphanumerical
case-sensitive words in camelCase. Two events with the same text representation
but travelling in opposite direction (from Client to Server vs from Server to
Client) MAY not have the same semantics (See
[bi-directional events](#bi-directional-events) for the Events that do).

Given that Sockets are event-based, we will often use the phrase "Sending an
Event" as a mean to say "Sending a Message with given Event".

### Payloads

Payloads are any serializable value that are attached to a Message.

We will define Payloads' layout using JSON-like ABNF syntax (e.g. `[]{}"` will
have the same meaning as in JSON), referencing to the
[protocol grammer](#protocol-generic-grammer) by using unquoted rule name
enclosed in angle brackets, e.g. like `<name>` (so that `"<name>"` is the
string representation of a `<name>`).

### Acknowledgement

Acknowledgements are callbacks called upon receiving the Message they were
attached to. The Acknowledgement SHOULD be called as soon as possible. Not
calling an Acknowledgement MUST be considered an error and MUST be handled by
Clients or the Server. The protocol does not specify a time after which Clients
or the Server should stop waiting for an Acknowledgement, but either SHOULD NOT
wait forever.

We will define Acknowledgement's arguments and return values in the same way as
Payloads. Note that arguments will be put in an array to accomodate having
several arguments.

### Protocol generic grammar

```abnf
event = 1*ALPHA
name  = WORD *("-" WORD)
word  = 1*(ALPHA / DIGIT)
color = "#" 6HEXDIG
text  = 1*OCTET
```

> Note: `<text>` MAY not allow for any string of data. Implementations MAY
> restrict it e.g. to UTF-8.

## Message details

This section defines the format of Messages given which events they are
carrying.

### Client to Server Events

#### connection

This event is automatically sent when a Client successfully connects to the
Server. No payload or Acknowledgement is attached.

#### disconnect

This event is automatically sent when the connection between the Server and a
Client is tore down.

#### chatMessage

This event is sent when a Player sends a text message to other Clients.

Both a Payload and an Acknowledgement are REQUIRED. The Payload MUST hold the
Player sending the message and the message's text itself. The Player MAY be
left as `null` to indicate to the Server that the Client has not been assigned
a Player yet.

```abnf
chat-event-payload    = [ player, msg ]
chat-event-ack-args   = [ player ]
chat-event-ack-return = true / false
player                = { "name": "<name>", "color": "<color>" }
                      / null
msg                   = "<text>"
```

### Client to Server Events

#### chatMessage

This event is sent when a Player sends a text message to other Clients. It is a
simple broadcast of its Client-to-Server equivalent from the Server to all
Clients, except it MUST NOT have an Acknowledgement attached, and that the
Payload's Player MUST NOT be `null`

### Bi-directional Events

This section is empty for the moment.

