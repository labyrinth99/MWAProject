const StudentModel = require('../models/student.model');
const service = class Service{};

service.saveStudent = function(student){  
    const query = { email: student.email };
    return StudentModel.findOneAndUpdate(query, student, {upsert:false});    
}

service.getStudentByEmail = function(sudentEmail){  
    const query = { "enrollmentForm.email": sudentEmail };
    console.log('student.email');
    console.log(sudentEmail);
    return StudentModel.findOne(query);    
}

service.saveSnapshots = function(student){  
    const query = { email: student.email };
    return StudentModel.findOne(query).exec().then((dbStudent) => {
        console.log('dbStudent.snapshots ---------------');
        console.log(dbStudent);
        
        //generate the IDs
        if(dbStudent.snapshots[0].frameId)
            var last = dbStudent.snapshots[0].frameId;
        else 
            var last = 0;
        var i = 0;
        for (let s of student.snapshots) {
            console.log('snapshots -----------------------');
            console.log(s);
            if(s.frameId === undefined) s.frameId = 0;
            else s.frameId++;
            console.log('student.snapshots[i] -----------------------');
            console.log(student.snapshots[i]);
            student.snapshots[i] = Object.assign(student.snapshots[i], {frameId: last}),
            i++;
        }
        console.log('before save');
        console.log(email);
        service.saveStudent(student);
                
    }); 




    return StudentModel.findOneAndUpdate(query, student, {upsert:false});    
}


module.exports = service;