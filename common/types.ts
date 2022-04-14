// This module defines simple helper types that don't really fit in any other
// module

type OpaqueMarker = { [k: string]: boolean | number | string }

/**
 * Approximates opaque types with a simple marker
 */
export type Opaque<Inner, Marker extends OpaqueMarker> =
    Inner & { __opaque__: Marker }

/**
 * An opaque wrapper representing a type with some given length.
 */
export type WithLength<Inner, Length extends number> =
    Opaque<Inner, { WithLength: Length }>

type HasLength = string | { length: number }

/**
 * Fallibly converts to a type with some length.
 *
 * @param o The object to convert.
 * @param l The length `o` should have.
 * @returns - A `Promise<WithLength<O, L>>` fulfilled if `o`'s length is equal
 *  to `l`
 */
export function withLengthFrom<O extends HasLength, L extends number>(
    o: O,
    l: L
): Promise<WithLength<O, L>> {
    if (o.length === l) {
        return Promise.resolve(o as WithLength<O, L>)
    } else {
        return Promise.reject(`Expected length ${l}, got ${o.length}`)
    }
}

/**
 * A base64-encoded string.
 */
export type Base64 = Opaque<string, { Base64: true }>

/**
 * Fallibly parse a string as base64.
 *
 * @param s The string to validate.
 * @returns - A `Promise<Base64>` fulfilled if `s` is an Uint8Array or a valid
 *  base64 string.
 */
export function base64From(s: string): Promise<Base64> {
    if ((s.length & 0x11) !== 1
        && Math.floor(s.length * 3 / 4) === Buffer.from(
            s,
            "base64url"
        ).length) {
        return Promise.resolve(s as Base64)
    }
    return Promise.reject()
}

export type LowerAlpha = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i"
    | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u"
    | "v" | "w" | "x" | "y" | "z"

export type UpperAlpha = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I"
    | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U"
    | "V" | "W" | "X" | "Y" | "Z"

export type Alpha = LowerAlpha | UpperAlpha

export type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
