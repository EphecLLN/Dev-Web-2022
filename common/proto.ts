// This module defines the implementation of our simplistic protocol for
// exchanging event messages during a game

import { EventNames, EventParams } from "@socket.io/component-emitter"
import {io as IOClient,
    ManagerOptions,
    Socket as ClientSocket,
    SocketOptions} from "socket.io-client"
import { ColorStr } from "./color"
import { Opaque, WithLength } from "./types"

/**
 * Protocol version
 */
export const VERSION = { MAJOR: 0, MINOR: 2 }

/**
 * A <name>
 */
export type Name = Opaque<string, { Name: true }>

/**
 * Fallibly converts to a `Name`.
 *
 * @param s The name as a `string`.
 *
 * @returns - A `Name` if `s` is composed of 1 or more hyphen-separated ascii
 *  alphanumerical words, `null` otherwise.
 */
export function nameFrom(s: NonNullable<string>): Name | null {
    for (const word of s.split("-"))
        if (!word.match(/^[a-zA-Z0-9]+$/)) return null
    return s as Name
}

export type GrantToken = WithLength<string, 16>
export type AccessToken = WithLength<string, 32>
export type RefreshToken = WithLength<string, 32>

/**
 * TODO
 */
export type DisconnectReason = "server namespace disconnect"
    | "client namespace disconnect"
    | "server shutting down"
    | "ping timeout"
    | "transport close"
    | "transport error"

/**
 * TODO
 */
export type RegistrationFailReason = "user not found"
    | "challenge failed"
    | "already registered"
    | "game full"
    | `fatal: ${string}`

/**
 * TODO
 */
export type AckResponse<Success, Fail> =
    { success: true } & Success | { success: false } & Fail

/**
 * TODO
 */
export type TokenAckFn = AckFn<
  { access: AccessToken, refresh?: RefreshToken },
  Record<string, never>
>

/**
 * TODO
 */
export type AckFn<Success, Fail> =
    (response: AckResponse<Success, Fail>) => void

/**
 * `Client` to `Server` events
 */
interface C2SEvents {
    connection(socket: ClientSocket): void

    disconnect(reason: DisconnectReason): void

    register(
        payload: { name: Name, color: ColorStr },
        ack: AckFn<{ grant: GrantToken }, { reason: RegistrationFailReason }>
    ): void

    authenticate(grant: GrantToken, ack: TokenAckFn): void

    refresh(token: RefreshToken, ack: TokenAckFn): void

    chatMessage(payload: { token: AccessToken, msg: string }): void

    sendPoll(
      payload: {token: AccessToken, text: string, choices: string[]}
    ): void
}

/**
 * `Server` to `Client` events
 */
interface S2CEvents {
    broadcastMessage(
        payload: { name: Name, color: ColorStr, msg: string }
    ): void

    broadcastPoll(payload: {text: string, choices: string[]}): void
}

/**
 * Represents the client end of a bi-directional connection.
 */
export class Client {
    private socket: ClientSocket<S2CEvents, C2SEvents>

    constructor(
      uri?: string,
      opts: Partial<ManagerOptions & SocketOptions> = {}
    ) {
        // Forces a new connection to be opened rather than re-using a
        // pre-existing manager
        opts.forceNew = true
        this.socket = (uri === null) ? IOClient(opts) : IOClient(uri, opts)
    }

    // FIXME: correct payload type
    send<E extends EventNames<C2SEvents>, S extends Record<string, unknown>>(
      event: E,
      ...payload: EventParams<C2SEvents, E>
    ): Promise<S> {
      if (payload.length !== 1) {
        throw "Need exactly 1 payload"
      }
      return new Promise((resolve, reject) => {
        // Socket.io's type signature is somewhat incorrect w.r.t ack 
        // functions, and TS can't allow a single payload argument followed
        // by the ack.
        // So we fall back to some unsafe type casting black magic:
        // Cast payload as the loosest type we can afford
        const p = payload as { push: (arg: unknown) => number }
        // Push the ack function to args when TS looks the other way
        p.push((response: AckResponse<S, unknown>) => {
          if (response.success) {
              resolve(response)
          } else {
              reject(response)
          }
        })
        this.socket.emit(
          event,
          // Swear to TS this payload is 100% legit without any doubt /s
          ...p as EventParams<C2SEvents, E>,
        )
      })
    }
}

