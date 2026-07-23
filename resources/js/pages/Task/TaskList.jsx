import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

import taskService from "../../services/taskService";

import CreateTaskModal from "./CreateTaskModal";
import EditTaskModal from "./EditTaskModal";
// import ViewTaskModal from "./ViewTaskModal";
import TaskDetailsModal from "./TaskDetailsModal";
import DeleteTaskModal from "./DeleteTaskModal";
import AssignTaskModal from "./AssignTaskModal";

import {
    FaEye,
    FaEdit,
    FaTrash,
    FaToggleOn,
    FaToggleOff,
    FaUsers,
} from "react-icons/fa";

export default function TaskList() {
    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [meta, setMeta] = useState({});
    const [links, setLinks] = useState({});

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState("");

    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [assignOpen, setAssignOpen] = useState(false);

    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, [page, perPage, search]);

    const fetchTasks = async () => {
        setLoading(true);

        try {
            const response = await taskService.getTasks({
                page,
                per_page: perPage,
                search,
            });

            console.log("Task Response:", response);
            console.log("Task Response Data:", response.data);

            setTasks(response.data.data);
            setMeta(response.data.meta);
            setLinks(response.data.links);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const openView = (task) => {
        setSelectedTask(task);

        setViewOpen(true);
    };

    const openEdit = (task) => {
        setSelectedTask(task);

        setEditOpen(true);
    };

    const openDelete = (task) => {
        setSelectedTask(task);

        setDeleteOpen(true);
    };

    const openAssign = (task) => {
        setSelectedTask(task);
        setAssignOpen(true);
    };

    const handleStatus = async (task) => {
        try {
            await taskService.changeStatus(task.id);

            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Task Management</h1>

                <button
                    onClick={() => setCreateOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
                >
                    Add Task
                </button>
            </div>

            <div className="flex justify-between mb-5">
                <input
                    className="border rounded px-3 py-2 w-80"
                    placeholder="Search Task..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);

                        setPage(1);
                    }}
                />

                <select
                    className="border rounded px-3 py-2"
                    value={perPage}
                    onChange={(e) => {
                        setPerPage(Number(e.target.value));

                        setPage(1);
                    }}
                >
                    <option value={10}>10</option>

                    <option value={25}>25</option>

                    <option value={50}>50</option>
                </select>
            </div>

            {loading ? (
                <div className="text-center py-10">Loading...</div>
            ) : (
                <div className="bg-white shadow rounded overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left">ID</th>

                                <th className="p-3 text-left">Code</th>

                                <th className="p-3 text-left">Task</th>

                                <th className="p-3 text-left">Project</th>

                                <th className="p-3 text-left">Assignees</th>

                                <th className="p-3 text-left">Priority</th>

                                <th className="p-3 text-left">Progress</th>

                                <th className="p-3 text-left">Status</th>

                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tasks.length > 0 ? (
                                tasks.map((task) => (
                                    <tr key={task.id} className="border-t">
                                        <td className="p-3">{task.id}</td>

                                        <td className="p-3">
                                            {task.task_code}
                                        </td>

                                        <td className="p-3">{task.title}</td>

                                        <td className="p-3">
                                            {task.project?.name ?? "-"}
                                        </td>

                                        <td className="p-3">
                                            <div className="flex flex-wrap gap-1">
                                                {task.assigned_users?.length ? (
                                                    task.assigned_users.map(
                                                        (user) => (
                                                            <span
                                                                key={user.id}
                                                                className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                                                            >
                                                                {user.name}
                                                            </span>
                                                        ),
                                                    )
                                                ) : (
                                                    <span className="text-gray-400">
                                                        Unassigned
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        <td className="p-3">
                                            {task.task_priority?.name ?? "-"}
                                        </td>

                                        <td className="p-3">
                                            {task.progress ?? 0}%
                                        </td>

                                        <td className="p-3">
                                            {task.status ? (
                                                <span className="text-green-600 font-semibold">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="text-red-600 font-semibold">
                                                    Inactive
                                                </span>
                                            )}
                                        </td>

                                        <td className="p-3">
                                            <div className="flex justify-center gap-4">
                                                <FaUsers
                                                    onClick={() =>
                                                        openAssign(task)
                                                    }
                                                    className="text-blue-600 text-xl cursor-pointer"
                                                    title="Assign Users"
                                                />
                                                <FaEye
                                                    onClick={() =>
                                                        openView(task)
                                                    }
                                                    className="text-indigo-600 text-xl cursor-pointer"
                                                />

                                                <FaEdit
                                                    onClick={() =>
                                                        openEdit(task)
                                                    }
                                                    className="text-yellow-500 text-xl cursor-pointer"
                                                />

                                                <FaTrash
                                                    onClick={() =>
                                                        openDelete(task)
                                                    }
                                                    className="text-red-600 text-xl cursor-pointer"
                                                />

                                                {task.status ? (
                                                    <FaToggleOn
                                                        onClick={() =>
                                                            handleStatus(task)
                                                        }
                                                        className="text-green-600 text-xl cursor-pointer"
                                                    />
                                                ) : (
                                                    <FaToggleOff
                                                        onClick={() =>
                                                            handleStatus(task)
                                                        }
                                                        className="text-gray-500 text-xl cursor-pointer"
                                                    />
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="text-center py-10"
                                    >
                                        No Tasks Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {!loading && (
                <div className="flex justify-between mt-6">
                    <button
                        disabled={!links.prev}
                        onClick={() => setPage(page - 1)}
                        className="border px-4 py-2 rounded"
                    >
                        Previous
                    </button>

                    <div>
                        Page {meta.current_page || 1}
                        of
                        {meta.last_page || 1}
                    </div>

                    <button
                        disabled={!links.next}
                        onClick={() => setPage(page + 1)}
                        className="border px-4 py-2 rounded"
                    >
                        Next
                    </button>
                </div>
            )}

            <CreateTaskModal
                open={createOpen}
                onClose={() => setCreateOpen(false)}
                onSuccess={fetchTasks}
            />

            <EditTaskModal
                open={editOpen}
                task={selectedTask}
                onClose={() => setEditOpen(false)}
                onSuccess={fetchTasks}
            />

            <TaskDetailsModal
                open={viewOpen}
                task={selectedTask}
                onClose={() => setViewOpen(false)}
            />

            <DeleteTaskModal
                open={deleteOpen}
                task={selectedTask}
                onClose={() => setDeleteOpen(false)}
                onSuccess={fetchTasks}
            />

            <AssignTaskModal
                open={assignOpen}
                task={selectedTask}
                onClose={() => setAssignOpen(false)}
                onSuccess={fetchTasks}
            />
        </AdminLayout>
    );
}
