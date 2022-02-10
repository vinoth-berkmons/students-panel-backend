var uuid = require('uuid');

const { MAIN_DATABASE, SESSION_COLLECTION } = require("../constants");
const db = require("../db");
const { sha512 } = require('../../helpers/crypto');

async function checkSession(sessionId) {
    const database = db.client().db(MAIN_DATABASE);
    const sessionsCollection = database.collection(SESSION_COLLECTION);
    try {
        const user = await sessionsCollection.findOne({ sessionId: sha512(sessionId).hash, expires: { $gt: new Date() } });
        if (!user) {
            throw `User with the given session id doesn't exist`;
        }
        return user;
    } catch (err) {
        throw `Error checking session: ${err}`;
    }
};

async function invalidateSession(sessionId) {
    const database = db.client().db(MAIN_DATABASE);
    const sessionsCollection = database.collection(SESSION_COLLECTION);
    try {
        const hash = sha512(sessionId).hash;
        const result = await sessionsCollection.updateOne({ sessionId: hash }, { $set: { sessionId: `${hash}_invalid` } });
        if (!result.modifiedCount) {
            throw `couldn't invalidate the session for sessionId ${sessionId}`;
        }
        return true;
    } catch (err) {
        throw `Error invalidating session: ${err}`;
    }
}

async function createSession(userId) {
    const database = db.client().db(MAIN_DATABASE);
    const sessionsCollection = database.collection(SESSION_COLLECTION);
    const sessionId = uuid.v4();
    try {
        const expiry = new Date(Date.now() + 8 * 3600000) // will be removed after 8hrs
        const result = await sessionsCollection.insertOne({ userId: userId, sessionId: sha512(sessionId).hash, expires: expiry });
        if (!result.insertedId) {
            throw `couldn't create the user session for userId ${userId}`;
        }
        return { userId: userId, sessionId: sessionId, expiry };
    } catch (err) {
        throw `Error creating session: ${err}`;
    }
};

module.exports = {
    checkSession,
    createSession,
    invalidateSession,
}