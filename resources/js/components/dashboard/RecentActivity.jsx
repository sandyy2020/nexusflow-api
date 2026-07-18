export default function RecentActivity({ activities }) {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-5">Recent Activity</h2>

            <div className="space-y-4">
                {activities.map((activity) => (
                    <div
                        key={activity.id}
                        className="flex justify-between items-center border-b pb-3"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-full">
                                👤
                            </div>

                            <div>
                                <p className="font-medium">
                                    {activity.message}
                                </p>

                                <p className="text-gray-500 text-sm">
                                    {activity.time}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}