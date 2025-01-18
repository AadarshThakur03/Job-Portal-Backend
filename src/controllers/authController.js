// controllers/authController.js
import UserModel from '../models/userModel.js';
import { registerUser, loginUser, getUserFromToken } from '../services/authService.js';

export const register = async (req, res) => {
    const { username, email, mobile, password, userType } = req.body;

    // Validate required fields
    if (!username || !email || !mobile || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Create user instance
    const user = new UserModel({ username, email, mobile, password, userType });

    try {
        // Register user using auth service
        const response = await registerUser(user);
        if (response.success) {
            return res.status(201).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        console.error('Error in user registration:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Registration failed. Please try again later.' 
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    try {
        // Call loginUser function from auth service
        const response = await loginUser(email, password);
        
        if (response.success) {
            return res.status(200).json(response); // Login successful
        } else {
            return res.status(401).json(response); // Unauthorized
        }
    } catch (error) {
        console.error('Error in user login:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Login failed. Please try again later.' 
        });
    }
};

export const getUserDetails = async (req, res) => {
    
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header
    console.log(token);

    if (!token) {
        return res.status(401).json({ success: false, message: 'Token not provided' });
    }

    try {
        const response = await getUserFromToken(token);

        if (response.success) {
            return res.status(200).json({ success: true, user: response.user });
        } else {
            return res.status(401).json({ success: false, message: response.message });
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({ success: false, message: 'Failed to retrieve user details' });
    }
};
