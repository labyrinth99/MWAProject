const mongoose = require('mongoose');

console.log('inside the student model');

const StudentSchema = mongoose.Schema({
    status: String,
    enrollmentDate: { type: Date, default: Date.now },
    enrollmentForm: {name: String ,email:String},
    examQuestions: [],
    monitoring: [],
    snapshots: [],
    grading: [],
    resultsSent: false
});


module.exports = mongoose.model('Student', StudentSchema);