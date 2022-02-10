const { MAIN_DATABASE, USERS_COLLECTION } = require('../services/constants');

const config = require('../config');
const services = require('../services');
const { sha512 } = require('../helpers/crypto');

/**
 * Dummy data to add into the DB
 */

async function addUsers() {
    const defaultUsers = [
        { name: "Admin", username: "admin", password: sha512("admin").hash, role: "admin" },
    ];
    console.log('connected to database');
    try {
        const result = await services.db.client().db(MAIN_DATABASE).collection(USERS_COLLECTION).insertMany(defaultUsers);
        console.log(`${result.insertedCount} users are inserted`);
        process.exit(0);
    } catch (err) {
        console.error(`error inserting default users: ${err}`);
        process.exit(1);
    }
}


config.load();
services.db.connect(config.dbUrl()).then(addUsers).catch(err => {
    console.log(err);
    process.exit(1);
});