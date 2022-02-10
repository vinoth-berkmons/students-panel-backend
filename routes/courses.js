const services = require('../services');

async function getCourses(req, res) {
    try {
        const courses = await services.courses.getAll();
        res.json({ success: true, data: courses });
    }
    catch (err) {
        console.error(`error fetching courses: ${err}`);
        res.status(500);
        res.json({ success: false, error: err });
    }
}

async function createCourse(req, res) {
    try {
        const course = await services.courses.create(req.body);
        res.json({ success: true, data: course });
    }
    catch (err) {
        console.error(`error creating course: ${err}`);
        res.status(500);
        res.json({ success: false, error: err });
    }
}

function course() {
    return {
        getAll: getCourses,
        create: createCourse,
    }
}

module.exports = course();