const express = require('express');
const router = express.Router();
const models = require('../models/userModel')

router.get('/', async(req,res)=>{
    const posts = await models.Post.find({}).sort('-updatedAt');
    res.json(posts)
})
router.post('/',async(req,res)=>{
    const { user, title, comment, image } = req.body
    const username = await models.User.findOne({_id: user})
    if(username){
        const post = await models.Post.create({ user, title, comment, image})
        res.send('Successfully Posted!')
    }
})

module.exports = router