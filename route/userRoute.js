const express = require('express')
const router = express.Router();
const User = require('../models/userModel')
const generateToken = require('../utils/Token')

router.post('/login', async(req,res)=>{
    const { email, password } = req.body 
    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))){
       res.json({
           _id: user._id,
           name: user.name,
           email: user.email,
           isAdmin: user.isAdmin,
           isGuide: user.isGuide,
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
        password
    })
    console.log(user)
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isGuide: user.isGuide,
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
router.put('/guide/:id',async(req,res)=>{
  const user = await User.findById(req.params.id)
  if(user){
      user.isGuide = true
  }
  const updateUser = await user.save()
  console.log(updateUser)
  res.json(updateUser)
})

module.exports = router
