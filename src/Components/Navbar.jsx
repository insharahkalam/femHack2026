// src/components/Navbar.jsx
import { useNavigate } from "react-router-dom";
import client from "../config";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    await client.auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">ResumePro</h1>
      <div className="space-x-4">
        <button onClick={logout} className="bg-white text-black px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
}
