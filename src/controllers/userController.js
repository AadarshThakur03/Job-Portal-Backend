// controllers/userController.js
const users = []; // Array to store user data

// Function to get all users
export const getAllUsers = (req, res) => {
  res.json(users); // Send all users as JSON response
};

// Function to create a new user
export const createUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  const newUser = { email, password }; // Create a new user object
  users.push(newUser); // Add the new user to the array
  
  res.status(201).json({ message: 'User registered successfully', user: newUser });
};
