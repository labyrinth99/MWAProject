const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
    text: String,
    status: String
}, { versionKey: false });

module.exports = mongoose.model('Exam', QuestionSchema);