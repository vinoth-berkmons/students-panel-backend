const { MAIN_DATABASE, USERS_COLLECTION } = require("../constants");
const db = require("../db");
const { sha512 } = require('../../helpers/crypto');

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