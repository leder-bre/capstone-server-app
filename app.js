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

//Work in progress using plotly.js to graph live data
function getData(){
  return data;//Want to return the data received from the serial port, should be just the waterlevel only
}

var layout = {
  title: 'Water Level Measurements',
  xaxis: {
    title: 'Time Elapsed'
  },
  yaxis: {
    title: 'Water Level'
  }
};

var counter = 0;
Plotly.newPlot('myDiv', [{y:[getData()], type:'line'}], layout);

setInterval(function () {
  Plotly.extendTraces("myDiv", { y: [[getData()]] },[0]);
  counter = counter + 1;
  
  if(counter > 60){
    Plotly.relayout('myDiv',{
      xaxis:{range:[counter - 60, counter], title: "Time Elapsed"}
    });
  }
}, 1000);

/*
function getData(){
  return Math.random();
}
var layout = {
  title: "Water Level Measurements",
  xaxis: {
    title: "Time Elapsed"
  },
  yaxis: {
    title: "Water Level"
  }
};
var counter = 0;
Plotly.newPlot('myDiv', [{y:[getData()], type:'line'}], layout);

setInterval(function () {
  Plotly.extendTraces("myDiv", { y: [[getData()]] },[0]);
  counter = counter + 1;
  
  if(counter > 60){
    Plotly.relayout('myDiv',{
      xaxis:{range:[counter - 60, counter], title: "Time Elapsed"}
    });
  }
}, 1000);//its in ms so 1000 is 1 s
*/
