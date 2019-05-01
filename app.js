var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var db = require('./models');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api/v1/users');
var sessionsRouter = require('./routes/api/v1/sessions');
var forecastRouter = require('./routes/api/v1/forecast');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/sessions', sessionsRouter);
app.use('/api/v1/forecast', forecastRouter);


db.sequelize.sync().then(function() {
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
});


module.exports = app;
