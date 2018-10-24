const StudentModel = require('../models/student.model');
const service = class Service{};

service.saveStudent = function(student){  
    const query = { "enrollmentForm.email": student.enrollmentForm.email };
    return StudentModel.findOneAndUpdate(query, student, {upsert:false}).exec();    
}

service.getStudentByEmail = function(sudentEmail){  
    const query = { "enrollmentForm.email": sudentEmail };
    console.log('student.email');
    console.log(sudentEmail);
    return StudentModel.findOne(query);    
}

service.saveSnapshots = function(student){ 
    console.log('const query = { email: student.email }; ---------------');
    console.log(student.enrollmentForm.email);

    var mySudent = student; // I need this to be local to the method
    const query = { "enrollmentForm.email": student.enrollmentForm.email };
    return StudentModel.findOne(query).exec().then((dbStudent) => {
        console.log('dbStudent.snapshots.size() ---------------');
        console.log(dbStudent);

        var frameID = 1;        
        var i = 1;

        console.log(' mySudent.snapshots -----------------------');

        console.log(' mySudent.snapshots -----------------------');
        console.log(' mySudent.snapshots -----------------------');
        console.log(' mySudent.snapshots -----------------------');
        console.log(' mySudent.snapshots -----------------------');
            console.log( mySudent.snapshots);
        
        for (let s of mySudent.snapshots) {
            mySudent.snapshots[i - 1].frameId = frameID;
            if(i % 3 === 0) frameID++;      
            i++;

            console.log('snapshots -----------------------');
            console.log(s);
        }
        console.log('before save');
        service.saveStudent(mySudent);
        console.log('saved');                
    }); 




    return StudentModel.findOneAndUpdate(query, student, {upsert:false});    
}


module.exports = service;