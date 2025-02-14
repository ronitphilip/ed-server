const mongoose = require('mongoose')

const collegeSchema = new mongoose.Schema({
    collegename : {
        type : String,
        required : true
    },
    location : [
        {
            locality : { type: String, required: true },
            street : { type: String },
            district : { type: String, required: true },
            state : { type: String, required: true },
            pincode : { type: Number, required: true }
        }
    ],
    images : {
        type : Array,
        required : true
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ],
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    visits : {
        type : Number,
        default : 0
    }
})

const college = mongoose.model('college', collegeSchema)
module.exports = college;