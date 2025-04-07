var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const { user_db, post_db } = require('./db');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcrypt');
const { sequelize } = require('./models/Post');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var servicesRouter = require('./routes/services');
var serviceDetailsRouter = require('./routes/serviceDetails');


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

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});


app.get('/aboutUs', (req, res) => {
  res.render('aboutUs');  // Render the aboutUs.ejs file
});
app.use('/', indexRouter);
app.use('/signup', usersRouter);
app.use('/makePost', postsRouter); //change this
app.use('/serviceListings', servicesRouter);
app.use('/', serviceDetailsRouter);

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
    const hashPass = await bcrypt.hash("admin1234", 10);
    const babysitting = await Post.create({
      description: "I'll look after kids under 5 years old", 
      imageURL: "https://th.bing.com/th/id/R.46cd2489b02c01c47b4bfaf0eaa066e7?rik=HCuSWY9MAcXg0w&pid=ImgRaw&r=0",
      title: "Rachel will babysit!", 
      price: "14.50", 
      location: "Redmond, WA", 
      postingUser: "rachelj3"})
    const lawn = await Post.create({
      description: "I'll mow your lawn!",
      imageURL: "https://tse1.mm.bing.net/th/id/OIP.83GQu-t_PMbrjnkqpnKhogHaE8?rs=1&pid=ImgDetMain", 
      title: "Greg will mow your lawn!", 
      price: "25.00", 
      location: "Duval, WA", 
      postingUser: "gregw"});
    const food = await Post.create({
      description: "I'll make you traditional Chinese food",
      imageURL: "https://www.thespruceeats.com/thmb/X6mg_2VBCQQ2X8VrLcPTf8_4ce0=/2733x2050/smart/filters:no_upscale()/chinese-take-out-472927590-57d31fff3df78c5833464e7b.jpg", 
      title: "Traditional Chinese Food", 
      price: "30.00", 
      location: "Federal Way, WA", 
      postingUser: "cindyl"});
    const soccer = await Post.create({
      description: "Let me help you hone your soccer skills",
      imageURL: "https://th.bing.com/th/id/R.93056d635b57e3bfcfac821c7cd48ca8?rik=D7tuifFBLJiM%2fw&pid=ImgRaw&r=0", 
      title: "Soccer Lessons", 
      price: "55.00", 
      location: "Woodinville, WA", 
      postingUser: "shawnT"});
    await User.create({ 
        email: "admin@gmail.com", 
        password: hashPass, 
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

app.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      limit: 3,
      order: sequelize.literal('RANDOM()')
    });

    res.render('index', { posts });
  } catch (error) {
    console.log('Error fetching posts:', error);
    res.status(500).send('Error occurred while fetching posts');
  }
});




module.exports = app;
