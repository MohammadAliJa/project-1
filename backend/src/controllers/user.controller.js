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
        const newUser = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false
        });

        res.status(201).json({ message: "User registered successfully", user: { userId: newUser._id, email: newUser.email, username: newUser.username } });

    } catch (error) {
        res.status(500).json({ message: "Server error!", error: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        //checking id user already exists
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) return res.status(404).json({
            message: "User not found"
        });


        //compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({
            message: "Invalid credentials"
        })

        res.status(200).json({
            message: "Successfully Logged In",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })

    }
}
export {
    registerUser,
    loginUser
};