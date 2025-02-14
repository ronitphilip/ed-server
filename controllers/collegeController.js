const college = require('../models/collegeModel')
const course = require('../models/courseModel')

// add college
exports.addCollege = async (req, res) => {
    console.log("Inside addCollege");

    try {
        const { collegename, locality, street, district, state, pincode, coursearray } = req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json("At least one image is required");
        }

        const imagePaths = req.files.map((file) => file.filename);

        const newCollege = new college({
            collegename,
            location: [{ locality, street, district, state, pincode }],
            images: imagePaths,
        });

        const savedCollege = await newCollege.save();

        let savedCourse = null;

        if (coursearray) {
            const parsedCourses = JSON.parse(coursearray);

            if (Array.isArray(parsedCourses) && parsedCourses.length > 0) {
                savedCourse = await course.create({
                    collegeId: savedCollege._id,
                    courses: parsedCourses,
                });
            }
        }

        res.status(200).json({
            message: "College and courses added successfully!",
            college: savedCollege,
            courses: savedCourse,
        });
    } catch (err) {
        console.error("Error in addCollege:", err);
        res.status(500).json({ error: "Internal server error", err });
    }
};

// display all colleges
exports.getAllColleges = async (req, res) => {
    console.log('Inside getAllColleges');

    try {
        const allColleges = await college.find()
        res.status(200).json(allColleges)
    } catch (err) {
        res.status(401).json(err)
    }
}

// get a college
exports.getACollege = async (req, res) => {
    console.log('Inside getACollege');
    const { id } = req.params;

    try {
        const collegeDetails = await college.findById(id)
        res.status(200).json(collegeDetails)
    } catch (err) {
        res.status(401).json(err)
    }
}

// college visits
exports.addCollegeVisit = async (req, res) => {
    console.log('Inside addCollegeVisit');
    const { id } = req.params;

    try {
        const existingCollege = await college.findById(id);

        if (!existingCollege) {
            return res.status(404).json('College not found');
        }

        existingCollege.visits += 1;
        await existingCollege.save();

        res.status(200).json(existingCollege);
    } catch (err) {
        res.status(500).json(err);
    }
}

// delete a college
exports.deleteACollege = async (req, res) => {
    console.log('Inside deleteACollege');
    const { id } = req.params;

    try {
        const findCollege = await college.findByIdAndDelete(id)
        if(!findCollege){
            return res.status(404).json('College not found')
        }
        
        res.status(200).json(findCollege)
    } catch (err) {
        res.status(401).json(err)
    }
}