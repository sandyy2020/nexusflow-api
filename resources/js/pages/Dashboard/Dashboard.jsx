import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import dashboardService from "../../services/dashboardService";
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

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const response = await dashboardService.getDashboard();

            setStats(response.data.data.summary);
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
                </div>
            )}
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
