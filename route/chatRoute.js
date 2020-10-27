const express = require('express')
const router = express.Router();
const models = require('../models/userModel');

router.get('/:id',async(req,res)=>{
    const chats = await models.Chat.find({ myId: req.params.id }).sort({userId: -1, updatedAt: -1})
    console.log(chats)
    if( chats.length > 0 ){
    let chatRooms = []
    const getUser = () => {
    chatRooms.push(chats[0])
    for( let i = 1; i < chats.length; i++){
        if(chats[i].userId !== chats[i-1].userId ){
            chatRooms.push(chats[i])
        }
    }
     return chatRooms
    }
    getUser()
    res.json(chatRooms) 
    }
   
})
router.get('/guide/:id',async(req,res)=>{
    const chatRooms = await models.Chat.find({ userId: req.params.id }).sort('-updatedAt')
    const myChatRoom = chatRooms.filter(chatRoom =>{
        return chatRoom.sender !== req.params.id
    })
    res.json(myChatRoom)
})
router.get('/',async(req,res)=>{
   const chatRoom = await models.Chat.find({ userId: req.query['userId'], myId: req.query['myId']})
   console.log(chatRoom)
   res.send(chatRoom)
})
router.post('/',async(req,res)=>{
    const { text, userId, myId, sender, sendername, username } = req.body
    const chatRoom = await models.Chat.create({
        text,
        userId,
        myId,
        sender, 
        sendername,
        username
    })
    res.json(chatRoom)
})

module.exports = router