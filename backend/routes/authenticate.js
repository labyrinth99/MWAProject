var express = require('express');
var jwt = require('jsonwebtoken');
var userService = require('../services/userservice');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {

    /*var mailOptions = {
        to: req.body.username,
        subject: 'Thank you for enrollment',
        user: { // data to view template, you can access as - user.name
            name: 'test',
            message: 'Welcome to Student Enrollment'
        }
    };
    req.mailer('email', mailOptions).then(() => console.log("email sent")).catch((err) => next(err));*/
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
});

module.exports = router;