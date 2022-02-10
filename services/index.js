const students = require('./students');
const courses = require('./courses');
const db = require('./db');
const users = require('./users');
const sessions = require('./sessions');

/**
 * Service index exports
 */
module.exports = {
    db,
    students,
    courses,
    users,
    sessions,
}