const { MAIN_DATABASE, USERS_COLLECTION } = require("../constants");

/**
 * DB
 */
const db = require("../db");

/**
 * Hash function for more security
 */
const { sha512 } = require('../../helpers/crypto');

/**
 * Check Password
 * @param {*} userName 
 * @param {*} password 
 * @returns 
 */
async function checkPassword(userName, password) {
    const database = db.client().db(MAIN_DATABASE);
    const userCollection = database.collection(USERS_COLLECTION);
    try {
        const user = await userCollection.findOne({ username: userName, password: sha512(password).hash });
        if (!user) {
            throw `User with the given username, password combination doesn't exist`;
        }
        return { userId: user._id, userName: user.username, role: user.role };
    } catch (err) {
        throw `Error checking password: ${err}`;
    }
};

module.exports = {
    checkPassword,
}