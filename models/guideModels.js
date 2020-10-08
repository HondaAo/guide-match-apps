const mongoose = require('mongoose')

const guideSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    telephone:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true,
    },
    title: {
       type: String
    },
    description: {
        type: String,
        required: true
    },
    languages: {
        type: [String],
        required: true
    },
    rate: {
        type: String,
        default: '20',
    },
    isPro: {
        type: Boolean,
        required: true
    },
    userId: {
        type: String
    },
    star: {
        type: Number,
        default: 0
    },
    experience: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
})


module.exports = mongoose.model('Guide', guideSchema)