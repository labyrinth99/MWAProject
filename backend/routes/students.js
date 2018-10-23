
	var express = require('express');
    var router = express.Router();
    const studentService = require('../services/studentService');
    var Student = require('../models/student.model');
    var JSONStream = require('JSONStream');
    
    /* GET students listing. */
    router.get('/:email', function(req, res, next) {
        const email = req.params.email;
        return studentService.getStudentByEmail(email).then((data) => {
            res.status(200).json(data);
        });    
    });
    
    
    /* Insert a student */
    router.post('/', function(req, res, next) {
        console.log(req.body);
        student = new Student(req.body);
        student.save((err) => {
            if (err) return next(err);
            res.send({ message: "student:" + req.body.enrollmentForm.name + " is saved" });
        });
    });
    
    module.exports = router;