const QuestionModel = require('../models/question.model');
const service = class Service{};

service.getNewExamQuestion = function(){    
    const sample = QuestionModel.aggregate([{$sample: { size: 3 }}]).exec();
    return sample;
}

module.exports = service;