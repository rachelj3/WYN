var express = require('express');
var router = express.Router();
const { post_db } = require('../db');
const Post = require('../models/Post');
const { sequelize } = require('../models/Post');

router.get('/', async (req, res) => {
    console.log(Post);
    try {
        //const services = await Post.findAll();
        const services = await Post.findAll({
           order: sequelize.literal('RANDOM()')
        });
        res.render('serviceListings', { services });
    }
    catch (error) {
        console.log('error getting random order of services', error);
    }
});

module.exports = router;