var express = require('express');
var router = express.Router();
const studentService = require('../services/studentService');

/* GET students listing. */
router.get('/:email', function(req, res, next) {
    studentService.getStudentByEmail().then((data) => {
        res.status(200).json(data);
    });    
});

/* Post student. */
router.post('/', function(req, res, next) {
    res.send('new student');
});

module.exports = router;