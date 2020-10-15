const express = require('express')
const router = express.Router();
const Guide = require('../models/guideModels')
const User = require('../models/userModel')
const Request = require('../models/requestModel');
const { findById } = require('../models/userModel');

router.post('/', async(req,res)=>{
    const {name,telephone,email,country,city,title,description,languages,rate,isPro,userId,image} = req.body;
    
    console.log(req.body)
    const guideExists = await Guide.findOne({email})
    if(guideExists){
        res.status(400).send('guide alreaddy exists')
    }
    const user = await User.findById(userId)
    const newGuide = await Guide.create({name,telephone,email,country,city,title,description,languages,rate,isPro, userId, image})
    if(user){
      user.guideId = newGuide._id
      await user.save();
    }
})
router.get('/location',async(req,res)=>{
   const guides = await Guide.find({ country: req.query['country'], city: req.query['city']})
   res.json(guides)
   console.log(guides)
})
router.get('/', async(req,res)=>{
    const guides = await Guide.find({}).sort('-updatedAt');
    res.json(guides)
})
router.post('/book/:id', async(req,res)=> {
    const { name, date, clientId } = req.body
    const guide = await Guide.findById(req.params.id)
    if(guide){
      const reservation = {
          name,
          date,
          clientId
      }
      guide.reservations.push(reservation)
      await guide.save()
      await res.json(guide)
    }
})
router.get('/:id',async(req,res)=>{
    const guide = await Guide.findById(req.params.id)
    res.json(guide)
    console.log(guide)
})
router.get('/guidelist/:id',async(req,res)=>{
    const guide = await Guide.findById(req.params.id)
    console.log(guide)
    res.json(guide)
})
router.get('/message/:id',async(req,res)=>{
    const guide = await Guide.findById(req.params.id)
    res.json(guide)
})
router.put('/setting/:id',async(req,res)=>{
    const guide = await Guide.findById(req.params.id)
    const { name, email, telephone, title, rate } = req.body
    if(guide){
       guide.name = name || guide.name,
       guide.email = email || guide.email,
       guide.telephone = telephone || guide.telephone
       guide.title = title || guide.title,
       guide.rate = rate || guide.rate
    }
    await guide.save()
    console.log(guide)
    res.json(guide)
})

module.exports =router;