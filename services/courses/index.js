const ObjectId = require('mongodb').ObjectId;

const { MAIN_DATABASE, COURSES_COLLECTION } = require("../constants");

/**
 * DB 
 */
const db = require("../db");

/**
 * Get courses from DB
 * Map the courses
 * @returns 
 */
async function getCourses() {
    const database = db.client().db(MAIN_DATABASE);
    const coursesCollection = database.collection(COURSES_COLLECTION);
    try {
        const courses = await coursesCollection.find({}).toArray();
        return courses.map(course => ({
            id: course._id,
            name: course.name,
            description: course.description,
            isActive: course.isActive,
            batch: course.batch,
            department: course.department,
            startDate: course.startDate,
            endDate: course.endDate,
        }));
    } catch (err) {
        throw `Error getting courses: ${err}`;
    }
}

/**
 * Get course by Id
 * Map the course
 * @param {*} id 
 * @returns 
 */
async function getCourse(id) {
    const database = db.client().db(MAIN_DATABASE);
    const coursesCollection = database.collection(COURSES_COLLECTION);
    try {
        const course = await coursesCollection.findOne({ _id: ObjectId(id) });
        if (!course) {
            throw `Course with id ${id} not found`;
        }
        return {
            id: course._id,
            name: course.name,
            description: course.description,
            isActive: course.isActive,
            batch: course.batch,
            department: course.department,
            startDate: course.startDate,
            endDate: course.endDate,
        };
    } catch (err) {
        throw `Error getting courses: ${err}`;
    }
}

/**
 * Create Course
 * @param {*} course 
 * @returns 
 */
async function createCourse(course) {
    const database = db.client().db(MAIN_DATABASE);
    const coursesCollection = database.collection(COURSES_COLLECTION);
    try {
        const courseObj = { name: course.name, description: course.description, isActive: true, batch: course.batch, department: course.department, startDate: course.startDate, endDate: course.endDate };
        const result = await coursesCollection.insertOne(courseObj);
        if (!result.insertedId) {
            throw `couldn't create the course`;
        }
        return { ...courseObj, id: result.insertedId };
    } catch (err) {
        throw `Error creating course: ${err}`;
    }
};

/**
 * Exports
 */
module.exports = {
    getAll: getCourses,
    getOne: getCourse,
    create: createCourse,
}