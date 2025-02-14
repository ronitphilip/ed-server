const users = require('../models/userModel')
const bCrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// register new user
exports.registerController = async (req, res) => {
    console.log('Inside registerController');
    const { username, email, password } = req.body;

    try {
        const existingUser = await users.findOne({ email })

        if (existingUser) {
            res.status(406).json("User already exists!")
        } else {
            const encryptedPassword = await bCrypt.hash(password, 10)
            const newUser = new users({
                username, email, password: encryptedPassword
            })
            await newUser.save()
            res.status(200).json(newUser)
        }

    } catch (err) {
        res.status(401).json(err)
    }
};

// login
exports.loginController = async (req, res) => {
    console.log('Inside loginController');
    const { email, password } = req.body;

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            const isMatch = await bCrypt.compare(password, existingUser.password)
            if (isMatch) {
                const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_Key)
                res.status(200).json({
                    user: existingUser, token
                })
            } else {
                res.status(406).json("Invalid password")
            }
        } else {
            res.status(404).json("User doesnot exists, please register")
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

// save college
exports.saveCollege = async (req, res) => {
    console.log('Inside saveCollege');
    const userId = req.payload
    const { collegeId } = req.body
    console.log(userId, collegeId);

    try {
        const existingUser = await users.findOne({ _id: userId })
        if (!existingUser) {
            return res.status(404).json("User doesnot exists")
        }

        if (existingUser.saved.includes(collegeId)) {
            return res.status(400).json("College already saved");
        }

        existingUser.saved.push(collegeId);
        await existingUser.save();

        res.status(200).json(existingUser);
    } catch (err) {
        res.status(401).json(err)
    }
}

// get all saved
exports.getAllSavedColleges = async (req, res) => {
    console.log('Inside getAllSavedColleges');
    const userId = req.payload

    try {
        const existingUser = await users.findOne({ _id: userId })
            .populate('saved')
            .populate('testimonials')
        res.status(200).json(existingUser)
    } catch (err) {
        res.status(401).json(err)
    }
}

// Remove saved college
exports.removeSavedCollege = async (req, res) => {
    console.log('Inside removeSavedCollege');
    const userId = req.payload;
    const { collegeId } = req.params;

    try {
        const updatedUser = await users.findOneAndUpdate(
            { _id: userId },
            { $pull: { saved: collegeId } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json("User not found");
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(401).json(err);
    }
};

// get all users
exports.getAllUsersController = async (req, res) => {
    console.log('Inside getAllUsersController');

    try {
        const allusers = await users.find({ role: 'user' });

        res.status(200).json(allusers);
    } catch (err) {
        res.status(401).json(err)
    }
}

// delete a user
exports.deleteUserController = async (req, res) => {
    console.log('Inside deleteUserController');
    const { id } = req.params;

    try {
        const deletedUser = await users.findOneAndDelete({ _id: id });
        if (!deletedUser) {
            return res.status(404).json("User not found");
        }
        res.status(200).json(deletedUser);
    } catch (err) {
        res.status(401).json(err);
    }
}