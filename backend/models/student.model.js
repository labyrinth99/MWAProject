const mongoose = require('mongoose');

console.log('inside the student model');

const StudentSchema = mongoose.Schema({
    status: String,
    enrollmentDate: { type: Date, default: Date.now },
    enrollmentForm: [] ,
    examQuestions: [],
    monitoring: [],
    snapshots: [],
    grading: [],
    resultsSent: boolean
});


module.exports = mongoose.model('Student', StudentSchema);