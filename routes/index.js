
var express = require('express');
var router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const Post = require('../models/Post');
const { sequelize } = require('../models/Post');

/* GET home page. */
router.get('/', async(req, res)=> {
  console.log("Getting index!!");

  try {
    const posts = await Post.findAll({
      limit: 3,
      order: sequelize.literal('RANDOM()') 
    });
    const users = await User.findAll()

    res.render('index', { posts, users });
  } catch (error) {
    console.log('Error fetching posts:', error);
    res.status(500).send('Error occurred while fetching posts');
  }
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

  if (user.email === "admindash@gmail.com") {
    const users = await User.findAll();
    const services = await Post.findAll();
    return res.render('admin', {users, services})
  }

  if (!user) {
    return res.render('login', { message: 'User not found' });
  } 

  const match = await bcrypt.compare(req.body.pwd, user.password);

  if(!match) { //password is wrong
    return res.render('login', { message: 'Password is incorrect' });
  }
  else { //password is correct
    req.session.sessionUser = {
      email: user.email,
      username: user.username,
      id: user.id
    };
    return res.redirect('/profile/'+encodeURIComponent(user.id));
  } 

});


router.get('/login', function(req, res, next) {
  console.log("getting login");
  res.render('login', { title: 'Express' });
});

router.get('/profile/:id', async function(req, res, next) {
  console.log("getting profile");
  const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        const posts = await Post.findAll({ where: { postingUserId: id } });
        res.render('profile', { user, posts });
    }
    catch (error) {
        console.log('error getting user: ', error);
    }
});

router.get('/profile/:id/edit', async function(req, res, next) {
  const { id } = req.params;

  try{
    const user = await User.findByPk(id);
    if (!user) {
      console.log("User not found");
    }
    res.render("editProfile", { user });
  } catch (error) {
    console.log("Error when getting user for edit: ", error)
  }
})

router.post('/profile/:id/edit', async function(req, res, next) {
  const { id } = req.params;
  try{
    const user = await User.findByPk(id);
    if(!user){
      console.log("User not found");
    }
    await user.update({
      email: req.body.email,
      username: req.body.username,
      phoneNumber: req.body.phoneNumber,
      addressl1: req.body.addressl1
    });
    
    if (req.session.sessionUser && req.session.sessionUser.id == id) {
      req.session.sessionUser.username = req.body.username;
      req.session.sessionUser.email = req.body.email;
    }

    res.redirect(`/profile/${id}`);

  } catch (error) {
    console.error("Error updating user:", error);
  }
});

router.get('/logout', function(req, res, next) {

  req.session.destroy(function(error) {
    if(error) {
      console.log("Error destroying the session")
    }
    res.redirect('/')
  });
});



module.exports = router;
