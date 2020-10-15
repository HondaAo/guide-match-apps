const express = require('express')
const router = express.Router();
const Chat = require('../models/chatModel');

router.get('/:id',async(req,res)=>{
    const chatRooms = await Chat.find({ myId: req.params.id }).sort('-updatedAt')
    res.json(chatRooms)
})
router.get('/guide/:id',async(req,res)=>{
    const chatRooms = await Chat.find({ userId: req.params.id }).sort('-updatedAt')
    const myChatRoom = chatRooms.filter(chatRoom =>{
        return chatRoom.sender !== req.params.id
    })
    res.json(myChatRoom)
})
router.get('/',async(req,res)=>{
   const chatRoom = await Chat.find({ userId: req.query['userId'], myId: req.query['myId']})
   console.log(chatRoom)
   res.send(chatRoom)
})
router.post('/',async(req,res)=>{
    const { text, userId, username, myId, sender, sendername } = req.body
    const chatRoom = await Chat.create({
        text,
        userId,
        username,
        myId,
        sender, 
        sendername
    })
    res.json(chatRoom)
})

module.exports = router