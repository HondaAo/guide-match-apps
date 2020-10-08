const express = require('express')
const router = express.Router();
const Guide = require('../models/guideModels')
const Request = require('../models/requestModel')

router.post('/', async(req,res)=>{
    const {name,telephone,email,place,title,description,languages,rate,isPro, userId} = req.body 
    console.log(req.body)
    const guideExists = await Guide.findOne({email})
    if(guideExists){
        res.status(400).send('guide alreaddy exists')
    }
    const newGuide = await Guide.create({name,telephone,email,place,title,description,languages,rate,isPro, userId})
})
router.get('/', async(req,res)=>{
    const guides = await Guide.find({}).sort('-updatedAt');
    res.json(guides)
})
router.get('/:id',async(req,res)=>{
    const guide = await Guide.findOne({ userId: req.params.id})
    res.json(guide)
})
router.get('/place/:id',async(req,res)=>{
   const guides = await Guide.find({ place: 'Kyoto' }).sort('-updatedAt');
   res.json(guides)
})
router.get('/guidelist/:id',async(req,res)=>{
    const guide = await Guide.findById(req.params.id)
    res.json(guide)
})
router.get('/message/:id',async(req,res)=>{
    const guide = await Guide.findById(req.params.id)
    res.json(guide)
})
router.post('/request',async(req,res)=>{
    const { email,comment } = req.body
    try{
    const request = await Request.create({
        email,comment
    })
    res.send('Successfully sended');
   }catch(err){
       res.send('Something went wrong')
   }
})
router.get('/request',async(req,res)=>{
    const { email,comment } = req.body
    const request = await Request.create({
        email,comment
    })
    res.send('Successfully sended');
})
module.exports =router;