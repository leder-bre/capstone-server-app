var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

//Work in progress for reading data from arduino from usb serial port, requires "serialport" module from npm
//This seems to read data live from the arduino port(ie. reads what the arduino sends out based on set rate)
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var portName = process.argv[2]; //This requires you to input port on command line so prob need to change it, need to know the comport and replace the process.argv[2] line
Var myPort = new SerialPort(portName, {baudrate:9600, parser:serialport.parsers.readline("\r\n")});

myPort.on('data', receiveData); //Right now printing out on command line
function receiveData(data){
  console.log(data);
}
