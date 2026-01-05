import { User } from '../models/user.model.js';

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //Basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        //Check if user already exists
        const existing = await User.findOne({ email: email.toLowerCase() })
        if (existing) {
            return res.status(409).json({ message: "User already exists" });
        }

        //Create new user
        const newUser = await User.Create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false
        });

        res.status(201).json({ message: "User registered successfully", userId: newUser._id, email: newUser.email, username: newUser.username });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export {
    registerUser
};