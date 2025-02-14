const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    saved : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'college' 
        }
    ],
    testimonials: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'testimonial'
        }
    ],
    role : {
        type : String,
        required : true,
        default : 'user'
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

const users = mongoose.model('users',userSchema)
module.exports = users