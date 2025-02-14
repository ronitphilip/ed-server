const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'college',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    parentCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
        default: null
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    status : {
        type: String,
        enum: ['active', 'inactive','flagged'],
        default: 'active'
    },
    reports: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
                required: true
            },
            reason: {
                type: String,
                required: true
            },
            reportedAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

const comment = mongoose.model('comment', commentSchema);
module.exports = comment;
