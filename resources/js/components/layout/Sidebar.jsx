import {
    FaTachometerAlt,
    FaUsers,
    FaUserShield,
    FaKey,
    FaBuilding,
    FaUsersCog,
    FaProjectDiagram,
    FaTasks,
    FaCog,
    FaIdBadge
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const menus = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Users", path: "/users", icon: <FaUsers /> },
    { name: "Roles", path: "/roles", icon: <FaUserShield /> },
    { name: "Permissions", path: "/permissions", icon: <FaKey /> },
    { name: "Departments", path: "/departments", icon: <FaBuilding /> },
    { name: "Designations", path: "/designations", icon: <FaIdBadge /> },
    { name: "Teams", path: "/teams", icon: <FaUsersCog /> },
    { name: "Projects", path: "/projects", icon: <FaProjectDiagram /> },
    { name: "Tasks", path: "/tasks", icon: <FaTasks /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
];

export default function Sidebar() {
    return (
        <aside className="w-64 bg-slate-900 text-white min-h-screen shadow-lg">
            <div className="h-16 flex items-center justify-center border-b border-slate-700">
                <h1 className="text-2xl font-bold text-blue-400">
                    NexusFlow
                </h1>
            </div>

            <nav className="mt-5">
                {menus.map((menu) => (
                    <NavLink
                        key={menu.path}
                        to={menu.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-6 py-3 transition-all ${
                                isActive
                                    ? "bg-blue-600"
                                    : "hover:bg-slate-800"
                            }`
                        }
                    >
                        {menu.icon}
                        {menu.name}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}