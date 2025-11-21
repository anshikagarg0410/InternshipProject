// backend/controllers/authController.js

import User from '../models/User.js';

// @desc    Register a new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // 1. Check if user exists
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 2. Create user (password is hashed in the model's pre-save hook)
        user = await User.create({ name, email, password });

        // 3. Send success response with token
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: user.getSignedJwtToken(),
        });
    } catch (error) {
        console.error("Error registering user:", error.message);
        // Handle Mongoose validation errors
        res.status(400).json({ message: error.message });
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Find user and explicitly select the password
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 2. Check password
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 3. Send success response with token
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: user.getSignedJwtToken(),
        });
    } catch (error) {
        console.error("Error logging in:", error.message);
        res.status(500).json({ message: 'Server error during login' });
    }
};

export default {
    registerUser,
    loginUser,
};