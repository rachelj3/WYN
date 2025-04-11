const bcrypt = require('bcrypt');

var express = require('express');
var router = express.Router();
const { user_db } = require('../db');
const User = require('../models/User');

router.post('/', async function(req, res, next) {
  
  try {

    var errors = { success: true};

    const existingUser = await User.findOne({ where: { email: req.body.email } });
    if (existingUser){
      errors.email_err = "Email already in use";
      errors.success = false;
      // return res.status(400).json({status: "failed", data: [], message: 'You already have an account, please log in instead' });
    }

    // console.log(typeof req.body.pwd);
    if(req.body.pwd.length < 8){
      errors.pwd_err = "Password must be at least 8 characters";
      errors.success = false;
    }

    if (req.body.pwd !== req.body.pwd2) {
      errors.pwd2_err = "Passwords do not match"
      errors.success = false;
      // return res.status(400).json({status: "failed", data: [], message: 'Passwords do not match' });
    }

    //make sure required fields exist
    if(req.body.email == ""){
      errors.email_err = "This field is required";
      errors.success = false;
    }
    if(req.body.pwd == ""){
      errors.pwd_err = "This field is required";
      errors.success = false;
    }
    if(req.body.pwd2 == ""){
      errors.pwd2_err = "This field is required";
      errors.success = false;
    }
    if(req.body.displayname == ""){
      errors.displayname_err = "This field is required";
      errors.success = false;
    }
    if(req.body.cardno == "" || req.body.experDate == "" || req.body.cvv == ""){
      errors.creditCard_err = "Credit card info is required";
      errors.success = false;
    }

    const hashPass = await bcrypt.hash(req.body.pwd, 10);

    //if we have added no errors
    if(errors.success){
      //create user in database
      const user = await User.create({
        email: req.body.email,
        password: hashPass,
        username: req.body.displayname,
        ccNum: req.body.cardno,
        ccExDate: req.body.experDate,
        ccCVV: req.body.cvv,

        //optional fields
        publicEmail: (req.body.publicEmail) ? false : true,
        description: (req.body.description == "") ? null : req.body.description,
        phoneNumber: (req.body.phoneNum == "") ? null : req.body.phoneNum,
        publicPhone: (req.body.publicEmail) ? false : true,
        addressl1: (req.body.addr1 == "") ? null : req.body.addr1,
        addressl2: (req.body.addr2 == "") ? null : req.body.addr2,
        city: (req.body.city == "") ? null : req.body.city,
        country: (req.body.country == "") ? null : req.body.country,
        zipCode: (req.body.zip == "") ? null : req.body.zip,
        publicLocation: (req.body.publicLocation) ? false : true
      });

      //log in as user
      req.session.sessionUser = {
        email: user.email,
        username: user.displayname,
        id: user.id,
      };
      return res.redirect('/profile/'+encodeURIComponent(user.id));
    } else {
      // console.log(errors);
      // console.log(req.body);
      return res.render('signup', {formData: req.body, errors: errors});
    }
    
  } catch (error) {
    console.error('Error creating user:', error);
    return res.render('signup', { message: 'Error creating user' });
  }
});



module.exports = router;
