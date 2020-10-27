const express = require('express');
const router = express.Router();
const models = require('../models/userModel')

router.get('/', async(req,res)=>{
    const tours = await models.Tour.find({}).sort('-updatedAt');
    res.json(tours)
})

router.post('/', async(req, res) => {
    const { host, date, title, country, city, charge, description, partcipants, image } = req.body
    const user = await models.User.find({ _id: host })
    if( user && user.isAdmin ){
        const tour = await models.Tour.create({ host,date,title,email,country,city,charge,description,image})
        user.isTour = true
        await user.save();
        res.send('Successfully registered!') 
    }
})


module.exports = router