const services = require('../services');

/**
 * Get Students Route
 * @param {*} req 
 * @param {*} res 
 */
async function getStudents(req, res) {
    try {
        const pageSize = +req.query.pageSize || 10;
        const page = +req.query.page || 1;
        const result = await services.students.getAll(pageSize, page);
        res.json({ success: true, data: { students: result.students, hasNextPage: page * pageSize < result.totalCount, totalCount: result.totalCount } });
    }
    catch (err) {
        console.error(`error fetching students: ${err}`);
        res.status(500);
        res.json({ success: false, error: err });
    }
}

/**
 * Get student by Id Route
 * @param {*} req 
 * @param {*} res 
 */
async function getStudent(req, res) {
    try {
        const student = await services.students.getOne(req.params.id);
        res.json({ success: true, data: student });
    }
    catch (err) {
        console.error(`error fetching student: ${err}`);
        res.status(500);
        res.json({ success: false, error: err });
    }
}

/**
 * Add course to the student courses Route
 * @param {*} req 
 * @param {*} res 
 */
async function enrollToCourse(req, res) {
    try {
        const student = await services.students.getOne(req.body.studentId);
        const course = await services.courses.getOne(req.body.courseId);
        const isCourseFound = student.courses.find(c => c.id.toString() === req.body.courseId);
        console.log(student.courses)
        console.log(req.body.courseId)
        if (isCourseFound) {
            throw `Student with id ${req.body.studentId} is already enrolled to course with id ${req.body.courseId}`;
        }
        const newStudent = await services.students.addCourse(student, course.id.toString(), course.name);
        res.json({ success: true, data: newStudent });
    }
    catch (err) {
        console.error(`adding course to student: ${err}`);
        res.status(500);
        res.json({ success: false, error: err });
    }
}

/**
 * Remove course from the student course list Route
 * @param {*} req 
 * @param {*} res 
 */
async function removeCourse(req, res) {
    try {
        const student = await services.students.getOne(req.body.studentId);
        const course = await services.courses.getOne(req.body.courseId);
        const isCourseFound = student.courses.find(c => c.id.toString() === req.body.courseId);
        if (!isCourseFound) {
            throw `Student with id ${req.body.studentId} is not enrolled to course with id ${req.body.courseId}`;
        }
        const newStudent = await services.students.removeCourse(student, course.id.toString());
        res.json({ success: true, data: newStudent });
    }
    catch (err) {
        console.error(`adding course to student: ${err}`);
        res.status(500);
        res.json({ success: false, error: err });
    }
}

/**
 * Exports
 * @returns 
 */
function student() {
    return {
        getAll: getStudents,
        getOne: getStudent,
        enrollToCourse: enrollToCourse,
        removeCourse: removeCourse,
    }
}

module.exports = student();