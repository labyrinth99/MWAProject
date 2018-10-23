var express = require('express');
var jwt = require('jsonwebtoken');
var mailer = require('express-mailer');
var Student = require('../models/student.model');

var router = express.Router();

/* email invite */
router.post('/', function(req, res, next) {

    var mailOptions = {
        to: req.body.email,
        subject: 'Thank you for enrollment',
        user: { // data to view template, you can access as - user.name
            name: req.body.name,
            message: 'Welcome to Student Enrollment goto https://localhost:4200/startexam/ to take your exam'
        }
    };
    console.log(req.body + "working on it");
    req.mailer('email', mailOptions).then(() => console.log("email sent")).catch((err) => next(err));
    res.send("done");
    Student.findOneAndUpdate({ "enrollmentForm.email": req.body.email }, {$set:{status:"invited"}}, (err, doc) => {
        if (err) return next(err);});


});

//send the error

module.exports = router;