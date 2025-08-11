import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate

const UserForm = () => {
  const { userId } = useParams(); // Get the id from the URL (if present)
  const navigate = useNavigate(); // useNavigate hook to programmatically navigate

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });
  const [isEdit, setIsEdit] = useState(false); // Track if it's an edit or add operation
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  // Fetch user data if editing (when id is present in the URL)
  useEffect(() => {
    if (userId) {
      setIsEdit(true); // It's an edit operation if there's an id in the URL
      fetchUser(userId); // Fetch the user data
    } else {
      setIsEdit(false); // It's an add operation if there's no id in the URL
    }
  }, [userId]);

  // Function to fetch user data for editing
  const fetchUser = async (userId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/users/${userId}`
      );
      if (!res.ok) throw new Error("User not found");
      const data = await res.json();
      setUser(data); // Set the fetched user data into state
    } catch (err) {
      console.error("Error fetching user:", err);
      setError("Failed to load user data.");
    }
  };

  // Function to handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value }); // Update state with new input value
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  // Validate the form before submission
  const validateForm = () => {
    const errors = {};

    if (!user.firstName.trim()) {
      errors.firstName = "First name is required";
    } else if (user.firstName.trim().length < 2) {
      errors.firstName = "First name must be at least 2 characters long";
    }

    if (!user.lastName.trim()) {
      errors.lastName = "Last name is required";
    } else if (user.lastName.trim().length < 2) {
      errors.lastName = "Last name must be at least 2 characters long";
    }

    if (!user.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      errors.email = "Please provide a valid email address";
    }

    if (!user.department.trim()) {
      errors.department = "Department is required";
    } else if (user.department.trim().length < 2) {
      errors.department = "Department must be at least 2 characters long";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Function to handle form submission (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate form before making the request
    if (!validateForm()) {
      return;
    }

    const method = isEdit ? "PUT" : "POST"; // Decide if it's an add or update operation
    const url = isEdit
      ? `${import.meta.env.VITE_BASE_URL}/users/${userId}` // Update request if editing
      : `${import.meta.env.VITE_BASE_URL}/users`; // Create request if adding

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user), // Send the user data as JSON
      });

      const errorData = await res.json();

      if (!res.ok) {
        // Handle email already exists error
        if (errorData.error && errorData.error.includes("already exists")) {
          setFormErrors((prev) => ({
            ...prev,
            email: "This email is already in use",
          }));
          return;
        }
        // Handle other validation errors
        if (errorData.errors && Array.isArray(errorData.errors)) {
          const backendErrors = {};
          errorData.errors.forEach((err) => {
            backendErrors[err.param] = err.msg;
          });

          setFormErrors(backendErrors);
          return;
        }

        throw new Error(errorData.error || "Failed to save user");
      }

      navigate("/"); // Redirect to user list after form submission
    } catch (err) {
      console.error("Error saving user:", err);
      setError("Failed to save user data.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? "Edit User" : "Add New User"}
      </h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}{" "}
      {/* Show error message */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formErrors.firstName && (
            <p className="text-red-500 text-sm">{formErrors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formErrors.lastName && (
            <p className="text-red-500 text-sm">{formErrors.lastName}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm">{formErrors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Department</label>
          <input
            type="text"
            name="department"
            value={user.department}
            onChange={handleChange}
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formErrors.department && (
            <p className="text-red-500 text-sm">{formErrors.department}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 mt-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isEdit ? "Update" : "Add"} User
        </button>
      </form>
    </div>
  );
};

export default UserForm;
