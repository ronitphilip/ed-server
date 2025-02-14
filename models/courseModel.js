const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'college',
        required: true
    },
    courses: [
        {
          coursename: { type: String, required: true },
          fees: { type: Number, required: true },
          duration: { type: String },
          description: { type: String }
        }
    ]
})

const course = mongoose.model('course', courseSchema)
module.exports = course;