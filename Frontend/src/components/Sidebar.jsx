import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-6 flex flex-col">
      <div className="flex items-center justify-center mb-6">
        <Link to="/">
          <h1 className="text-2xl font-bold text-center text-white">
            User Management
          </h1>
        </Link>
      </div>

      <ul className="flex flex-col space-y-4">
        <li>
          <Link
            to="/"
            className="flex items-center text-lg hover:text-gray-300 transition-all duration-200"
          >
            View Users
          </Link>
        </li>
        <li>
          <Link
            to="/add"
            className="flex items-center text-lg hover:text-gray-300 transition-all duration-200"
          >
            Add User
          </Link>
        </li>
      </ul>

      <div className="mt-auto text-center text-sm text-gray-400">
        <p>&copy; 2025 User Management</p>
      </div>
    </div>
  );
};

export default Sidebar;
