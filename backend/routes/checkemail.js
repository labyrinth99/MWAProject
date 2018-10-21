var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    if (req.body.email == "amer.malas@gmail.com") {
        res.send({ 'invalid': true });
    } else {
        res.send(null);
    }
});

module.exports = router;