const services = require('../services');

/**
 * Middleware to handle the session
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function checkSession(req, res, next) {
    try {
        const bearer = req.cookies['Authorization'];
        if (!bearer) {
            throw `No session cookie found`;
        }
        const tokenPart = bearer.split(' ');
        if (tokenPart.length !== 2) {
            throw `Invalid session cookie`;
        }
        const sessionId = tokenPart[1];
        await services.sessions.checkSession(sessionId);
        next()
    }
    catch (err) {
        console.error(`session failed: ${err}`);
        res.status(401);
        res.clearCookie('Authorization');
        res.json({ success: false, error: err });
    }
}

module.exports = checkSession;