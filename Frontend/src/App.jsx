import { Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <Routes>
          <Route path="/" exact element={<UserList />} />
          <Route path="/add" element={<UserForm />} />
          <Route path="/edit/:userId" element={<UserForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
