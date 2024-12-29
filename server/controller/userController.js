const User = require('../model/user');

exports.createUser = async (req, res) => {
    try {
        const {
            name,
            email,
            gender,
            phoneNumber,
            role,
            profilePicture,
            status,
        } = req.body;

        // Validate required fields
        if (!name || !email || !gender) {
            return res.status(400).json({ message: 'Name, email, and gender are required.' });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered.' });
        }

        // Create the user object
        const user = new User({
            name,
            email,
            gender,
            phoneNumber,
            role,
            profilePicture,
            status,
        });

        // Save the user to the database
        await user.save();

        // Respond with the created user
        const { password, ...responseUser } = user.toObject(); // Exclude password if added later
        return res.status(201).json({
            message: 'User created successfully.',
            user: responseUser,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to create user.', error: error.message });
    }
};
