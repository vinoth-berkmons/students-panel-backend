const students = require('./students');
const courses = require('./courses');
const db = require('./db');
const users = require('./users');
const sessions = require('./sessions');

module.exports = {
    db,
    students,
    courses,
    users,
    sessions,
}