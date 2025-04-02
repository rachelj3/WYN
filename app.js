var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const { user_db, post_db } = require('./db');
const User = require('./models/User');
const Post = require('./models/Post');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'test',
  resave: false,
  saveUninitialized: false,
}));

app.use('/', indexRouter);
app.use('/signup', usersRouter);
app.use('/makePost', postsRouter); //change this

app.use(session({
  secret: 'wsu489',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))


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

(async () => {
  try {
    await user_db.sync({ force: true }); 
    await post_db.sync({ force: true });

    console.log('Databases synced successfully');
    const babysitting = await Post.create({description: "I'll look after kids under 5 years old", imageURL: "baby.jpeg", title: "Rachel will babysit!", price: "14.50", location: "Redmond, WA", postingUser: "rachelj3"})
    await User.create({ 
        email: "admin@gmail.com", 
        password: "admin1234", 
        username: "admin", 
        ccNum: "NULL", 
        ccExDate: "NULL", 
        ccCVV: "NULL"
    });

    console.log("Admin user created");

  } catch (error) {
    console.error('Database sync error:', error);
  }
})();




module.exports = app;
