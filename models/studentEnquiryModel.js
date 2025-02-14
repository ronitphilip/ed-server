const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    locality: {
        type: String,
        required: true,
    },
    highestQualification: {
        type: String,
        required: true,
    },
    preferredCollege: {
        type: String,
        required: true,
    },
    preferredCourse: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['contacted', 'pending', 'rejected'],
        default: 'pending',
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const enquiry = mongoose.model('enquiry', enquirySchema);
module.exports = enquiry;
