var express = require('express');
var router = express.Router();
const { post_db } = require('../db');
const Post = require('../models/Post');
const User = require('../models/User');
const { sequelize } = require('../models/Post');
const { Op } = require("sequelize");

// router.use('/', async (req, res) => {
//     console.log("filtering");
//     try {
//         //create the query
//         const whereArg = {}
//         if(req.body.Search){
//             whereArg[Op.and] = [];
//             if(req.body.Search){
//                 whereArg[Op.and].push({
//                     [Op.or]: [
//                         {
//                             title: {
//                                 [Op.substring]: req.body.Search
//                             },
//                             description: {
//                                 [Op.substring]: req.body.Search
//                             }
//                         }
//                     ]
//                 })
//             }
//         }
//         console.log(whereArg);

//         const services = await Post.findAll({ where: whereArgs })

//         console.log(services);

//         const users = await User.findAll()
//         return res.render('serviceListings', {services, users});
//     } catch(error) {
//         console.log("Failed in filtering:", error);
//     }
// });

router.get('/', async (req, res) => {

    const { keyword } = req.query;
    let services;
    const users = await User.findAll();

    if(keyword) {
        services = await Post.findAll({
            where: {
                [Op.or]: [
                    {
                        title: {
                            [Op.like]: `%${keyword}%`
                        }
                    },
                    {
                        description: {
                            [Op.like]: `%${keyword}%` 
                        }
                    }
                ]
            }
        });
    } else {
        services = await Post.findAll();
    }

    res.render('serviceListings', { services, users, keyword: keyword || '' });
});






    // console.log(Post);
    //try {
        //const services = await Post.findAll();
        //const services = await Post.findAll({
           //order: sequelize.literal('RANDOM()')
        //});
        //const users = await User.findAll()
        //res.render('serviceListings', { services, users});
    //}
    //catch (error) {
        //console.log('error getting random order of services', error);
    //}

module.exports = router;