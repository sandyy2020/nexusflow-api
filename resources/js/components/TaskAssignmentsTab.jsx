import { useEffect, useState } from "react";
import taskAssignmentService from "../services/taskAssignmentService";
import userService from "../services/userService";
import { FaTrash, FaPlus } from "react-icons/fa";

export default function TaskAssignmentsTab({ task }) {
    const [assignments, setAssignments] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (task) {
            loadAssignments();
            loadUsers();
        }
    }, [task]);

    const loadAssignments = async () => {
        try {
            const response = await taskAssignmentService.getAssignments(
                task.id,
            );

            setAssignments(response.data.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const loadUsers = async () => {
        try {
            const response = await userService.getUsers({
                per_page: 100,
            });

            setUsers(response.data.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelect = (e) => {
        const values = Array.from(e.target.selectedOptions, (option) =>
            Number(option.value),
        );

        setSelectedUsers(values);
    };

    const assignUsers = async () => {
        if (selectedUsers.length === 0) return;

        try {
            setLoading(true);

            await taskAssignmentService.assignUsers(task.id, selectedUsers);

            setSelectedUsers([]);

            loadAssignments();
        } catch (error) {
            console.log(error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    const removeUser = async (userId) => {
        if (!window.confirm("Remove this user?")) return;

        try {
            await taskAssignmentService.removeUser(task.id, userId);

            loadAssignments();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="flex gap-3 mb-6">
                <select
                    multiple
                    value={selectedUsers}
                    onChange={handleSelect}
                    className="border rounded p-2 w-80 h-36"
                >
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>

                <button
                    onClick={assignUsers}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded h-fit flex items-center gap-2"
                >
                    <FaPlus />

                    {loading ? "Assigning..." : "Assign"}
                </button>
            </div>

            <div className="overflow-hidden rounded border">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">User</th>

                            <th className="p-3 text-left">Email</th>

                            <th className="p-3 text-left">Role</th>

                            <th className="p-3 text-left">Assigned At</th>

                            <th className="p-3 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {assignments.length > 0 ? (
                            assignments.map((assignment) => (
                                <tr key={assignment.id} className="border-t">
                                    <td className="p-3">
                                        {assignment.user?.name}
                                    </td>

                                    <td className="p-3">
                                        {assignment.user?.email}
                                    </td>

                                    <td className="p-3">{assignment.role}</td>

                                    <td className="p-3">
                                        {assignment.assigned_at}
                                    </td>

                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() =>
                                                removeUser(assignment.user_id)
                                            }
                                            className="text-red-600"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center py-6 text-gray-500"
                                >
                                    No users assigned.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
