const StudentModel = require('../models/student.model');
const service = class Service{};

service.saveStudent = function(student){  
    const query = { "enrollmentForm.email": student.enrollmentForm.email };
    return StudentModel.findOneAndUpdate(query, student, {upsert:false}).exec();    
}

service.getStudentByEmail = function(sudentEmail){  
    const query = { "enrollmentForm.email": sudentEmail };
    return StudentModel.findOne(query);    
}

service.saveSnapshots = function(student){ 
    var mySudent = student; // I need this to be local to the method
    const query = { "enrollmentForm.email": student.enrollmentForm.email };
    return StudentModel.findOne(query).exec().then((dbStudent) => {


        var frameID = 1;        
        var i = 1;        
        for (let s of mySudent.snapshots) {
            mySudent.snapshots[i - 1].frameId = frameID;
            if(i % 3 === 0) frameID++;      
            i++;

        }
        console.log('before save');
        service.saveStudent(mySudent);
        console.log('saved');                
    }); 

}


module.exports = service;