import { useEffect, useState } from "react";
import taskAssignmentService from "../../services/taskAssignmentService";
import userService from "../../services/userService";

export default function AssignTaskModal({ open, task, onClose, onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        if (open && task) {
            loadUsers();
            loadAssignments();
        }
    }, [open, task]);

    const loadUsers = async () => {
        try {
            const response = await userService.getUsers({
                per_page: 1000,
            });

            setUsers(response.data.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const loadAssignments = async () => {
        try {
            const response = await taskAssignmentService.getAssignments(
                task.id,
            );

            const ids = response.data.data.data.map(
                (assignment) => assignment.user_id,
            );

            setSelectedUsers(ids);
        } catch (error) {
            console.log(error);
        }
    };

    const toggleUser = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter((id) => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };
    const submit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await taskAssignmentService.syncAssignments(task.id, selectedUsers);

            onSuccess();

            onClose();
        } catch (error) {
            console.log(error.response?.data || error);
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-lg w-[650px] max-h-[85vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center border-b px-6 py-4">
                    <h2 className="text-2xl font-bold">Assign Users</h2>

                    <button
                        onClick={onClose}
                        className="text-3xl text-gray-500 hover:text-red-600"
                    >
                        ×
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={submit}>
                    <div className="p-6 overflow-y-auto max-h-[60vh]">
                        <div className="mb-5">
                            <h3 className="font-semibold text-lg">Task</h3>

                            <div className="text-blue-600 font-medium">
                                {task.title}
                            </div>
                        </div>

                        <div className="border rounded-lg">
                            {users.length === 0 ? (
                                <div className="p-5 text-center text-gray-500">
                                    No users found.
                                </div>
                            ) : (
                                users.map((user) => (
                                    <label
                                        key={user.id}
                                        className="flex items-center justify-between border-b last:border-b-0 px-4 py-3 hover:bg-gray-50 cursor-pointer"
                                    >
                                        <div>
                                            <div className="font-medium">
                                                {user.name}
                                            </div>

                                            <div className="text-sm text-gray-500">
                                                {user.email}
                                            </div>
                                        </div>

                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(
                                                user.id,
                                            )}
                                            onChange={() => toggleUser(user.id)}
                                        />
                                    </label>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 border-t px-6 py-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="border px-5 py-2 rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-2 rounded"
                        >
                            {loading ? "Saving..." : "Save Assignments"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
