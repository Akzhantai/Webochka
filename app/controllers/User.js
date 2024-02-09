// UserController.js

// Create and Save a new user
const UserModel = require('../model/user');

// UserController.js

const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const { loginEmail, loginPassword } = req.body;

    try {
        // Check if the user with the provided email exists
        const user = await UserModel.findOne({ email: loginEmail });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(loginPassword, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // You can set a session or generate a token for authentication here
        // For simplicity, let's just send a success message for now
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while processing login",
        });
    }
};


exports.create = async (req, res) => {
    if (!req.body.email || !req.body.firstName || !req.body.lastName || !req.body.phone || !req.body.password) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        // Check if the user with the provided email already exists
        const existingUser = await UserModel.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists!" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user
        const newUser = new UserModel({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            password: hashedPassword,
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        res.status(201).json({
            message: "User created successfully!",
            user: savedUser,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while creating user",
        });
    }
};

// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Error occurred while retrieving users",
        });
    }
};

// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Error occurred while retrieving user",
        });
    }
};

// Update a user by the id in the request
exports.update = async (req, res) => {
    const { email, firstName, lastName, phone, password } = req.body;

    try {
        const updatedUser = {
            email,
            firstName,
            lastName,
            phone,
            password,
        };

        const user = await UserModel.findByIdAndUpdate(
            req.params.id,
            updatedUser,
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Error occurred while updating user",
        });
    }
};

// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndRemove(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Error occurred while deleting user",
        });
    }
};