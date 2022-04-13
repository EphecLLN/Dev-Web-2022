# Messaging protocol specifications

**_Document version: 0.2.0_**

## Introduction

This document defines simplistic messaging protocol, based on
[`socket.io` v4](https://socket.io/docs/v4/) sockets.

It is intended to provide a reference people implementing this project's server
and/or client, and to help to develop it further while maintaining its
scalability.

The goal of this protocol is to describe well-behaved interactions through
Sockets between a Server and Clients, and describe how they translate to
interactions between abstractions, like between Players and a Game.

## Labels

This section defines the identifiers used for various components of the
protocol.

### Socket

A Socket is a low-latency, bidirectional and event-based communication channel
between a Client and the Server. They MUST be fully-compatible with
[`socket.io`'s v4 sockets](https://socket.io/docs/v4/).

### Server

The server is the central entity connected to Clients. It can also be seen as a
Client hosting the virtual Player being the Game.

### Clients

Each Client is connected to the Server through a Socket. Clients MUST NOT
connect to each other. Each Client hosts at most 1 Player.

### Game

The Game is the space within which Players interact with a pre-defined
scenario.  Each Game may have a different scenario, but the interactions within
any Game is described by this protocol specification. Scenarios are written
before a Game starts, and do not change during a Game. As such, a Game can be
seen as a very powerful Player analogous to tabletop role-play games' game
master.

### Players

Within a Game, Players are uniquely identified by a \<name>, see
[protocol grammar](#protocol-generic-grammar) for what may or may not be used
as a Player Name. If two Players have the same \<name>, they are the exact same
Player.

Each Player also has a \<color> representing the color its name will be
displayed in. A Game or Server MAY restrict the color space available to
Players.

Each Client registers its Player to the Server upon joining a Game.

## Authentication

The authentication scheme is loosely based on the OAuth2 workflow and
nomenclature, in the idea that it will allow smoother transition if OAuth2
authentication is to be supported in the future.

> Note: The authentication is subject to be removed from this protocol even
> before supporting OAuth2, e.g. by setting up API endpoints to manage
> authentication. This would only let Access Token visible in this
> specification.

> Note: The OAuth2 authentication framework we refer to is defined in
> [RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749).

The equivalent to OAuth2 actors are as follows:

- a Client is an OAth2 Client.
- A Game is an OAuth2 Resource.
- A Server both serves as the OAuth2 Resource Server and Auth Server.
- A Player is an OAuth2 Resource Owner, and is managed by the Server before
  successful authentication by a Client.

> Note: Inventory, assets or rooms are concepts that may get implemented later
> on, and may have some idea of restricted access with regard to some players.
> These ought to be considered as OAuth2 Resources as well.

The authentication workflow roughly follows that of OAuh2.

The mentions of "Oauth2" in the following diagram are purely for clarification,
implementation of this protocol MAY not conform to OAuth2's Actors architecture
at all, for the sake of simplicity.

```
+--------+                               +------------------------------------+
|        |                               |               Server               |
|        |                               |  +--------------+                  |
|        |--(1)- Registration request ---|->|   "OAuth2"   |                  |
|        |                               |  |  Resources   |                  |
|        |<-(2)- Authorization Grant ----|--|    Owner     |                  |
|        |                               |  |              |                  |
|        |<-(3)-- Registration error ----|--|              |                  |
|        |                               |  +--------------+                  |
|        |                               |                   +--------------+ |
|        |--(4)- Authorization Grant ----|------------------>|  "OAuth2"    | |
|        |                               |                   | Auth Server  | |
|        |<-(5)----- Access Token -------|-------------------|              | |
|        |    & Optional Refresh Token   |                   |              | |
| Client |                               |                   |              | |
|        |<-(6)- Authorization error ----|-------------------|              | |
|        |                               |                   |              | |
|        |                               |  +--------------+ |              | |
|        |--(7)----- Access Token -------|->|  "OAuth2"    | |              | |
|        |                               |  |  Resources   | |              | |
|        |<-(8)-- Protected Resource ----|--|   Server     | |              | |
|        |                               |  |              | |              | |
|        |<-(9)- Invalid Token Error ----|--|              | |              | |
|        |                               |  +--------------+ |              | |
|        |                               |                   |              | |
|        |--(10)---- Refresh Token ------|------------------>|              | |
|        |                               |                   |              | |
|        |<-(11)----- Access Token ------|-------------------|              | |
|        |     & Optional Refresh Token  |                   |              | |
|        |                               |                   |              | |
|        |<-(12)---- Refresh refused ----|-------------------|              | |
|        |                               |                   +--------------+ |
+--------+                               +------------------------------------+
```
<div style="text-align: center" id="fig:auth-flow">Fig. 2: Authentication flow</div>

The flow illustrated in [fig.2](#auth-flow) includes the following steps:

1. OAuth2 Client authorization grant from the OAuth2 Resource Owner:
  A Client requests the Server to register a Player, sending the relevant
  details. See the [register event](#register).
2. If the Server accepts the registration request, it remembers the Player's
   details and sends an authorization grant with an Authorization Grant.
3. If the Server refuses registration or the Player's details are invalid, it
  sends a registration error.
4. If the Client is willing to conclude the authentication process and join a
  Game, it sends a tokens request to the Server with the authorization grant
  obtained in step See the [authenticate event](#authenticate).
5. If the Server recognizes the authorization grant, it sends an Access Token
  and an OPTIONAL Refresh Token to the Client.
6. If the server does not recognize the authorization grant, it sends an
  authentication error.
7. The client makes a protected resource request to the Server by presenting
  its Access Token. All [Client to Server events](#client-to-server-events)
  follow this pattern when interacting with any Resource held by a Game and,
  by extension, any Player(s), including the Client's Player.
8. If the server validates the Access Token, it responds with the protected
  resource if needed, or take the relevant action.
  > Not all resource access conceptually represent the obtaining of some sort
  > of data. For instance, access to chat is, from an authentication
  > perspective, abstracted as a resource access, and the protected resource
  > response here is the action taken by the server to broadcast the Player's
  > chat message. In this case there may be no event or Acknowledgement sent
  > back as a response if the event semantics don't require it. See the
  > [chat message event](#chatmessage).
9. If the server does not validate the access token, it sends an
  invalid token error.
10. If the Client tried to access a protected resource and its token was
  invalid because it expired, it MAY request a new Access Token using its
  Refresh Token. See the [refresh access event](#refresh).
11. If the Server validates the Refresh Token, it sends a new Access Token, and
  optionally a new Refresh Token.
12. If the Server does not validate the Refresh Token, it sends a
  refresh refused error.
  > A refresh refused event basically mean the Client has to register again,
  > if their Access Token had expired.

A Server MAY refuse to register a Player from a Client that did not
[disconnect](#disconnect) after successfully registering any Player, to
mitigate some race conditions allowing a Client to have two ongoing
authentication sessions on the same Socket.

### Authorization Grant

An Authorization Grant is granted by the Server before a Player joins a Game as
a result of successful registration from a Client. It can then be used to
retrieve an Access Token and a Refresh Token.

Authorization Grants are codes of power-of-two multiple of 1024 bits, encoded
as base64 strings.

Authorization Grants MUST NOT be allowed to be used more than once to retrieve
tokens.

Authorization Grants MUST expire after some delay. They SHOULD NOT expire too
soon as to allow Clients to successfully retrieve Access & Refresh Tokens
despite a high latency. If a Client successfully obtains an Authorization
Grant, it SHOULD always be able to successfully retrieve the tokens as long as
it requests them as soon as the grant is received.

The Server MUST specify the lifetime in seconds of the grant, as a number of
seconds since the response was generated.

### Access Token

An Access Token represents access to some protected resources like the Game's
chat. All Messages that give a Player access to a resource of this kind will
require a valid Access Token to succeed.

Access Tokens are codes of power-of-two multiple of 1024 bits, encoded as
base64 strings. They MUST be at least as long as Authorization Grants codes.

The Server MUST specify the lifetime in seconds of the Access Token, as a
number of seconds since the response was generated.

### Refresh Token

Refresh Tokens are used to get new valid Access Tokens after the one in use has
expired.

When a Server sends a Refresh Token, it Must always be accompagnied with a
valid Access Token.

Refresh Tokens are codes of power-of-two multiple of 1024 bits, encoded as
base64 strings. They MUST be at least as long as Authorization Grants codes.

The Server MUST specify the lifetime in seconds of the Refresh Token, as a
number of seconds since the response was generated.

Only one Refresh Token MUST exist at the same time per Client-Player pair. If
at one point a new Refresh Token is issued to a Client, the latter MUST discard
the older Refresh Token. The Server MAY revoke the old Refresh Token after
issuing a new Refresh Token.

## Protocol common specification

### Messages

Clients and the Server send each other Messages through Sockets. They have
three components: The Event (always REQUIRED), the Payload (MAY be OPTIONAL)
and the Acknowledgement (MAY be OPTIONAL).

Processing Messages SHOULD NOT block for a substantial amount of time, in order
to conserve the low-latency and asynchronous nature of the Sockets.

### Events

Events are string of ASCII composed of at least one alphanumerical
case-sensitive words in camelCase. Two Events MUST NOT have the same name,
regardless if one is sent from Client to Server and the other from Server to
Client.

Given that Sockets are event-based, we will often use the phrase "Sending an
Event" as a mean to say "Sending a Message with given Event". In that case, any
Payload or Acknowledgement are unspecified, or could be inferred from context.

### Payloads

Payloads are any serializable value that are attached to a Message.

### Acknowledgement

Acknowledgements are callbacks called upon receiving the Message they were
attached to. The Acknowledgement SHOULD be called as soon as possible. Not
calling an Acknowledgement MUST be considered an error and MUST be handled by
Clients or the Server. The protocol does not specify a time after which Clients
or the Server should stop waiting for an Acknowledgement, but either SHOULD NOT
wait forever.

We will define Acknowledgement's arguments and return values in the same way as
Payloads. Note that arguments will be put in an array to accommodate having
several arguments.

### Protocol generic grammar

```abnf
event = 1*ALPHA
name  = WORD *("-" WORD)
word  = 1*alphanum
color = "#" 6HEXDIG
text  = 1*OCTET
token = 16*base64-char
base64-char = (alphanum / "-" / "_")
alphanum = ALPHA / DIGIT
```

Implementations MAY restrict \<text> to valid UTF-8.

## Message details

This section defines the format of Messages given which events they are
carrying.

### Client to Server Events

#### connection

This event is automatically sent when a Client successfully connects to the
Server. No payload or Acknowledgement is attached.

#### disconnect

This event is automatically sent when the connection between the Server and a
Client is torn down.

#### register

This event is sent when a Client attempts to register its Player's identity to
get an Authorization Grant.

Both a Payload and an Acknowledgement are REQUIRED. The Payload MUST be an
object with the `name` field set to the Player's globally unique \<name>, and
the `color` field containing the Player's color.

The Acknowledgements MUST take an object as a single argument:
- If registration succeeds, the `success` field MUST be set to `true`, and the
  `grant` field MUST contain the Authorization Grant's code.
- If the registration was refused, the `success` field MUST be set to `false`,
  and the `reason` field must be a string with the reason why it failed.

The following reasons may be given:
- `user not found` means the Server doesn't know any Player going by the
  specified \<name>, and it doesn't accept Player it doesn't know. A Server MAY
  never refuse registration for this reason.
- `already registered` means the Player has already joined the current Game. A
  Server MUST refuse registration of an already registered Player.
- `challenge failed`, `game full` are reserved for future use.

Additionally, a reason starting with the \<word> `fatal` indicates an
unexpected Server error.

```abnf
payload = { "name": "<name>", "color": "<color>" }
ack     = { "success": true, "grant": "<token>" }
        / { "success": false, "reason": "<reason>" }
reason  = "user not found"
        / "challenge failed"
        / "already registered"
        / "game full"
        / "fatal" *1( ": " text )
```

#### authenticate

This event is sent when a Client attempts to retrieve its Access Token and
Refresh Token for a Player.

Both a Payload and an Acknowledgement are REQUIRED. The Payload MUST be the
Player's Authentication Grant.

The Acknowledgement MUST take an object as a single argument:
- If the Authorization Grant is valid, the `success` field MUST be set to
  `true`, and the `access` field MUST contain a valid Access Token for the
  Player. The `refresh` field MAY be present and, if so, MUST contain a valid
  Refresh Token.
- If the Authorization Grant is not valid, the `success` field MUST be set to
  `false`.

```abnf
payload = DQUOTE token DQUOTE
ack     = {
            "success": true
            , "access": "<token>"
            *1( , "refresh": "<token>" )
          }
        / { "success": false }
```

#### refresh

This event is sent when a Client wishes to get a new Access Token for a Player
and refresh its access to the Player's resources.

Both a Payload and an Acknowledgement are REQUIRED. The Payload MUST be a valid
Refresh Token of the Player.

The Acknowledgement MUST take the same argument as the Acknowledgement of the
[authenticate event](#authenticate).

#### chatMessage

This event is sent when a Player sends a text message to other Clients.

A Payload is REQUIRED, and an Acknowledgement MUST NOT be given. The Payload
MUST be an object with the `token` field set to the Access Token of the Player
sending the message, and the `msg` field containing the actual message as a
string.

```abnf
payload = { "token": "<token>", "msg": "<text>" }
```

### Server to client Events

#### broadcastMessage

This event is sent when a Player sends a text message to other Clients. It is a
simple broadcast of its Client-to-Server equivalent from the Server to all
Clients.

A Payload is REQUIRED, and an Acknowledgement MUST NOT be given. The Payload
MUST be an object with the following fields set:
- `name`: the display \<name> of the Player that sent the message
- `color`: the display color of the Player that sent the message
- `color`: the display \<color> of the Player that sent the message
- `msg`: the message's \<text>.

```abnf
payload = { "name": "<name>", "color": "<color>", "msg": "<text>" }
```

## Appendix

### Conformance

The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”,
“SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be
interpreted as described in
[RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119).

All of the text of this specification is normative except sections explicitly
marked as non-normative, examples, and notes set apart from the normative text
like this:

> This is an example of a non-normative text section.

### Grammar

Because a significant part of our messaging uses JSON to carry data, we will
use a hybrid syntax between the standard ABNF defined in
[RFC 5234](https://datatracker.ietf.org/doc/html/rfc5234) and updated in
[RFC 7405](https://datatracker.ietf.org/doc/html/rfc7405), and JSON syntax as
defined in the [RFC 8259](https://datatracker.ietf.org/doc/html/rfc8259). This
syntax has the same rule as ABNF, apart from the following updates:
- Unquoted curly brackets `{}` mark the start and end of a JSON object, and
  everything in between matching curly brackets represents a JSON object, and
  as such obeys standard JSON syntax. ABNF takes over again immediately after
  the closing curly bracket `}`.
- Unquoted square brackets `[]` mark the start and end of a JSON array, and
  everything in between matching square brackets MUST represents a JSON value,
  and as such obeys standard JSON syntax. ABNF takes over again immediately
  after the closing square bracket `]`
- Optional grammar element written in ABNF may not be written using unquoted
  square brackets `[]`, as they are now reserved for JSON array syntax.

Text in-between angle brackets in JSON strings refers to an other ABNF rule.

> For example, `ack = { "token": "<token>" }` defines a rule named `ack`
> representing a JSON object with a mandatory field `token` which is a JSON
> string with syntax defined by the \<token> rule.

Any non-valid JSON syntax inside a JSON object or array is considered ABNF
syntax.

> For example, `player = { "name": "alex" *1( , "eyes": "blue" )}` defines a
> rule named `player` representing a JSON object with a mandatory `name` field
> and an optional `eyes` field.

Reference to grammar definitions in text is made by using the definition name's
in between unquoted angle brackets `<>`, as it's common to do when dealing with
ABNF grammar definitions.

> For instance, \<color> refers to the generic definition `color = "#"
> 6HEXDIG`.

