/**
 * App configuration
 */

const dotenv = require('dotenv');

function loadConfig() {
    dotenv.config();
}
function getPort() {
    return process.env.PORT;
}

function getDbUrl() {
    return process.env.MONGO_URI;
}

function frontendUrl() {
    return process.env.FRONTEND_URL;
}

function sessionSecret() {
    return process.env.SESSION_SECRET;
}

module.exports = {
    load: loadConfig,
    port: getPort,
    dbUrl: getDbUrl,
    frontendUrl: frontendUrl,
    sessionSecret, sessionSecret
};
