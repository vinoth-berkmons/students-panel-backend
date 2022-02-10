const { MAIN_DATABASE, COURSES_COLLECTION } = require('../services/constants');

const config = require('../config');
const services = require('../services');

const defaultCourses = [
    { name: "Course 1", description: "Course 1 description", isActive: true, batch: "Sophmore", department: "Computer Science", startDate: "2022-01-31", endDate: "2022-06-31" },
    { name: "Course 2", description: "Course 2 description", isActive: true, batch: "Junior", department: "Computer Science", startDate: "2022-01-31", endDate: "2022-06-31" },
    { name: "Course 3", description: "Course 3 description", isActive: true, batch: "Senior", department: "Computer Science", startDate: "2022-01-31", endDate: "2022-06-31" },
    { name: "Course 4", description: "Course 4 description", isActive: true, batch: "Freshmen", department: "Computer Science", startDate: "2022-01-31", endDate: "2022-06-31" },
];

async function addCourses() {
    console.log('connected to database');
    try {
        const result = await services.db.client().db(MAIN_DATABASE).collection(COURSES_COLLECTION).insertMany(defaultCourses);
        console.log(`${result.insertedCount} courses are inserted`);
        process.exit(0);
    } catch (err) {
        console.error(`error inserting default courses: ${err}`);
        process.exit(1);
    }
}


config.load();
services.db.connect(config.dbUrl()).then(addCourses).catch(err => {
    console.log(err);
    process.exit(1);
});