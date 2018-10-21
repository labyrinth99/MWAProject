var express = require('express');
var jwt = require('jsonwebtoken');
var userService = require('../services/userservice');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
});

module.exports = router;