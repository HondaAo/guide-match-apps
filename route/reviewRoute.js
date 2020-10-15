const express = require('express')
const router = express.Router();
const Guide = require('../models/guideModels')

router.post('/:id',async(req,res)=>{
    const { name, rating, comment, userId } = req.body;
    const guide = await Guide.findById(req.params.id);
    if(guide){
     const review = {
         name,
         rating,
         comment,
         userId
     }
     guide.reviews.push(review)
     if(guide.experience === 0){
         guide.experience = guide.experience + 1
         guide.star = rating
     }else{
         guide.experience++
         guide.star = guide.reviews.reduce((acc, item)=> item.rating + acc, 0)/guide.reviews.length
     }
     await guide.save()
     console.log(guide)
     res.status(201).send('Review added!')
    }else{
        res.status(404).send('No guide')
    }
 })

module.exports = router;