const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Routes for users
router.post(
  "/users",
  [
    // Validate first name
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("First name is required")
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters long"),

    // Validate last name
    body("lastName")
      .trim()
      .notEmpty()
      .withMessage("Last name is required")
      .isLength({ min: 2 })
      .withMessage("Last name must be at least 2 characters long"),

    // Validate email
    body("email")
      .isEmail()
      .withMessage("Please provide a valid email address")
      .normalizeEmail(),

    // Validate department
    body("department")
      .trim()
      .notEmpty()
      .withMessage("Department is required")
      .isLength({ min: 2 })
      .withMessage("Department must be at least 2 characters long"),
  ],
  createUser
);

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.put(
  "/users/:id",
  [
    // Validate first name
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("First name is required")
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters long"),

    // Validate last name
    body("lastName")
      .trim()
      .notEmpty()
      .withMessage("Last name is required")
      .isLength({ min: 2 })
      .withMessage("Last name must be at least 2 characters long"),

    // Validate email
    body("email")
      .isEmail()
      .withMessage("Please provide a valid email address")
      .normalizeEmail(),

    // Validate department
    body("department")
      .trim()
      .notEmpty()
      .withMessage("Department is required")
      .isLength({ min: 2 })
      .withMessage("Department must be at least 2 characters long"),
  ],
  updateUser
);
router.delete("/users/:id", deleteUser);

module.exports = router;
