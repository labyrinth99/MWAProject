var express = require('express');
var router = express.Router();

/* GET students listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* Post student. */
router.post('/', function(req, res, next) {
    res.send('new student');
});

module.exports = router;