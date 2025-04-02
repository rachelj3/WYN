const bcrypt = require('bcrypt');

var express = require('express');
var router = express.Router();
const { user_db } = require('../db');
const User = require('../models/User');



/* GET users listing. mounting the signup path*/
router.get('/', function(req, res, next) {
  res.render('signup', { message: '' });
});


router.post('/', async function(req, res, next) {
  
  try {

    const existingUser = await User.findOne({ where: { email: req.body.email } });
    if (existingUser){
      return res.status(400).json({status: "failed", data: [], message: 'You already have an account, please log in instead' });
    }

    const hashPass = await bcrypt.hash(req.body.pwd, 10);

    if (req.body.pwd !== req.body.pwd2) {
      return res.status(400).json({status: "failed", data: [], message: 'Passwords do not match' });
    }

    const user = await User.create({
      email: req.body.email,
      password: hashPass,
      username: req.body.displayname,
      ccNum: req.body.cardno,
      ccExDate: req.body.experDate,
      ccCVV: req.body.cvv
    });
    
    return res.redirect('/login'); 
    
  } catch (error) {
    console.error('Error creating user:', error);
    return res.render('signup', { message: 'Error creating user' });
  }
});




module.exports = router;
