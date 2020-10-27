const express = require('express')
const router = express.Router();
const models = require('../models/userModel')

router.post('/:id', async(req,res)=>{
    const Id = req.params.id
    const user = await models.User.findById(Id)
    const { name,telephone,email,country,city,title,description,rate,isPro,image, landscape, userId} = req.body;
    // const guideExists = await models.Guide.findOne({email})
    // if(guideExists){
    //     res.status(400).send('guide alreaddy exists')
    // }
    if(user){
      const guide = await models.Guide.create({ name,telephone,email,country,city,title,description,rate,isPro, image, landscape, userId})
      console.log(guide.userId)
      user.guideId = guide._id
      user.isGuide = true
      await user.save();
      res.send('Successfully registered!')
    }
})
router.get('/location',async(req,res)=>{
   const guides = await models.Guide.find({ country: req.query['country'], city: req.query['city']})
   res.json(guides)
   console.log(guides)
})
router.get('/', async(req,res)=>{
    const guides = await models.Guide.find({}).sort('-updatedAt');
    res.json(guides)
})
router.post('/book/:id', async(req,res)=> {
    const { name, date, clientId } = req.body
    const guide = await models.Guide.findById(req.params.id)
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
    const guide = await models.Guide.findById(req.params.id)
    res.json(guide)
    console.log(guide)
})
router.get('/guidelist/:id',async(req,res)=>{
    const guide = await models.Guide.findById(req.params.id)
    console.log(guide)
    res.json(guide)
})
router.get('/message/:id',async(req,res)=>{
    const guide = await models.Guide.findById(req.params.id)
    res.json(guide)
})
router.put('/setting/:id',async(req,res)=>{
    const guide = await models.Guide.findById(req.params.id)
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
router.put('/payment',async(req,res)=>{
    const guide = await models.Guide.findOne({ _id: req.query['guide']})
    if(guide){
        const reservation = guide.reservations.find(reservation => reservation.clientId === req.query['client'])
        if(reservation){
            reservation.isPaid = true
            await guide.save()
            await res.send('Successfully Paid')
        }
    }
})

module.exports =router;