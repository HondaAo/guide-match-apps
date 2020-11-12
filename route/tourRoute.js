const express = require('express');
const router = express.Router();
const models = require('../models/userModel')
const { v4: uuidv4 } = require('uuid');
const formidable = require('formidable')
const AWS = require('aws-sdk');
const fs = require('fs')

router.get('/', async(req,res)=>{
    const tours = await models.Tour.find({}).sort('-updatedAt');
    res.json(tours)
})
router.get('/:id', async(req,res)=>{
    const tour = await models.Tour.findById(req.params.id)
    res.json(tour)
})
router.get('/host/:id',async(req,res)=>{
    const host = await models.User.findOne({ _id: req.params.id})
    res.json(host);
})
router.get('/tour/location',async(req,res)=>{
 const tours = await models.Tour.find({ country: req.query['country'], city: req.query['city']})
 const adminTours = await tours.filter(tour => {
     return tour.isAuth == true
 })
 res.send(adminTours);
})
router.post('/participant/:id',async(req,res)=>{
  const { id, date, number } = req.body;
  const tour = await models.Tour.findById(req.params.id)
  if(tour){
      const participant = {
          id,
          date,
          number
      }
      tour.participants.push(participant);
      await tour.save();
      res.send('Successfully Booked')
  }
})
require('dotenv').config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-northeast-1'
})


router.post('/',(req,res)=>{
    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files)=>{
        if(err){
            console.log(err)
            return res.status(400).json({
                error: 'Image could not upload'
            })
        }
        const { host, title, description, city, country, date, charge } = fields
        const { image } = files
        let tour = new models.Tour({ host, title, description, city, country, date, charge })
        if(image.size > 1000000){
            console.log(err)
            return res.status(400).json({
                error: "Image should be less than 10mb"
            })

        }
        const params = {
            Bucket: 'expotravel',
            Key: `post/${uuidv4()}`,
            Body: fs.readFileSync(image.path),
            ACL: 'public-read',
            ContentType: `image/jpg`
        }
        s3.upload(params,(err, data)=> {
            if(err) {
                console.log(err)
                return res.status(400).json({ error: 'Failed!'})
            }
            console.log('AWS UPLOAD RES DATA', data)
            tour.image.url = data.Location
            tour.image.key = data.key

            tour.save((err, success)=>{
                if(err){
                    console.log(err)
                }
                return res.json(success)
            })
        })
    })
})

module.exports = router