const User = require("../models/userModel");
const { validationResult } = require("express-validator");

// Controller to create a new user
const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, department } = req.body;
  const isUserAlreadyExists = await User.findOne({ email });
  if (isUserAlreadyExists) {
    return res.status(400).json({ error: "User already exists" });
  }
  try {
    const newUser = new User({ firstName, lastName, email, department });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Error creating user", message: err.message });
  }
};

// Controller to get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Error fetching users", message: err.message });
  }
};

// Controller to get a single user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Error fetching user", message: err.message });
  }
};

// Controller to update a user
const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params;
  const { firstName, lastName, email, department } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email, department },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json(updatedUser);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Error updating user", message: err.message });
  }
};

// Controller to delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Error deleting user", message: err.message });
  }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
