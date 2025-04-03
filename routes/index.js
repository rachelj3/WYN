
var express = require('express');
var router = express.Router();
const User = require('../models/User');
const sequelize = require('../db');
const bcrypt = require('bcrypt');


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Getting index!!");
  res.render('index', { title: 'Express' });
});

router.get('*.ejs', function(req, res, next) {
  console.log("getting ejs");
  // splitPath = ;
  // filename = req.path.split("/")[-1];
  // console.log(splitPath);
  console.log(req.path.split("/").at(-1));
  res.render(req.path.split("/").at(-1));
});

router.post('/login', async function(req, res, next) {
  console.log("getting login");

  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) { //User not found
    return res.render('login', { message: 'User not found' });
  } 

  const match = await bcrypt.compare(req.body.pwd, user.password);

  if(!match) { //password is wrong
    return res.render('login', { message: 'Password is incorrect' });
  }
  else { //password is correct
    req.session.user = {
      email: user.email,
      username: user.username,
    };
    return res.redirect('/profile');
  } 

});


router.get('/login', function(req, res, next) {
  console.log("getting login");
  res.render('login', { title: 'Express' });
});

router.get('/profile', function(req, res, next) {
  console.log("getting profile");
  console.log(req.session.user)
  res.render('profile', { user: req.session.user });
});


module.exports = router;
