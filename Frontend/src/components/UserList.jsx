import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const UserList = () => {
  const [users, setUsers] = useState([]); // All users data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const rowsPerPage = 5; // Display 5 users per page
  const lastPageIndex = currentPage * rowsPerPage;
  const firstPageIndex = lastPageIndex - rowsPerPage;
  const totalPages = Math.ceil(users.length / rowsPerPage); // Calculate total pages
  const currentData = users.slice(firstPageIndex, lastPageIndex); // Slice users for current page

  // Fetch users from the backend API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/users`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setUsers(data); // Set the entire users array to state
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Error fetching users.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete user");
      }

      // If deletion is successful, remove the user from the local state
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Error deleting user.");
    }
  };

  // Handle 'Previous' button click
  const onPrevClick = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Handle 'Next' button click
  const onNextClick = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading)
    return (
      <div className="text-center p-4">
        <LoadingSpinner variant={"danger"} />
      </div>
    );
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">User List</h1>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2 font-medium text-gray-700">S.No</th>
            <th className="px-4 py-2 font-medium text-gray-700">First Name</th>
            <th className="px-4 py-2 font-medium text-gray-700">Last Name</th>
            <th className="px-4 py-2 font-medium text-gray-700">Email</th>
            <th className="px-4 py-2 font-medium text-gray-700">Department</th>
            <th className="px-4 py-2 font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((user, index) => {
              const serialNumber = firstPageIndex + index + 1;
              return (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="px-4 py-2 text-gray-700">{serialNumber}</td>
                  <td className="px-4 py-2 text-gray-700">{user.firstName}</td>
                  <td className="px-4 py-2 text-gray-700">{user.lastName}</td>
                  <td className="px-4 py-2 text-gray-700">{user.email}</td>
                  <td className="px-4 py-2 text-gray-700">{user.department}</td>
                  <td className="px-4 py-2 text-gray-700">
                    <Link
                      to={`/edit/${user._id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={onPrevClick}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Prev
        </button>

        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              } border border-blue-500 px-3 py-2 rounded-md hover:bg-blue-200 transition-colors`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={onNextClick}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
