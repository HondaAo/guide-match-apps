const express = require('express')
const router = express.Router();
const models = require('../models/userModel')

router.get('/',async(req,res)=>{
    console.log(req.query['place'])
    const guides = await models.Guide.find({ place: req.query['place'] }).sort('-updatedAt');
    res.json(guides)
 })

module.exports = router;