var express = require('express');
var JSONStream = require('JSONstream');
var router = express.Router();
var Question = require('../models/question.model');

router.get('/:id', function(req, res, next) {
    Question.findById(req.params.id, (err, doc) => {
        if (err) return next(err);
        res.send(doc);
    });
});
router.get('/', function(req, res, next) {
    Question.find({}).cursor().pipe(JSONStream.stringify()).pipe(res.type('json'));
});
router.put('/:id', function(req, res, next) {
    const { _id, ...questionWithoutID } = req.body;
    Question.findOneAndUpdate({ _id: req.params.id }, questionWithoutID, (err, doc) => {
        if (err) return next(err);
        res.send({ message: "Question is updated" });
    });
});
router.post('/', function(req, res, next) {
    const { id, ...questionWithoutID } = req.body;
    question = new Question(questionWithoutID);
    question.save((err) => {
        if (err) return next(err);
        res.send({ message: "Question is saved" });
    });
});
router.delete('/:id', function(req, res, next) {
    Question.deleteOne({ _id: req.params.id }, (err) => {
        if (err) return next(err);
        res.send({ message: "Question is deleted" });
    });
});

module.exports = router;