var express = require('express');
var router = express.Router();
var Student = require('../models/student.model');
var JSONStream = require('JSONStream');

/* GET students listing. */
router.get('/', function(req, res, next) {
    Student.find({}).cursor().pipe(JSONStream.stringify()).pipe(res.type('json'));
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

/* Get Student by Email */
router.get('/:email', function(req, res, next) {
    Student.findOne(req.params.email, (err, doc) => {
        if (err) return next(err);
        res.send(doc);
    });
});

module.exports = router;