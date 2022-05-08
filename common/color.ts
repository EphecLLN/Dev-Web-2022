import { Opaque } from "./types"

/**
 * A type-checked tint value, e.g. like the red value in a RGB color.
 *
 * It is guaranteed to be an integer between 0 and 255 both inclusive.
 */
export type Tint = Opaque<number, { Tint: true }>

/**
 * Fallibly converts to a tint.
 *
 * @param n A `number` representing the tint value.
 * @returns - A `Promise<Tint>` fulfilled if `n` is a positive integer less
 *  than or equal to 255.
 */
export function tintFrom(n: NonNullable<number>): Promise<Tint> {
  return new Promise((resolve, reject) => {
    if (!Number.isInteger(n)) {
      reject(`${n} is not an integer`)
    } else if (n < 0) {
      reject(`${n} is not greater than or equal to zero`)
    } else if (n > 255) {
      reject(`${n} is not less than or equal to 255`)
    } else {
      resolve(n as Tint)
    }
  })
}

/**
 * A type-checked 24-bits RGB color value
 */
export class Color {
  static GREY = new Color(79 as Tint, 79 as Tint, 79 as Tint)
  static GREEN = new Color(20 as Tint, 133 as Tint, 79 as Tint)

  private r: Tint
  private g: Tint
  private b: Tint

  private constructor(r: Tint, g: Tint, b: Tint) {
    this.r = r
    this.g = g
    this.b = b
  }

  /**
     * Fallibly create a new `Color`.
     *
     * @param r The red `Tint` value
     * @param g The green `Tint` value
     * @param b The blue `Tint` value
     *
     * @returns - A `Promise<Color>` fulfilled if all numbers are convertible
     *  to `Tint`s.
     */
  static new(
    r: number,
    g: number,
    b: number,
  ): Promise<Color> {
    return new Promise((resolve, reject) => {
      tintFrom(r).then(
        r => tintFrom(g).then(g => {
          return { r, g }
        }),
        (reason: string) => reject(`invalid red component: ${reason}`)
      ).then(
        color => tintFrom(b).then(b => {
          return { b, ...color }
        }),
        (reason: string) => reject(`invalid green component: ${reason}`)
      )
        .then(
          (color: { r: Tint, g: Tint, b: Tint }) => resolve(new Color(
            color.r,
            color.g,
            color.b
          )),
          (reason: string) => reject(
            `invalid blue component: ${reason}`
          )
        )
    })
  }

  toString(): ColorStr {
    let r2 = Number(this.r).toString(16)
    if (this.r < 16) {
      r2 = `0${r2}`
    }
    let g2 = Number(this.g).toString(16)
    if (this.g < 16) {
      g2 = `0${g2}`
    }
    let b2 = Number(this.b).toString(16)
    if (this.b < 16) {
      b2 = `0${b2}`
    }
    return `#${r2}${g2}${b2}` as ColorStr
  }
}

export type ColorStr = Opaque<string, { ColorStr: true }>
