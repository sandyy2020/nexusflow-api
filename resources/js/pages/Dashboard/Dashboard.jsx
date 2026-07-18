import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import dashboardService from "../../services/dashboardService";
import DepartmentChart from "../../components/dashboard/DepartmentChart";
import RoleChart from "../../components/dashboard/RoleChart";
import GrowthChart from "../../components/dashboard/GrowthChart";
import RecentActivity from "../../components/dashboard/RecentActivity";
import {
    FaUsers,
    FaUserCheck,
    FaUserTimes,
    FaUserShield,
    FaKey,
    FaBuilding,
} from "react-icons/fa";

export default function Dashboard() {
    const [stats, setStats] = useState({
        users: 0,
        roles: 0,
        permissions: 0,
        departments: 0,
    });

    const [loading, setLoading] = useState(true);
    const [latestUsers, setLatestUsers] = useState([]);
    const [departmentStats, setDepartmentStats] = useState([]);
    const [roleStats, setRoleStats] = useState([]);
    const [growthStats, setGrowthStats] = useState([]);
    const [recentActivities, setRecentActivities] = useState([]);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const response = await dashboardService.getDashboard();
            const data = response.data.data;
            setStats(data.summary);
            setLatestUsers(data.latest_users);
            setDepartmentStats(data.department_stats);
            setRoleStats(data.role_stats);
            setGrowthStats(data.growth_stats);
            setRecentActivities(data.recent_activity);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    <Card
                        title="Users"
                        value={stats.users}
                        icon={<FaUsers size={28} />}
                        color="bg-blue-600"
                    />

                    <Card
                        title="Active Users"
                        value={stats.active_users}
                        icon={<FaUserCheck size={28} />}
                        color="bg-green-600"
                    />

                    <Card
                        title="Inactive Users"
                        value={stats.inactive_users}
                        icon={<FaUserTimes size={28} />}
                        color="bg-red-600"
                    />

                    <Card
                        title="Roles"
                        value={stats.roles}
                        icon={<FaUserShield size={28} />}
                        color="bg-purple-600"
                    />

                    <Card
                        title="Permissions"
                        value={stats.permissions}
                        icon={<FaKey size={28} />}
                        color="bg-yellow-500"
                    />

                    <Card
                        title="Departments"
                        value={stats.departments}
                        icon={<FaBuilding size={28} />}
                        color="bg-cyan-600"
                    />
                    <Card
                        title="New Users"
                        value={stats.new_users_month}
                        icon={<FaUsers size={28} />}
                        color="bg-pink-600"
                    />
                </div>
            )}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
                <DepartmentChart data={departmentStats} />
                <RoleChart data={roleStats} />
            </div>
            <div className="mt-8">
                <GrowthChart data={growthStats} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-xl font-bold mb-4">Latest Users</h2>
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-2">Name</th>
                                <th className="text-left py-2">Email</th>
                                <th className="text-left py-2">Department</th>
                                <th className="text-left py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {latestUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="py-3">{user.name}</td>
                                    <td className="py-3">{user.email}</td>
                                    <td className="py-3">
                                        {user.department?.name ?? "-"}
                                    </td>
                                    <td>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                user.status
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {user.status
                                                ? "Active"
                                                : "Inactive"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-xl font-bold mb-4">
                        Users by Department
                    </h2>

                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-2">Department</th>

                                <th className="text-right py-2">Users</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departmentStats.map((department) => (
                                <tr
                                    key={department.id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="py-3">
                                        {department.name}
                                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                            <div
                                                className="bg-blue-500 h-2 rounded-full"
                                                style={{
                                                    width: `${Math.min(
                                                        department.users_count *
                                                            15,
                                                        100,
                                                    )}%`,
                                                }}
                                            />
                                        </div>
                                    </td>

                                    <td className="text-right py-3 font-semibold">
                                        {department.users_count}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="bg-white rounded-xl shadow p-6 mt-8">
                <h2 className="text-xl font-bold mb-4">Users by Role</h2>

                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-2">Role</th>

                            <th className="text-right py-2">Users</th>
                        </tr>
                    </thead>

                    <tbody>
                        {roleStats.map((role) => (
                            <tr
                                key={role.id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="py-3">{role.name}</td>

                                <td className="text-right py-3 font-semibold">
                                    {role.total}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-8">
                <RecentActivity activities={recentActivities} />
            </div>
        </AdminLayout>
    );
}

function Card({ title, value, icon, color }) {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-gray-500 text-sm">{title}</p>

                    <h2 className="text-4xl font-bold mt-3">{value}</h2>
                </div>

                <div className={`${color} text-white p-4 rounded-full`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}
