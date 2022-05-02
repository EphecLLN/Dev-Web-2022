const {saltHashPassword, login} = require("../../server/hash")

describe("server/hash::saltHashPassword test suite", () => {
  test("low-entropy password high-entropy hash", () => {
    expect(Buffer.compare(
      saltHashPassword("").passwordHash,
      saltHashPassword("").passwordHash,
    )).not.toBe(0)
  })
  test("hash size", () => {
    expect(saltHashPassword("nyoom").passwordHash).toHaveLength(64)
  })
})

describe("server/hash::login test suite", () => {
  const password = "password"
  const wrong = "oopsy"
  test("wrong pass & wrong", () => {
    const hash = saltHashPassword(password)
    expect(login(wrong, hash.salt + wrong, hash.passwordHash)).not.toBe(true)
  })
  test("wrong pass & matching salt", () => {
    const hash = saltHashPassword(password)
    expect(login(wrong, hash.salt, hash.passwordHash)).not.toBe(true)
  })
  test("matching pass & wrong salt", () => {
    const hash = saltHashPassword(password)
    expect(login(password, hash.salt + wrong, hash.passwordHash)).not.toBe(true)
  })
  test("matching pass & matching salt", () => {
    const hash = saltHashPassword(password)
    expect(login(password, hash.salt, hash.passwordHash)).toBe(true)
  })
})
