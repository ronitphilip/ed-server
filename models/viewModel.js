const mongoose = require('mongoose')

const viewSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now,
        index: true
    },
    count : {
        type : Number,
        default : 0
    }
})

const views = mongoose.model('views',viewSchema)
module.exports = views;