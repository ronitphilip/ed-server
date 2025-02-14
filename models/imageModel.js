const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    collegename : {
        type : String,
        required : true
    },
    imageArray : {
        type : Array,
        required : true
    }
})

const images = mongoose.model('images', imageSchema)
module.exports = images