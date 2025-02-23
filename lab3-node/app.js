var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const morgan = require('morgan');
const { getEmployees } = require('./helpers/fileInput')

var employeeRouter = require("./routes/employee");

var app = express();


// view engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


// app.use(logger("dev")); //i can use morgan
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan('dev'));


app.use("/employees", employeeRouter);
app.get('/', (req, res) => {
  const employees = getEmployees();
  res.render('index', { employees });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
