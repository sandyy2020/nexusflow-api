import { FaTimes } from "react-icons/fa";

export default function ViewTaskModal({ open, task, onClose }) {
    if (!open || !task) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[600px] p-6">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-bold">Task Details</h2>

                    <FaTimes
                        onClick={onClose}
                        className="text-gray-600 cursor-pointer text-xl"
                    />
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="font-semibold">Task Code</label>

                        <p>{task.task_code}</p>
                    </div>

                    <div>
                        <label className="font-semibold">Title</label>

                        <p>{task.title}</p>
                    </div>

                    <div>
                        <label className="font-semibold">Description</label>

                        <p>{task.description || "-"}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="font-semibold">Project</label>

                            <p>{task.project?.name ?? "-"}</p>
                        </div>

                        <div>
                            <label className="font-semibold">Priority</label>

                            <p>{task.task_priority?.name ?? "-"}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="font-semibold">Progress</label>

                            <p>{task.progress ?? 0} %</p>
                        </div>

                        <div>
                            <label className="font-semibold">Status</label>

                            <p>
                                {task.status ? (
                                    <span className="text-green-600 font-semibold">
                                        Active
                                    </span>
                                ) : (
                                    <span className="text-red-600 font-semibold">
                                        Inactive
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="font-semibold">Start Date</label>

                            <p>{task.start_date ?? "-"}</p>
                        </div>

                        <div>
                            <label className="font-semibold">Due Date</label>

                            <p>{task.due_date ?? "-"}</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="bg-gray-600 text-white px-5 py-2 rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
