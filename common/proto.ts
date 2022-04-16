// This module defines the implementation of our simplistic protocol for
// exchanging event messages during a game

import {io as IOClient,
    ManagerOptions,
    Socket as ClientSocket,
    SocketOptions} from "socket.io-client"
import { Color } from "./color"
import { Opaque } from "./types"

/**
 * Protocol version
 */
export const VERSION = { MAJOR: 0, MINOR: 1 }

/**
 * A more restrictive string representing the name of some entity.
 *
 * The string must be composed of ascii letters or digits, with hyphens allowed
 * between 2
 */
export type Name = Opaque<string, "Name">

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

/**
 * Represents a player in message payloads.
 */
export type Player = { name: Name, color: Color }

/**
 * `Client` to `Server` events
 */
interface C2SEvents {
    chatMessage(
        player: Player | null,
        message: string,
        ack: (p: Player | null) => void
    ): void
}

/**
 * `Server` to `Client` events
 */
interface S2CEvents {
    chatMessage(
        // TODO: Allow server-side to use typescript (group-decision)
        player: { name: Name, color: string },
        message: string,
    ): void
}

/**
 * Represents the client end of a bi-directional connection.
 */
export class Client {
    private socket: ClientSocket<S2CEvents, C2SEvents>

    constructor(uri?: string, opt?: Partial<ManagerOptions & SocketOptions>) {
        const opts = opt ?? {}
        // Forces a new connection to be opened rather than re-using a
        // pre-existing manager
        opts.forceNew = true
        this.socket = (uri === undefined) ? IOClient(opts) : IOClient(uri, opts)
    }

    sendChat(
        player: Player | null,
        message: string,
    ): Promise<Player> {
        return new Promise((resolve, reject) => {
            this.socket.emit("chatMessage", player, message, p => {
                if (p === null) {
                    reject("Server could not assign a new player")
                } else {
                    resolve(p)
                }
            })
        })
    }
}

