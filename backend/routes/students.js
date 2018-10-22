var express = require('express');
var router = express.Router();
var Student = require('../models/user.model');
var JSONStream = require('JSONStream');

/* GET students listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


/* Insert a student */
router.post('/', function(req, res, next) {
    student = new Student(req.body);
    student.save((err) => {
        if (err) return next(err);
        res.send({ message: "student:" + req.body.enrollmentForm.name + " is saved" });
    });
});

module.exports = router;