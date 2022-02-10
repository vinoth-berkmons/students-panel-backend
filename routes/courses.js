const services = require('../services');

/**
 * Get course route
 * returns the list of courses
 * handled only success and failure returns as 500.
 * No other status codes are handled
 * @param {*} req 
 * @param {*} res 
 */
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

/**
 * Create course route
 * create course
 * handled only success and failure returns as 500.
 * No other status codes are handled
 * @param {*} req 
 * @param {*} res 
 */

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

/**
 * Exports
 * @returns 
 */

function course() {
    return {
        getAll: getCourses,
        create: createCourse,
    }
}


module.exports = course();