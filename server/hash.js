
let crypto = require('crypto');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
let genRandomString = (length) => {
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password
 * @param {string} salt
 */
let sha512 = (password, salt) => {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let value = Buffer.from(hash.digest('binary'),'binary');
    return {
        salt:salt,
        passwordHash:value
    };
};

let saltHashPassword = (userpassword) => {
    let salt = genRandomString(16);
    let passwordData = sha512(userpassword, salt);
    return passwordData;
}

let login = (userpassword, salt, passwordHash) => {
    let passwordData = sha512(userpassword, salt);
    return Buffer.compare(passwordData.passwordHash, passwordHash) == 0;
}


module.exports.saltHashPassword = saltHashPassword;
module.exports.login = login;