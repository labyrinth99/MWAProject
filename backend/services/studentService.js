const StudentModel = require('../models/student.model');
const service = class Service{};

service.saveStudent = function(student){  
    const query = { email: student.email };
    return StudentModel.findOneAndUpdate(query, student, {upsert:false});    
}

service.getStudentByEmail = function(email){  
    const query = { email: email };
    console.log('student.email');
    console.log(email);
    return StudentModel.findOne(query);    
}


module.exports = service;