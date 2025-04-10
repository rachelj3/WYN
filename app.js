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
  res.locals.sessionUser = req.session.sessionUser || null;
  next();
});


app.get('/aboutUs', (req, res) => {
  res.render('aboutUs');  // Render the aboutUs.ejs file
});
app.use('/', indexRouter);
app.use('/signup', usersRouter);
app.use('/createPost', postsRouter); //change this
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

// async function setup() {
//   const rachel = await User.create({email: "racheljones@gmail.com", password: "1234", username: "rachelj3", ccNum: "1234567890", ccExDate: "03032003", ccCVV: "123"})
//   const babysitting = await Post.create({description: "I'll look after kids under 5 years old", imageURL: "baby.jpeg", title: "Rachel will babysit!", price: "14.50", location: "Redmond, WA", postingUser: "rachelj3"})

//   console.log("rachel instance created")
//   console.log("babysitting instance created")
// }

shouldSyncDatabase = false;

if(shouldSyncDatabase){
  (async () => {
    try {
      await user_db.sync({ force: true }); 
      await post_db.sync({ force: true });

      console.log('Databases synced successfully');

      await User.create({ 
        email: "admin@gmail.com", 
        password: await bcrypt.hash("admin1234", 10), 
        username: "admin", 
        ccNum: "NULL", 
        ccExDate: "NULL", 
        ccCVV: "NULL"
      });
      await User.create({
        id: 120,
        email: "racheljones@gmail.com", 
        password: await bcrypt.hash("rachel", 10), 
        username: "rachelj3", 
        ccNum: "1234567890", 
        ccExDate: "03032003", 
        ccCVV: "1234"
      });
      await User.create({
        id: 110,
        email: "example@email.com", 
        password: await bcrypt.hash("password1", 10), 
        username: "Mr. Example", 
        ccNum: "1234567890", 
        ccExDate: "03032003", 
        ccCVV: "1234"
      });
      await User.create({
        id: 121,
        email: "gregLawnMow@hotmail.com", 
        password: await bcrypt.hash("password1", 10), 
        username: "Greg", 
        ccNum: "1234567890", 
        ccExDate: "03032003", 
        ccCVV: "1234"
      });
      await User.create({
        id: 122,
        email: "cindyl@outlook.com", 
        password: await bcrypt.hash("password1", 10), 
        username: "cindyl", 
        ccNum: "1234567890", 
        ccExDate: "03032003", 
        ccCVV: "1234"
      });
      await User.create({
        id: 123,
        email: "shawnT@gmail.com", 
        password: await bcrypt.hash("password1", 10), 
        username: "shawnT", 
        ccNum: "1234567890", 
        ccExDate: "03032003", 
        ccCVV: "1234"
      });
      await User.create({
        email: "dannyMench@gmail.com", 
        password: await bcrypt.hash("password1", 10), 
        username: "Danny", 
        ccNum: "1234567890", 
        ccExDate: "03032003", 
        ccCVV: "1234"
      });
      await User.create({
        email: "publicData@email.com", 
        password: await bcrypt.hash("password1", 10), 
        username: "My data is public", 
        ccNum: "1234567890", 
        ccExDate: "03032003", 
        ccCVV: "1234",
        description: "I've got all my information public, for the sake of illustration",
        publicEmail: true,
        phoneNumer: "123-123-1234",
        publicPhone: true,
        city: "PublicCity",
        country: "USA",
        publicLocation: true,
      });
      await User.create({
        email: "davy@hotmail.com", 
        password: await bcrypt.hash("password1", 10), 
        username: "Davy Jones", 
        ccNum: "1234567890", 
        ccExDate: "03032003", 
        ccCVV: "1234",
        description: "I've got all my information private, for the sake of illustration",
        phoneNumer: "123-123-1234",
        city: "PrivateCity",
        country: "USA",
      });
      await User.create({
        id: 500,
        email: "ChloesArtCorner@hotmail.com", 
        password: await bcrypt.hash("password1", 10), 
        username: "Chloe's Art Corner", 
        ccNum: "1234567890", 
        ccExDate: "03032003", 
        ccCVV: "1234",
        description: "Chloe's Art Corner is a small company that does comissions for portraits, murals, and ",
        publicEmail: true,
      });

      await Post.create({
        description: "I'll look after kids under 5 years old", 
        imageURL: "https://th.bing.com/th/id/R.46cd2489b02c01c47b4bfaf0eaa066e7?rik=HCuSWY9MAcXg0w&pid=ImgRaw&r=0",
        title: "Rachel will babysit!", 
        price: "14.50", 
        location: "Redmond, WA", 
        postingUserId: 120
      })
      await Post.create({
        description: "I'll mow your lawn!",
        imageURL: "https://tse1.mm.bing.net/th/id/OIP.83GQu-t_PMbrjnkqpnKhogHaE8?rs=1&pid=ImgDetMain", 
        title: "Greg will mow your lawn!", 
        price: "25.00", 
        location: "Duval, WA", 
        postingUserId: 121
      });
      await Post.create({
        description: "I'll make you traditional Chinese food",
        imageURL: "https://www.thespruceeats.com/thmb/X6mg_2VBCQQ2X8VrLcPTf8_4ce0=/2733x2050/smart/filters:no_upscale()/chinese-take-out-472927590-57d31fff3df78c5833464e7b.jpg", 
        title: "Traditional Chinese Food", 
        price: "30.00", 
        location: "Federal Way, WA", 
        postingUserId: 122
      });
      await Post.create({
        description: "Let me help you hone your soccer skills",
        imageURL: "https://th.bing.com/th/id/R.93056d635b57e3bfcfac821c7cd48ca8?rik=D7tuifFBLJiM%2fw&pid=ImgRaw&r=0", 
        title: "Soccer Lessons", 
        price: "55.00", 
        location: "Woodinville, WA", 
        postingUserId: 123
      });
      await Post.create({
        description: "I'll paint a portrait of somone! Uses a 16x20\" canvas.",
        imageURL: "https://paintingportraittips.com/wp-content/uploads/2012/05/portrait-of-a-little-girl.jpg", 
        title: "Portrait Painting", 
        price: "55.00", 
        location: "Art City, WA", 
        postingUserId: 500
      });
      await Post.create({
        description: "I'll paint a mural on one of your walls, either inside or out. $40 per square foot",
        imageURL: "https://images.squarespace-cdn.com/content/v1/5995bf96be659416eaa8a4ad/1587444667348-0I2NE4K665YI04JXAM4T/Residential+Home+Mural+Living+Room+Wall+Painting+Muralist+Jasmin+Pannu.jpg",
        title: "Mural Painting", 
        // price: "$40 per square foot", 
        location: "Art City, WA", 
        postingUserId: 500
      });
      await Post.create({
        description: "I'll paint a landscape of your choice. Uses a 16x20\" canvas",
        imageURL: "https://th.bing.com/th/id/OIP.q0QfQvMAfFj_RPS7pHauXwHaFj?w=208&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7", 
        title: "Landscape Painting", 
        price: "70.00", 
        location: "Art City, WA", 
        postingUserId: 500
      });
      await Post.create({
        description: "Price is up to neogiation",
        imageURL: "https://beautifulboundarieslawn.com/wp-content/uploads/2022/07/Hedge-Trimming-Tips-beautiful-boundaries.jpg", 
        title: "Hedge Trimming", 
        location: "Art City, WA", 
        postingUserId: 123
      });

    } catch (error) {
      console.error('Database sync error:', error);
    }
  
  })();
}

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
