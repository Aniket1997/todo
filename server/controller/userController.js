const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
    try {
        const {
            name,
            email,
            gender,
            phoneNumber,
            password
        } = req.body;

        // Validate required fields
        if (!name || !email || !gender ||!password ||!phoneNumber) {
            return res.status(400).json({ message: 'Name, email, and gender are required.' });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email,phoneNumber});
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create the user object
        const user = new User({
            name,
            email,
            gender,
            phoneNumber,
            password:hashedPassword,
        });

        // Save the user to the database
        await user.save();
        
        return res.status(201).json({
            message: 'User created successfully.',
            user
        });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to create user.', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const JWT_SECRET = process.env.JWT; // Secret key from environment variables
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: 'Failure', message: "User doesn't exist" });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ status: 'Failure', message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '10h' });

        return res.status(200).json({ status: 'Success', message: 'Login Successful', token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'Failure', message: 'Internal Server Error' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        // Assuming `req.user` contains the authenticated user's data
        const { role } = req.user;
        console.log(req);
        // Check if the user is Admin or Super-Admin
        if (role !== 'Admin' && role !== 'Super-Admin') {
            return res.status(403).json({ message: 'Access denied. You are not authorized to view all users.' });
        }

        // Fetch all users
        const users = await User.find().select('-password'); // Exclude passwords from the response
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving users.', error: error.message });
    }
};


