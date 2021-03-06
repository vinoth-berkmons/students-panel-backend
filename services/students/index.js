const ObjectId = require('mongodb').ObjectId;

const { MAIN_DATABASE, STUDENTS_COLLECTION } = require("../constants");

/**
 * DB
 */
const db = require("../db");

/**
 * Get students list by pagination
 * Map the students from DB
 * @param {*} pageSize 
 * @param {*} pageNumber 
 * @returns 
 */
async function getStudents(pageSize, pageNumber) {
    const database = db.client().db(MAIN_DATABASE);
    const studentsCollection = database.collection(STUDENTS_COLLECTION);
    try {
        const students = await studentsCollection.find({}).skip(pageSize * (pageNumber - 1)).limit(pageSize).toArray();
        const totalCount = await studentsCollection.count();
        return {
            students: students.map(student => ({
                id: student._id,
                firstName: student.firstName,
                lastName: student.lastName,
                email: student.email,
                mobile: student.mobile,
                gender: student.gender,
                dob: student.dob,
                status: student.status,
                department: student.department,
                courses: student.courses,
            })),
            totalCount,
        };
    } catch (err) {
        throw `Error getting students: ${err}`;
    }
}

/**
 * Get student by Id
 * map the student data from DB
 * @param {*} id 
 * @returns 
 */
async function getStudent(id) {
    const database = db.client().db(MAIN_DATABASE);
    const studentsCollection = database.collection(STUDENTS_COLLECTION);
    try {
        const student = await studentsCollection.findOne({ _id: ObjectId(id) });
        if (!student) {
            throw `Student with id ${id} not found`;
        }
        return {
            id: student._id,
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            mobile: student.mobile,
            gender: student.gender,
            dob: student.dob,
            status: student.status,
            department: student.department,
            courses: student.courses,
        };
    } catch (err) {
        throw `Error getting students: ${err}`;
    }
};

/**
 * Add course to the student course
 * @param {*} student 
 * @param {*} courseId 
 * @param {*} name 
 * @returns 
 */
async function addCourse(student, courseId, name) {
    const database = db.client().db(MAIN_DATABASE);
    const studentsCollection = database.collection(STUDENTS_COLLECTION);
    try {

        student.courses = [...student.courses, { id: courseId, name }];
        const result = await studentsCollection.updateOne({ _id: ObjectId(student.id) }, { $set: { courses: student.courses } });
        if (result.modifiedCount === 0) {
            throw `Couldn't add course to student with id ${student.id}`;
        }
        return student;
    } catch (err) {
        throw `Error getting students: ${err}`;
    }
};

/**
 * Remove the course from the student list course
 * @param {*} student 
 * @param {*} courseId 
 * @returns 
 */
async function removeCourse(student, courseId) {
    const database = db.client().db(MAIN_DATABASE);
    const studentsCollection = database.collection(STUDENTS_COLLECTION);
    try {

        student.courses = student.courses.filter(c => c.id != courseId);
        const result = await studentsCollection.updateOne({ _id: ObjectId(student.id) }, { $set: { courses: student.courses } });
        if (result.modifiedCount === 0) {
            throw `Couldn't remove course to student with id ${student.id}`;
        }
        return student;
    } catch (err) {
        throw `Error removing courses: ${err}`;
    }
};

/**
 * Exports
 */
module.exports = {
    getAll: getStudents,
    getOne: getStudent,
    addCourse: addCourse,
    removeCourse: removeCourse
}