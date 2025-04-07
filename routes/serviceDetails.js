var express = require('express');
var router = express.Router();
const { post_db } = require('../db');
const Post = require('../models/Post');
const { sequelize } = require('../models/Post');

router.get('/service/:title', async (req, res) => {
    const { title } = req.params;
    try {
        const service = await Post.findOne({
            where: {title}
        });
        res.render('service', { service });
    }
    catch (error) {
        console.log('error getting random order of services', error);
    }
});

module.exports = router;