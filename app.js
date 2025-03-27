var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sequelize = require('./db');
const User = require('./models/User');
const Post = require('./models/Post');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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

async function setup() {
  const rachel = await User.create({email: "racheljones@gmail.com", password: "1234", username: "rachelj3", ccNum: "1234567890", ccExDate: "03032003", ccCVV: "123"})
  const babysitting = await Post.create({description: "I'll look after kids under 5 years old", imageURL: "baby.jpeg", title: "Rachel will babysit!", price: "14.50", location: "Redmond, WA", postingUser: "rachelj3"})
  console.log("rachel instance created")
  console.log("babysitting instance created")
}

sequelize.sync({ force: true }).then(()=>{
  console.log("sequelize sync completed");
  setup().then(()=> console.log("initial db insert complete"))
})

module.exports = app;
