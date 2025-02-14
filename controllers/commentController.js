const comment = require('../models/commentModel')
const college = require('../models/collegeModel')

// add comment
exports.addComment = async (req, res) => {
    console.log('Inside addComment');
    
    const { collegeId, userId, message, rating, parentCommentId } = req.body;

    try {
        const collegeExists = await college.findById(collegeId);
        if (!collegeExists) {
            return res.status(404).json({ error: "College not found" });
        }

        const newComment = new comment({
            collegeId, userId, message, rating, parentCommentId: parentCommentId || null
        });
        await newComment.save();

        if (!parentCommentId) {
            await college.findByIdAndUpdate(collegeId, {
                $push: { comments: newComment._id }
            });
        }

        res.status(200).json(newComment);

    } catch (err) {
        res.status(401).json(err)
    }
}

// get comment
exports.getCollegeComments = async (req, res) => {
    console.log('Inisde getCollegeComments');
    
    const collegeId = req.params;

    try {
        const comments = await comment.find({ collegeId:collegeId.id })
            .populate('userId', 'username')
            .populate('parentCommentId')
            .sort({ createdAt: -1 });

        res.status(200).json(comments);
    } catch (err) {
        res.status(401).json(err);
    }
};

// report comment
exports.reportCommentController = async (req, res) => {
    const userId = req.payload;
    const { commentId, reason } = req.body;

    try {
        const existingComment = await comment.findById(commentId);

        if (!existingComment) {
            return res.status(404).json('Comment not found');
        }

        const hasUserReported = existingComment.reports.some(report => report.userId.equals(userId));

        if (hasUserReported) {
            return res.status(400).json('You have already reported this comment');
        }

        existingComment.reports.push({ userId, reason });
        existingComment.status = 'flagged';

        if (existingComment.reports.length >= 5) {
            existingComment.status = 'inactive';
        }

        await existingComment.save();

        res.status(200).json(existingComment);
    } catch (err) {
        res.status(401).json(err);
    }
};

// get reported comments
exports.getFlaggedCommentsController = async (req, res) => {
    try {
        const flaggedComments = await comment.find({ status: 'flagged' })
            .populate('userId', 'username')
            .populate('reports.userId', 'username');

        res.status(200).json(flaggedComments);
    } catch (err) {
        res.status(401).json(err);
    }
};

// get all comments
exports.getCommentsController = async (req, res) => {
    console.log('Inside getCommentsController');
    
    try {
        const allreviews = await comment.find({ parentCommentId: null })
        const allreplies = await comment.find({ parentCommentId: { $ne: null } })

        res.status(200).json({Reviews: allreviews, Replies: allreplies});
    } catch (err) {
        res.status(401).json(err)
    }
}

// update status
exports.setCommentInactive = async (req, res) => {
    console.log('Inside setCommentInactive');
    const {commentId} = req.params;
    console.log(commentId);
    
    try {

        const updatedComment = await comment.findByIdAndUpdate(
            commentId,
            { status: "inactive" },
            { new: true } 
        );

        if (!updatedComment) {
            return res.status(404).json("Comment not found");
        }

        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(401).json(err);
    }
};
