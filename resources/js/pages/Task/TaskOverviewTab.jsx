export default function TaskOverviewTab({ task }) {
    return (
        <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white border rounded-lg shadow-sm">
                <div className="border-b px-5 py-3">
                    <h3 className="text-lg font-semibold">Basic Information</h3>
                </div>

                <div className="grid grid-cols-2 gap-6 p-5">
                    <div>
                        <label className="block text-sm text-gray-500">
                            Task Code
                        </label>

                        <div className="font-medium">
                            {task.task_code ?? "-"}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500">
                            Title
                        </label>

                        <div className="font-medium">{task.title}</div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500">
                            Project
                        </label>

                        <div>{task.project?.name ?? "-"}</div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500">
                            Priority
                        </label>

                        <div>{task.task_priority?.name ?? "-"}</div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500">
                            Status
                        </label>

                        <div>
                            {task.task_status?.name ??
                                (task.status ? "Active" : "Inactive")}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500">
                            Progress
                        </label>

                        <div className="flex items-center gap-3">
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className="bg-blue-600 h-3 rounded-full"
                                    style={{
                                        width: `${task.progress ?? 0}%`,
                                    }}
                                />
                            </div>

                            <span className="font-semibold">
                                {task.progress ?? 0}%
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500">
                            Start Date
                        </label>

                        <div>{task.start_date ?? "-"}</div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500">
                            Due Date
                        </label>

                        <div>{task.due_date ?? "-"}</div>
                    </div>
                </div>
            </div>

            {/* Work Information */}
            <div className="bg-white border rounded-lg shadow-sm">
                <div className="border-b px-5 py-3">
                    <h3 className="text-lg font-semibold">Work Information</h3>
                </div>

                <div className="grid grid-cols-2 gap-6 p-5">
                    <div>
                        <label className="block text-sm text-gray-500">
                            Story Points
                        </label>

                        <div>{task.story_points ?? "-"}</div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500">
                            Estimated Hours
                        </label>

                        <div>{task.estimated_hours ?? "-"}</div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500">
                            Actual Hours
                        </label>

                        <div>{task.actual_hours ?? "-"}</div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500">
                            Billable
                        </label>

                        <div>{task.is_billable ? "Yes" : "No"}</div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500">
                            Created By
                        </label>

                        <div>{task.creator?.name ?? "-"}</div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500">
                            Updated By
                        </label>

                        <div>{task.updater?.name ?? "-"}</div>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="bg-white border rounded-lg shadow-sm">
                <div className="border-b px-5 py-3">
                    <h3 className="text-lg font-semibold">Description</h3>
                </div>

                <div className="p-5 whitespace-pre-wrap text-gray-700">
                    {task.description || "No description available."}
                </div>
            </div>
        </div>
    );
}
