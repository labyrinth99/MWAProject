var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authenRouter = require('./routes/authenticate');
var checkemailRouter = require('./routes/checkemail');
var questionsRouter = require('./routes/questions');
var studentsRouter = require('./routes/students');
var jwt = require('./services/jwt');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(jwt());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/authenticate', authenRouter);
app.use('/checkemail', checkemailRouter);
app.use('/questions', questionsRouter);
app.use('/students', studentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.listen('3000');
module.exports = app;