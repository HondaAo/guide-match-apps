const mongoose = require('mongoose')
const { stringify } = require('uuid')

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    userId : {
        type: String,
        required: true
    }
})

const reservationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    clientId: {
         type: String,
         required: true
    },
    date: {
        type: Date,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: true
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    isFinished: {
        type: Boolean,
        required: true,
        default: false
    }
})

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
    country: {
        type: String,
        required: true,
    },
    city: {
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
    },
    image: {
       type: String,
       default: '',
    },
    reviews: [reviewSchema],
    reservations: [reservationSchema],
},{
    timestamps: true
})


module.exports = mongoose.model('Guide', guideSchema)