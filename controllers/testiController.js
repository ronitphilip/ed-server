const testimonial = require('../models/testiModel');
const users = require('../models/userModel');

// add new testimonial
exports.addTestimonial = async (req, res) => {
    console.log('Inside addTestimonial');

    const userId = req.payload;
    const { message } = req.body;

    try {
        const userExists = await users.findById(userId).populate('testimonials');

        if (!userExists) {
            return res.status(404).json("User not found");
        }

        if (userExists.testimonials.length > 0) {
            return res.status(400).json("You have already added a testimonial.");
        }

        const newTestimonial = new testimonial({
            userId, message
        });

        await newTestimonial.save();

        await users.findByIdAndUpdate(userId, {
            $set: { testimonials: [newTestimonial._id] }
        });

        res.status(200).json(newTestimonial);
    } catch (err) {
        res.status(401).json(err);
    }
};

// delete testimonial
exports.deleteTestimonial = async (req, res) => {
    console.log('Inside deleteTestimonial');

    const userId = req.payload;

    try {
        const user = await users.findById(userId).populate('testimonials');

        if (!user) {
            return res.status(404).json("User not found");
        }

        if (user.testimonials.length === 0) {
            return res.status(400).json("No testimonial found to delete");
        }

        const testimonialId = user.testimonials[0]._id;

        await testimonial.findByIdAndDelete(testimonialId);

        await users.findByIdAndUpdate(userId, { $set: { testimonials: [] } });

        res.status(200).json(user);
    } catch (err) {
        res.status(401).json(err);
    }
};

// set status of testimonial
exports.setStatusOfTestimonial = async (req, res) => {
    console.log('Inside setStatusOfTestimonial');
    const testimonialId = req.params.id;
    const { status } = req.body;

    try {
        const updatedTestimonial = await testimonial.findByIdAndUpdate(
            testimonialId,
            { status },
            { new: true }
        );

        if (!updatedTestimonial) {
            return res.status(404).json('Testimonial not found');
        }

        res.status(200).json(updatedTestimonial);
    } catch (err) {
        res.status(401).json(err)
    }
}

// all testimonials
exports.getAllTestimonials = async (req, res) => {
    console.log('Inside getAllTestimonials');
    
    try {
        const allTesti = await testimonial.find()
        .populate('userId')
        res.status(200).json(allTesti)
    } catch (err) {
        res.status(401).json(err)
    }
}

// get all success testimonials
exports.getSuccessTestimonials = async (req, res) => {
    console.log('Inside getSuccessTestimonials');
    
    try {
        const acceptedTesimonials = await testimonial.find({ status: 'success' })
        .populate('userId')

        if(!acceptedTesimonials){
            res.status(404).json('Testimony not found')
        }

        res.status(200).json(acceptedTesimonials)

    } catch (err) {
        res.status(401).json(err)
    }
}