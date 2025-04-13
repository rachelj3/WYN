var express = require('express');
var router = express.Router();
const { post_db } = require('../db');
const Post = require('../models/Post');

router.post('/editPost', async function(req, res){
  const post = await Post.findByPk(req.body.serviceId);
  return res.render("makePost", {formData: post});
});

router.post('/', async function(req, res, next) {
  console.log("in post / ");
  var post = undefined;
  if(req.body.serviceId == ""){ //if service id is empty, then this is a new entry
    post = await Post.create({
        description: req.body.description,
        imageURL: req.body.imageURL,
        title: req.body.title,
        price: (req.body.price == "") ? null : req.body.price,
        location: req.body.location,
        postingUserId: req.body.posterId,
      })
  } else { //if service id is not empty, retrieve and edit the existing one
    post = await Post.findByPk(req.body.serviceId);
    post.description = req.body.description;
    post.imageURL= req.body.imageURL;
    post.title = req.body.title;
    post.price = req.body.price;
    post.location = req.body.location;
    await post.save();
  }


      res.redirect('/service/' + encodeURIComponent(post.id)) 
    });

module.exports = router;
  