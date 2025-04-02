var express = require('express');
var router = express.Router();
const { post_db } = require('../db');
const Post = require('../models/Post');


router.post('/createPost', function(req, res, next) {
    const post = Post.create({
        description: req.body.description,
        imageURL: req.body.imageURL,
        title: req.body.title,
        price: req.body.price,
        location: req.body.location,
        postingUser: req.body.postingUser
      })
      res.redirect('/'); // Redirect to the home page after creating the post
    });

module.exports = router;
  