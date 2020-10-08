const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    myId: {
        type: String
    },
    sender: {
        type: String
    },
    sendername: {
        type: String
    }

},{
    timestamps: true
})

module.exports = mongoose.model('Chat',chatSchema)