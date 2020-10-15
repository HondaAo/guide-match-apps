const express = require('express')
const router = express.Router();
const Guide = require('../models/guideModels')

router.get('/',async(req,res)=>{
    console.log(req.query['place'])
    const guides = await Guide.find({ place: req.query['place'] }).sort('-updatedAt');
    res.json(guides)
 })

module.exports = router;