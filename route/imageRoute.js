const express = require('express')
const router = express.Router();
const models = require('../models/userModel')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination:  (req, file, cb) => { 
        cb(null, './public/') 
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
router.post('/:id',upload.single('image'), async(req,res)=>{
    console.log(req.file)
    const user = await models.User.findById(req.params.id)
    if(user){
        const url = req.protocol + '://' + req.get('host')
        const image = url + '/public/' + req.file.filename
        user.image = image
        await user.save();
        await console.log(user)
        await res.json(user.image)
        if(user.isGuide){
          const guide = await models.Guide.findOne({ userId: user.guideId })
          guide.image = image
          await guide.save()
        }
    }
})
router.post('/guide/:id',upload.single('image'),async(req,res)=>{
    const guide = await models.Guide.findOne({ userId: req.params.id })
    if(guide){
        const url = req.protocol + '://' + req.get('host')
        const image = url + '/public/' + req.file.filename
        guide.landscape = image
        await guide.save()
    }
})
router.post('/post/:id',upload.single('image'),async(req,res)=>{
    const post = await models.Post.findOne({ user: req.params.id })
    console.log(req.file)
    if(post){
        const url = req.protocol + '://' + req.get('host')
        const image = url + '/public/' + req.file.filename
        post.image = image
        await post.save()
    }
})
router.get('/:id',async(req,res)=>{
    const guide = await models.Guide.findById(req.params.id)
    res.send(guide.image)
})
module.exports = router;