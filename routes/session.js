const services = require('../services');


async function login(req, res) {
    try {
        const user = await services.users.checkPassword(req.body.userName, req.body.password);
        const session = await services.sessions.createSession(user.id);
        res.cookie('Authorization', 'Bearer ' + session.sessionId, {
            expires: session.expiry,
        })
        res.json({ success: true, data: user });
    }
    catch (err) {
        console.error(`error logging in: ${err}`);
        res.status(500);
        res.json({ success: false, error: err });
    }
}

async function logout(req, res) {
    try {
        //we are doing it as we know auth middleware is called before this
        const sessionId = req.cookies['Authorization'].split(' ')[1];
        await services.sessions.invalidateSession(sessionId);
        res.clearCookie('Authorization');
        res.json({ success: true });
    }
    catch (err) {
        console.error(`error logging out: ${err}`);
        res.status(500);
        res.json({ success: false, error: err });
    }
}

function session() {
    return {
        login,
        logout,
    }
}

module.exports = session();