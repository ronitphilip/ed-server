const enquiry = require('../models/studentEnquiryModel');

// Create enquiry
exports.createEnquiryController = async (req, res) => {
    console.log('Inside createEnquiryController');

    const { name, mobileNumber, locality, highestQualification, preferredCollege, preferredCourse } = req.body;
    console.log('Request Body:', name, mobileNumber, locality, highestQualification, preferredCollege, preferredCourse);  // Debugging line

    try {
        const exisingenquiry = await enquiry.findOne({ mobileNumber });
        
        if (exisingenquiry) {
            return res.status(400).json("Enquiry already exists");
        }

        const inquiry = new enquiry({
            name, mobileNumber, locality, highestQualification, preferredCollege, preferredCourse
        });

        await inquiry.save();
        res.status(200).json(inquiry);
    } catch (err) {
        console.error(err);
        res.status(401).json(err);
    }
};

// update enquiry status
exports.updateEnquiryController = async (req, res) => {
    console.log('Inside updateEnquiryController');
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.admin.userId

    try {
        const inquiry = await enquiry.findByIdAndUpdate(id, { status, agent: userId }, { new: true });
        if (!inquiry) {
            return res.status(404).json('Inquiry not found');
        }
        res.status(200).json(inquiry);
    } catch (err) {
        res.status(401).json(err);
    }
}

// all enquires
exports.getEnquiryController = async (req, res) => { 
    console.log('Inside getEnquiryController');

    try {
        const enquires = await enquiry.find().sort({ createdAt: -1 });
        res.status(200).json(enquires);
    } catch (err) {
        res.status(401).json(err);
    }
}
