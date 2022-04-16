// This really needs to be in DB
class AuthManager {
  #config = {
    guestUsers: true,
    grantTokenLength: 16,
    accessTokenLength: 16,
    refreshTokenLength: 16,
    grantExpireIn: 30,
    accessExpireIn: 5 * 60,
    refreshExpireIn: 60 * 60,
  }

  #users = {}
  #grants = {}
  #accesses = {}
  #refreshes = {}

  constructor (opts) {
    this.#config = Object.assign(this.#config, opts)
  }

  getGrant (userId, name) {
    const now = Math.floor(new Date().getTime() / 1000)
    this.#grants[name] = (this.#grants[name] ?? []).filter(
      ({ time }) => time > now,
    )
    if (
      !this.#config.guestUsers && !Object.values(this.#users).includes(name)
    ) {
      return {
        success: false,
        reason: "user not found",
      }
    }
    if (
      this.#config.concurrentLogin && (this.#grants[name]?.length ?? 0) > 0
    ) {
      return {
        success: false,
        reason: "already registered",
      }
    }
    if (
      this.#config.multipleLogin && (this.#accesses[name]?.length ?? 0) > 0
    ) {
      return {
        success: false,
        reason: "already registered",
      }
    }
    try {
      const grant = {
        grant: this.generateToken(this.#config.grantTokenLength),
        time: now + this.#config.grantExpireIn,
      }
      this.#grants[name].push(grant)
      this.#users[userId] = name
      return {
        success: true,
        grant,
      }
    } catch (e) {
      return {
        success: false,
        reason: `fatal: ${e}`,
      }
    }
  }

  getTokens (userId, grant) {
    const name = this.#users[userId]
    const now = Math.floor(new Date().getTime() / 1000)
    const i = this.#grants[name]?.findIndex(
      (grt) => grt.grant === grant && grt.time > now,
    ) ?? -1
    if (i < 0) {
      return { success: false }
    }
    this.#grants[name].splice(i, 1)
    return this.generateTokenPair(userId, now)
  }

  refreshTokens (userId, refresh) {
    const now = Math.floor(new Date().getTime() / 1000)
    const {
      token,
      time,
    } = this.#refreshes[userId] ?? {
      token: "",
      time: 0,
    }
    if (token === refresh && time > now) {
      return this.generateTokenPair(userId, now)
    }
    return { success: false }
  }

  validateAccess (userId, access) {
    const now = Math.floor(new Date().getTime() / 1000)
    return (this.#accesses[userId] ?? []).findIndex(({
      token,
      time,
    }) => token === access && time > now) >= 0
  }

  purge (userId) {
    delete this.#users[userId]
    delete this.#accesses[userId]
    delete this.#refreshes[userId]
  }

  generateTokenPair (userId, now) {
    try {
      if (!(userId in this.#accesses)) {
        this.#accesses[userId] = []
      }
      const access = {
        token: this.generateToken(this.#config.accessTokenLength),
        time: now + this.#config.accessExpireIn,
      }
      this.#accesses[userId].push(access)
      const refresh = {
        token: this.generateToken(this.#config.refreshTokenLength),
        time: now + this.#config.refreshExpireIn,
      }
      this.#refreshes[userId] = refresh
      return {
        success: true,
        access,
        refresh,
      }
    } catch (e) {
      return {
        success: false,
        reason: `fatal: ${e}`,
      }
    }
  }

  generateToken (length) {
    // FIXME: as insecure and predictable as it can get
    const buf = Buffer.alloc(Math.ceil(length * 3 / 4))
    let off = 0
    let b64Len = 0
    while (b64Len < length) {
      buf.writeFloatLE(Math.random(), off)
      off += 4
      b64Len += 4 * 4 / 3
    }
    return buf.toString("base64url").slice(-length)
  }
}

module.exports = { AuthManager }
