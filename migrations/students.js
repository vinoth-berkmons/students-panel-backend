const { MAIN_DATABASE, STUDENTS_COLLECTION } = require('../services/constants');

const config = require('../config');
const services = require('../services');

const defaultStudents = [
    {
        id: "98888880", firstName: "Student 1", lastName: "intial", email: "student1@stu.com", mobile: "+919999999999", gender: "male", dob: "1995-05-05", status: "Sophomore", department: "Computer Science", courses: []
    },
    {
        id: "98888881", firstName: "Student 2", lastName: "intial", email: "student2@stu.com", mobile: "+919999999991", gender: "female", dob: "1995-06-05", status: "Sophomore", department: "Computer Science", courses: []
    }
];

async function addUsers() {
    console.log('connected to database');
    try {
        const result = await services.db.client().db(MAIN_DATABASE).collection(STUDENTS_COLLECTION).insertMany(defaultStudents);
        console.log(`${result.insertedCount} students are inserted`);
        process.exit(0);
    } catch (err) {
        console.error(`error inserting default students: ${err}`);
        process.exit(1);
    }
}


config.load();
services.db.connect(config.dbUrl()).then(addUsers).catch(err => {
    console.log(err);
    process.exit(1);
});