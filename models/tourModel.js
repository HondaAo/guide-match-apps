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
    date: {
        type: Date,
        required: true
    },
    payment: {
        type: Number
    },
    isFinished: {
        type: Boolean,
        required: true,
        default: false
    }
})

const tourSchema = mongoose.Schema({
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
    date: {
        type: Date,
        required: true
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
    fee: {
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
    guideId:{
        type: String
    },
    star: {
        type: Number,
        default: 0
    },
    image: {
       type: String
    },
    reviews: [reviewSchema],
    reservations: [reservationSchema],
},{
    timestamps: true
})


module.exports = mongoose.model('Tour', tourSchema)