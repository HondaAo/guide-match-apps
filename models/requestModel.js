const mongoose = require('mongoose')

const requestSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Request', requestSchema)