const course = require('../models/courseModel')

// get a course
exports.getACourse = async (req, res) => {
    console.log('Inside getACourse');
    const collegeId  = req.params;

    try{
        const result = await course.findOne({ collegeId:collegeId.id });
        if(result){
            res.status(200).json(result)
        }else{
            res.status(404).json('Course not found')
        }
    }catch(err){
        res.status(401).json(err)
    }
}

// get all courses
exports.getAllCourses = async (req, res) => {
    console.log('Inside getAllCourses');

    try{
        const allCourses = await course.find()
            .populate('collegeId')
        if(allCourses){
            res.status(200).json(allCourses)
        }else{
            res.status(404).json('No courses found')
        }
    }catch(err){
        res.status(401).json(err)
    }
}

// add a course to an existing college
exports.addCourseToCollege = async (req, res) => {
    console.log('Inside addCourseToCollege');
    const { collegeId, coursename, fees, duration, description } = req.body;

    try {

        let existingCourse = await course.findOne({ collegeId });

        if (!existingCourse) {
            return res.status(404).json("College not found for this course entry");
        }

        existingCourse.courses.push({ coursename, fees, duration, description });

        const updatedCourse = await existingCourse.save();

        res.status(200).json(updatedCourse);

    } catch (err) {
        res.status(401).json(err);
    }
};

// delete a course
exports.deleteCourse = async (req, res) => {
    console.log('Inside deleteCourse');
    const { collegeId, courseId } = req.params;

    try {
        const updatedCourse = await course.findOneAndUpdate(
            { collegeId },
            { $pull: { courses: { _id: courseId } } },
            { new: true } 
        );

        if (!updatedCourse) {
            return res.status(404).json("College or course not found");
        }

        res.status(200).json(updatedCourse);
    } catch (err) {
        res.status(500).json(err);
    }
};
