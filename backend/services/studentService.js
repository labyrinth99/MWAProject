const StudentModel = require('../models/student.model');
const service = class Service{};

service.saveStudent = function(student){  
    var query = { email: student.email };
    console.log('student.email');
    console.log(student.email);
    return StudentModel.findOneAndUpdate(query, student, {upsert:false});    
}

module.exports = service;