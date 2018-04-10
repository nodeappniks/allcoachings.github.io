var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sess;
var session = require('express-session');

var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dashboard = require('./routes/dashboard');
var admin = require('./routes/admin');
var coaching = require('./routes/coaching');
var details = require('./routes/details');
var contact = require('./routes/contact');
var rate = require('./routes/rate');
var getRatings = require('./routes/getRatings');
var logout = require('./routes/logout');
var newbatch = require('./routes/newbatch');
var section = require('./routes/section');

var app = express();
app.use(session({ secret: 'keyboard cat'}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dashboard', dashboard);
app.use('/admin', admin);
app.use('/coaching', coaching);
app.use('/details', details);
app.use('/contact', contact);

app.use('/rate', rate);
app.use('/getRatings', getRatings);
app.use('/logout', logout);
app.use('/newbatch', newbatch);
app.use('/section', section);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
