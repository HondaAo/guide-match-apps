const express = require('express');
const router = express.Router();
const User = require('../models/userModel')
const generateToken = require('../utils/Token')
const ObjectID = require('bson-objectid');

router.post('/login', async(req,res)=>{
    const { email, password } = req.body 
    const user = await User.findOne({email})
    if(!user){
        res.status(401).send('No user exists, please confirm ypur email ')
    }
    if(user && (await user.matchPassword(password))){
       res.json({
           _id: user._id,
           name: user.name,
           email: user.email,
           isAdmin: user.isAdmin,
           isGuide: user.isGuide,
           image: user.image,
           sex: user.sex,
           token: generateToken(user._id),
       })
       console.log(user)
    }else{
        res.status(401).send('Invaild password')
    }
})
router.post('/register', async(req,res)=>{
  const { name, email, password } = req.body   
  const userExists = await User.findOne({email})
    if(userExists){
        res.status(400).send('user alreaddy exists')
    }
    const user = await User.create({
        name,
        email,
        password,

    })
    console.log(user)
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isGuide: user.isGuide,
            image: user.image,
            sex: user.sex,
            token: generateToken(user._id), 
        })

    }else{
        res.status(401).send('Invaild password')
    }

  
})
router.post('/login/admini', async(req,res)=>{
  const { email, password } = req.body 
  const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))){
       res.json({
           _id: user._id,
           email: user.email,
           isAdmin: user.isAdmin,
           token: generateToken(user._id),
       })
       console.log(user)
    }else{
        res.status(401)
        res.send('Invaild password')
    } 
})
router.get('/:id',async(req,res)=>{
   const user = await User.findById(req.params.id)
   if(user){
       res.json(user)
   }
   else{
       res.send('Error')
   }
})
router.post('/favorite/:id',async(req,res)=>{
    const user = await User.findById(req.params.id)
    const { name, title, cost, city, country, image, guideId, landscape } = req.body;
    if(user){
      const guideList = {
        name,
        title,
        cost,
        city,
        country,
        image,
        guideId,
        landscape
    }  
     user.favoriteGuides.push(guideList);
     await user.save()
     res.send('Add Favorite List')
   }

})
router.delete('/guide',async(req,res)=>{
    console.log(req.query)
    const user = await User.findOne({ _id: req.query['myId']})
    console.log(user)
    if(user){
        const guides = user.favoriteGuides
        guides.deleteOne({ guideId: req.query['guideId']},function(err){
            console.log(err)
        })
    }
})
router.put('/setting/:id',async(req,res)=>{
    const user = await User.findById(req.params.id)
    const { name, email, sex } = req.body
    if(user){
      user.name= name
      user.email= email,
      user.sex = sex
    }
    await user.save()
    res.send('Successfully changed!')
})
router.put('/guide/:id',async(req,res)=>{
  const user = await User.findById(req.params.id)
  const { guideId } = req.body
  if(user){
      user.isGuide = true
      user.guideId = guideId
  }
  const updateUser = await user.save()
  console.log(updateUser)
  res.json(updateUser)
})
router.post('/travellist/:id',async(req,res)=>{
    const user = await User.findById(req.params.id)
    const { guidename, guideId, date, landscape  } = req.body
    if(user){
       const travel = {
           guidename,
           guideId,
           date,
           landscape,
           isFinished: false
       }
       user.travellist.push(travel)
       await user.save()
       console.log(user)
    }
})

module.exports = router
