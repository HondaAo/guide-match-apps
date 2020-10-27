const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const paymentSchema = mongoose.Schema({
    cardNumber: {
        type: Number
    },
    expire: {
        type: String
    },
    CVV: {
        type: Number
    }
})

const travellistSchema = mongoose.Schema({
    guidename: {
        type: String,
    },
    date: {
        type: Date,
    },
    isFinished: {
        type: Boolean,
        default: false
    },
    guideId: {
        type: String,
    },
    landscape: {
        type: String
    }
})


const tourSchema = mongoose.Schema({
    host: { 
        type: String
     },
    date: {
        type: String
    },
    title: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    charge: {
        type: String
    },
    description: {
        type: String
    },
    participants: [String],
    image: {
        type: String
    }
},{
    timestamps: true
})

const Tour = mongoose.model('Tour', tourSchema)

const postSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    image: {
        type: String
    }
},{
    timestamps: true
})

const Post = mongoose.model('Post', postSchema)

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
    landscape: {
        type: String,
        default: ''
    },
    rate: {
        type: String,
        default: '',
    },
    isPro: {
        type: Boolean,
        default: false
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
    reservations: [ reservationSchema ],
},{
    timestamps: true
})

var Guide = mongoose.model('Guide', guideSchema)

const chatSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    myId: { 
        type: String
     },
    userId: { 
        type: String
    },
    sender: {
        type: String
    },
    sendername: {
        type: String
    },
    username: {
        type: String
    }
},{
    timestamps: true
})
var Chat = mongoose.model('Chat', chatSchema)
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    isGuide: {
        type: Boolean,
        required: true,
        default: false
    },
    isTour: {
        type: Boolean,
        required: true,
        default: false
    },
    image: {
        type: String,
        default: ""
    },
    sex: {
        type: String,
        default: ""
    },
    favoriteGuides: [],
    payment: {
        paymentSchema
    },
    tourId: { 
        type: String,
        default: ''
     },
    guideId: {
        type: String,
        default: ''
    },
    travellist: [
        travellistSchema
    ]
},{
    timestamps: true
})
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
  }
  
  userSchema.pre('save', async function (next) {
      if(!this.isModified('password')){
          next()
      }
      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password, salt)
})

var User = mongoose.model('User',userSchema)

module.exports = {
    User: User,
    Chat: Chat,
    Tour: Tour,
    Guide: Guide,
    Post: Post
}