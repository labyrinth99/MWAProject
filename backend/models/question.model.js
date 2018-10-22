const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
    text: String,
    Status: String
});

module.exports = mongoose.model('Exam', QuestionSchema);