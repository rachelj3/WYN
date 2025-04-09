var express = require('express');
var router = express.Router();
const { post_db } = require('../db');
const Post = require('../models/Post');
const User = require('../models/User');
const { sequelize } = require('../models/Post');

router.get('/service/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const service = await Post.findByPk(id);
        console.log(service);
        const poster = await User.findByPk(service.postingUserId);
        res.render('service', { service, poster });
    }
    catch (error) {
        console.log('error getting services', error);
    }
});

module.exports = router;