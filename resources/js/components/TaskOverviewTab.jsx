export default function TaskOverviewTab({ task }) {
    return (
        <div className="grid grid-cols-2 gap-6">
            <div className="bg-white border rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-4">
                    Basic Information
                </h3>

                <div className="space-y-3">
                    <div>
                        <strong>Task Code:</strong> {task.task_code}
                    </div>

                    <div>
                        <strong>Title:</strong> {task.title}
                    </div>

                    <div>
                        <strong>Description:</strong>
                        <div className="mt-1 text-gray-600">
                            {task.description || "-"}
                        </div>
                    </div>

                    <div>
                        <strong>Project:</strong> {task.project?.name ?? "-"}
                    </div>

                    <div>
                        <strong>Priority:</strong>{" "}
                        {task.task_priority?.name ?? "-"}
                    </div>

                    <div>
                        <strong>Progress:</strong> {task.progress ?? 0}%
                    </div>
                </div>
            </div>

            <div className="bg-white border rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-4">Dates</h3>

                <div className="space-y-3">
                    <div>
                        <strong>Start Date:</strong> {task.start_date || "-"}
                    </div>

                    <div>
                        <strong>Due Date:</strong> {task.due_date || "-"}
                    </div>

                    <div>
                        <strong>Status:</strong>{" "}
                        {task.status ? "Active" : "Inactive"}
                    </div>

                    <div>
                        <strong>Billable:</strong>{" "}
                        {task.is_billable ? "Yes" : "No"}
                    </div>

                    <div>
                        <strong>Created:</strong> {task.created_at}
                    </div>

                    <div>
                        <strong>Updated:</strong> {task.updated_at}
                    </div>
                </div>
            </div>
        </div>
    );
}
