const users = require('../models/userModel');
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Admin login
exports.adminLogin = async (req, res) => {
    console.log('Inside adminLogin');
    const { email, password } = req.body;

    try {
        const admin = await users.findOne({ email });
        if (!admin) {
            return res.status(404).json("Admin not found");
        }

        if (admin.role !== 'admin') {
            return res.status(403).json("You are not authorized");
        }

        const isMatch = await bCrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json("Invalid credentials");
        }

        const token = jwt.sign({ userId: admin._id, role: admin.role }, process.env.JWT_Key);
        
        const adminData = {
            _id: admin._id,
            name: admin.username,
            email: admin.email,
            role: admin.role,
        };

        res.status(200).json({ admin: adminData, token });

    } catch (err) {
        res.status(500).json(err);
    }
};

// Admin password change
exports.changeAdminPassword = async (req, res) => {
    console.log('Inside changeAdminPassword');
    const { email, oldPassword, newPassword } = req.body;

    try {
        const admin = await users.findOne({ email });
        if (!admin) {
            return res.status(404).json("Admin not found");
        }

        if (admin.role !== 'admin') {
            return res.status(403).json("You are not authorized");
        }

        const isMatch = await bCrypt.compare(oldPassword, admin.password);
        if (!isMatch) {
            return res.status(401).json("Incorrect old password");
        }

        const hashedPassword = await bCrypt.hash(newPassword, 10);
        admin.password = hashedPassword;
        await admin.save();

        res.status(200).json("Password updated successfully");

    } catch (err) {
        res.status(500).json(err);
    }
};

// create new admin
exports.createNewAdmin = async (req, res) => {
    console.log('Inside createNewAdmin');
    const { username, email, password } = req.body;

    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(400).json("Admin already exists");
        }

        const hashedPassword = await bCrypt.hash(password, 10);
        const newAdmin = new users({
            username,
            email,
            password: hashedPassword,
            role: 'admin'
        });

        await newAdmin.save();
        res.status(201).json("New admin created successfully");

    } catch (err) {
        res.status(500).json(err);
    }
};
