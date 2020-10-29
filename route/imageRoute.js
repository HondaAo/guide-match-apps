const express = require('express')
const router = express.Router();
const models = require('../models/userModel')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const formidable = require('formidable')
const AWS = require('aws-sdk');
const fs = require('fs')
require('dotenv').config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
})


router.post('/post',(req,res)=>{
    console.log(req.file)
    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files)=>{
        if(err){
            console.log(err)
            return res.status(400).json({
                error: 'Image could not upload'
            })
        }
        const { user, title, comment } = fields
        const { image } = files
        console.log(image)
        let post = new models.Post({ user, title, comment })
        if(image.size > 200000){
            console.log(err)
            return res.status(400).json({
                error: "Image should be less than 2mb"
            })

        }
        const params = {
            Bucket: 'expotravel',
            Key: `post/${uuidv4()}`,
            Body: fs.readFileSync(image.path),
            ACL: 'public-read',
            ContentType: `image/jpg`
        }
        console.log(params)
        s3.upload(params,(err, data)=> {
            if(err) {
                console.log(err)
                return res.status(400).json({ error: 'Failed!'})
            }
            console.log('AWS UPLOAD RES DATA', data)
            post.image.url = data.Location
            post.image.key = data.key

            post.save((err, success)=>{
                if(err){
                    console.log(err)
                }
                return res.json(success)
            })
        })
    })
})

// const storage = multer.diskStorage({
//     destination:  (req, file, cb) => { 
//         cb(null, './public/') 
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(' ').join('-');
//         cb(null, uuidv4() + '-' + fileName)
//     }
// });

// var upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//         }
//     }
// });
router.post('/change/:id',async(req,res)=>{
    const user = await models.User.findById(req.params.id)
    if(user){
    let form = new formidable.IncomingForm()
    form.parse(req, (err, file)=>{
        if(err){
            return res.status(400).json({
                error: 'Image could not upload'
            })
        }
        console.log(form.openedFiles[0])
        const image = form.openedFiles[0]
        console.log(image)
        if(image.size > 200000){
            return res.status(400).send("Image should be less than 2mb")
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
                return res.status(400).json({ error: 'Failed!'})
            }
            console.log('AWS UPLOAD RES DATA', data)
            user.image = data.Location

            user.save((err, success)=>{
                if(err){
                    console.log(err)
                }
                return res.json(user)
            })
        })
    })
}
})
// router.post('/:id',upload.single('image'), async(req,res)=>{
//     console.log(req.file)
//     const user = await models.User.findById(req.params.id)
//     if(user){
//         const url = req.protocol + '://' + req.get('host')
//         const image = url + '/public/' + req.file.filename
//         user.image = image
//         await user.save();
//         await console.log(user)
//         await res.json(user.image)
//         if(user.isGuide){
//           const guide = await models.Guide.findOne({ userId: user.guideId })
//           guide.image = image
//           await guide.save()
//         }
//     }
// })
// router.post('/guide/:id',upload.single('image'),async(req,res)=>{
//     const guide = await models.Guide.findOne({ userId: req.params.id })
//     if(guide){
//         const url = req.protocol + '://' + req.get('host')
//         const image = url + '/public/' + req.file.filename
//         guide.landscape = image
//         await guide.save()
//     }
// })
// router.post('/post/:id',upload.single('image'),async(req,res)=>{
//     const post = await models.Post.findOne({ user: req.params.id })
//     console.log(req.file)
//     if(post){
//         const url = req.protocol + '://' + req.get('host')
//         const image = url + '/public/' + req.file.filename
//         post.image = image
//         await post.save()
//     }
// })
router.get('/:id',async(req,res)=>{
    const guide = await models.Guide.findById(req.params.id)
    res.send(guide.image)
})
module.exports = router;