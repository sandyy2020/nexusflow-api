import { FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <header className="h-16 bg-white shadow px-6 flex justify-between items-center">
            <input
                type="text"
                placeholder="Search..."
                className="border rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex items-center gap-6">
                <FaBell className="text-xl text-gray-600 cursor-pointer" />

                <div className="flex items-center gap-2">
                    <FaUserCircle className="text-3xl text-gray-600" />
                    <span className="font-medium">Super Admin</span>
                </div>

                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}