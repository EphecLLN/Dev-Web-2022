// This module defines the implementation of our simplistic protocol for
// exchanging event messages during a game

import { Socket } from "socket.io";
import {
    io as IOClient,
    ManagerOptions,
    Socket as ClientSocket,
    SocketOptions
} from "socket.io-client";
import { EventNames } from "socket.io/dist/typed-events";
import { ColorStr } from "./color";
import { Opaque, WithLength } from "./types";

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
    for (const word in s.split("-"))
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
export type TokenAck =
    Ack<{ access: AccessToken, refresh?: RefreshToken }>

/**
 * TODO
 */
export type Ack<Success, Fail = {}> =
    (response: AckResponse<Success, Fail>) => void

/**
 * `Client` to `Server` events
 */
interface C2SEvents {
    connection(socket: Socket): void

    disconnect(reason: DisconnectReason): void

    register(
        payload: { name: Name, color: ColorStr },
        ack: Ack<{ grant: GrantToken }, { reason: RegistrationFailReason }>
    ): void

    authenticate(grant: GrantToken, ack: TokenAck): void

    refresh(token: RefreshToken, ack: TokenAck): void

    chatMessage(payload: { token: AccessToken, msg: string }): void
}

/**
 * `Server` to `Client` events
 */
interface S2CEvents {
    broadcastMessage(
        payload: { name: Name, color: ColorStr, msg: string }
    ): void
}

/**
 * Represents the client end of a bi-directional connection.
 */
export class Client {
    private socket: ClientSocket<S2CEvents, C2SEvents>;

    constructor(
        uri?: string, opts: Partial<ManagerOptions & SocketOptions> = {}
    ) {
        // Forces a new connection to be opened rather than re-using a
        // pre-existing manager
        opts.forceNew = true
        this.socket = (uri === null) ? IOClient(opts) : IOClient(uri, opts)
    }

    send(event: EventNames<C2SEvents>, payload: any) {
        return new Promise((resolve, reject) => {
            this.socket.emit(event, payload,
                (response: any | AckResponse<{}, {}>) => {
                    if (typeof response === "object" && "success" in response) {
                        if (response.success) {
                            resolve(response)
                        } else {
                            reject(response)
                        }
                    } else {
                        reject(`Bad response: ${response}`)
                    }
                }
            )
        })
    }
}

