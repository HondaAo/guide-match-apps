const express = require('express');
const router = express.Router();
const models = require('../models/userModel')
const generateToken = require('../utils/Token')
const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-northeast-1'
})

const ses = new AWS.SES({ apiVersion: '2010-12-01'})

router.post('/login', async(req,res)=>{
    const { email, password } = req.body 
    const user = await models.User.findOne({email})
    if(!user){
        res.status(401).send('No user exists, please confirm your email ')
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
           guideId: user.guideId,
           tourId: user.tourId,
           favoriteGuides: user.favoriteGuides,
           token: generateToken(user._id),
       })
       console.log(user)
    }else{
        res.status(401).send('password is wrong, please confirm')
    }
})
router.post('/register', async(req,res)=>{
  const { name, email, password } = req.body   
  const userExists = await models.User.findOne({email})
    if(userExists){
        res.status(400).send('user alreaddy exists')
    }
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: false,
            isGuide: user.isGuide,
            image: '',
            sex: user.sex,
            token: generateToken(user._id), 
        })

    }else{
        res.status(401).send('Invaild password')
    }

  
})
router.post('/register/admin',async(req, res)=>{
    const { name, email, password } = req.body   
    const userExists = await models.User.findOne({email})
      if(userExists){
          res.status(400).send('user alreaddy exists')
      }
    const user = await models.User.create({
        name,
        email,
        password,
        isAdmin: true
    })
    const params = {
        Source: process.env.EMAIL_FROM,
        Destination: {
            ToAddresses: [email]
        },
        ReplyToAddresses: [process.env.EMAIL_TO],
        Message: {
            Body: {
                Html:{
                    Charset: 'UTF-8',
                    Data: `
                    <html>
                     <body>
                      <h1>Hi ${name}! Verify Your email address </h1>
                      <p>${process.env.CLIENT_URL}/login/admin</p>
                     </body>
                    </html>`
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'You just created new account on Expo.'
            }
        }
    };
    const sendEmailOnRegister = ses.sendEmail(params).promise()

    sendEmailOnRegister
    .then(data => {
        console.log('email submitted to SES', data);
        res.json({
            message: `Email has been sent to ${email}, Follow the instructions to complete your admin registration`
        });
    })
    .catch(error => {
        console.log('ses email on register', error);
        res.json({
            error: `We could not verify your email. Please try again`
        });
    });
  })
router.post('/login/admin', async(req,res)=>{
  const { email, password } = req.body 
  const user = await models.User.findOne({email})
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
   const user = await models.User.findById(req.params.id)
   if(user){
       res.json(user)
   }
   else{
       res.send('Error')
   }
})
router.post('/favorite/:id',async(req,res)=>{
    const user = await models.User.findById(req.params.id)
    const guideId  = req.body;
    if(user){
     user.favoriteGuides.push(guideId);
     await user.save()
     res.send('Add Favorite List')
   }

})
// router.delete('/guide',async(req,res)=>{
//     console.log(req.query)
//     const user = await models.User.findOne({ _id: req.query['myId']})
//     console.log(user)
//     if(user){
//         const guides = user.favoriteGuides
//         guides.deleteOne({ guideId: req.query['guideId']},function(err){
//             console.log(err)
//         })
//     }
// })
router.put('/setting/:id',async(req,res)=>{
    const user = await models.User.findById(req.params.id)
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
  const user = await models.User.findById(req.params.id)
  const { guideId } = req.body
  if(user){
      user.isGuide = true
      user.guideId = guideId
  }
  const updateUser = await user.save()
  res.json(updateUser)
})
router.post('/travellist/:id',async(req,res)=>{
    const user = await models.User.findById(req.params.id)
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
