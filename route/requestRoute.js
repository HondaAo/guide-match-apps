const express = require('express')
const router = express.Router();
const Request = require('../models/requestModel')

router.post('/',async(req,res)=>{
    console.log(req.body)
    const { email,comment } = req.body
    try{
    const request = await Request.create({
        email,comment
    })
    console.log(request)
    res.send('Successfully sended');
   }catch(err){
       res.send('Something went wrong')
   }
})
router.get('/',async(req,res)=>{
    const { email,comment } = req.body
    const request = await Request.create({
        email,comment
    })
    res.send('Successfully sended');
})
module.exports = router