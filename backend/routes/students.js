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
    Student.findOne({"enrollmentForm.email":req.params.email}, (err, doc) => {
        if (err){ 
            console.log("email get");
        return next(err);}
        res.send(doc);
    });
});
/* Get Student by status */
router.get('/find/:status', function(req, res, next) {
    Student.find({status:req.params.status}).cursor().pipe(JSONStream.stringify()).pipe(res.type('json'));
    console.log("status");
});
/* Get Student by condition */
router.get('/enrolled/:condition', function(req, res, next) {
    Student.find({status:req.params.condition}).cursor().pipe(JSONStream.stringify()).pipe(res.type('json'));
    console.log("enrolled");
});

module.exports = router;