const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const guideSchema = mongoose.Schema({
    name: {
        type: String
    },
    cost:{
        type: String
    },
    title: {
        type: String
    },
    city: {
        type: String
    },
    country: {
       type: String
    },
    image: {
        type: String
    },
    guideId: {
        type: String
    }
})
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
    }
})

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
    favoriteGuides: [ guideSchema ],
    payment: {
        paymentSchema
    },
    guideId:{
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

module.exports = mongoose.model('User',userSchema)