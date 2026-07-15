import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import dashboardService from "../../services/dashboardService";

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
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    <Card title="Users" value={stats.users} />

                    <Card title="Roles" value={stats.roles} />

                    <Card title="Permissions" value={stats.permissions} />

                    <Card title="Active Users" value={stats.active_users} />

                    <Card title="Inactive Users" value={stats.inactive_users} />
                </div>
            )}
        </AdminLayout>
    );
}

function Card({ title, value }) {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500">{title}</h3>

            <p className="text-4xl font-bold mt-3">{value}</p>
        </div>
    );
}
