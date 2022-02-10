const student = require('./students');
const course = require('./courses');
const session = require('./session');
const sessionsMiddleWare = require('../middlewares/session');

/**
 * Routes main page
 * All the routes are declared here
 * @param {*} app 
 */
function setRoutes(app) {
  app.get('/students', sessionsMiddleWare, student.getAll);
  app.get('/students/:id', sessionsMiddleWare, student.getOne);
  app.post('/students/addCourse', sessionsMiddleWare, student.enrollToCourse);
  app.post('/students/removeCourse', sessionsMiddleWare, student.removeCourse);
  app.get('/courses', sessionsMiddleWare, course.getAll);
  app.post('/courses', sessionsMiddleWare, course.create);
  app.post('/login', session.login);
  app.post('/logout', session.logout);
}

module.exports.initialize = setRoutes;