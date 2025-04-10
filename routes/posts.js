var express = require('express');
var router = express.Router();
const { post_db } = require('../db');
const Post = require('../models/Post');


router.post('/', async function(req, res, next) {
    const post = await Post.create({
        description: req.body.description,
        imageURL: req.body.imageURL,
        title: req.body.title,
        price: (req.body.price == "") ? null : req.body.price,
        location: req.body.location,
        postingUserId: req.body.posterId,
      })

      res.redirect('/service/' + encodeURIComponent(post.id)) //redirect to created service posting
      // res.redirect('/'); // Redirect to the home page after creating the post
    });

module.exports = router;
  