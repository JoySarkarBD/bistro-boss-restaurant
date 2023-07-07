const User = require('../models/UserModel');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, address, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({
            name,
            email,
            address,
            password,
            role
        });

        // Save the user to the database
        await newUser.save();

        // Respond with the registered user
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

