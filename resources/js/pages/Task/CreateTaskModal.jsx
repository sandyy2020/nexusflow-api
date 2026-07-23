import { useEffect, useState } from "react";
import taskService from "../../services/taskService";
import projectService from "../../services/projectService";
import taskPriorityService from "../../services/taskPriorityService";

export default function CreateTaskModal({ open, onClose, onSuccess }) {
    const [projects, setProjects] = useState([]);
    const [priorities, setPriorities] = useState([]);

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        project_id: "",

        task_priority_id: "",

        title: "",

        description: "",

        progress: 0,

        start_date: "",

        due_date: "",

        is_billable: false,

        status: true,
    });

    useEffect(() => {
        if (open) {
            loadProjects();

            loadPriorities();

            resetForm();
        }
    }, [open]);

    const resetForm = () => {
        setForm({
            project_id: "",

            task_priority_id: "",

            title: "",

            description: "",

            progress: 0,

            start_date: "",

            due_date: "",

            is_billable: false,

            status: true,
        });
    };

    const loadProjects = async () => {
        try {
            const response = await projectService.getProjects({
                per_page: 100,
            });

            setProjects(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const loadPriorities = async () => {
        try {
            const response = await taskPriorityService.getTaskPriorities({
                per_page: 100,
            });

            console.log("PRIORITY RESPONSE", response.data);

            setPriorities(response.data.data);
        } catch (error) {
            console.log("PRIORITY ERROR", error.response?.data);

            setPriorities([]);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,

            [name]: type === "checkbox" ? checked : value,
        });
    };

    const submit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await taskService.createTask({
                ...form,

                task_priority_id: form.task_priority_id || null,

                progress: Number(form.progress),
            });

            onSuccess();

            onClose();
        } catch (error) {
            console.log(error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-lg w-[650px] p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Create Task</h2>

                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-500 hover:text-red-600"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={submit}>
                    <label className="block mb-2 font-medium">
                        Select Project
                    </label>

                    <select
                        name="project_id"
                        value={form.project_id}
                        onChange={handleChange}
                        className="border rounded w-full p-2 mb-4"
                        required
                    >
                        <option value="">Select Project</option>

                        {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </select>

                    <label className="block mb-2 font-medium">Priority</label>

                    <select
                        name="task_priority_id"
                        value={form.task_priority_id}
                        onChange={handleChange}
                        className="border rounded w-full p-2 mb-4"
                    >
                        <option value="">Select Priority</option>

                        {priorities.map((priority) => (
                            <option key={priority.id} value={priority.id}>
                                {priority.name}
                            </option>
                        ))}
                    </select>

                    <label className="block mb-2 font-medium">Task Title</label>

                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="border rounded w-full p-2 mb-4"
                        required
                    />

                    <label className="block mb-2 font-medium">
                        Description
                    </label>

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows="3"
                        className="border rounded w-full p-2 mb-4"
                    />

                    <label className="block mb-2 font-medium">
                        Progress (%)
                    </label>

                    <input
                        type="number"
                        name="progress"
                        min="0"
                        max="100"
                        value={form.progress}
                        onChange={handleChange}
                        className="border rounded w-full p-2 mb-4"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label>Start Date</label>

                            <input
                                type="date"
                                name="start_date"
                                value={form.start_date}
                                onChange={handleChange}
                                className="border rounded w-full p-2"
                            />
                        </div>

                        <div>
                            <label>Due Date</label>

                            <input
                                type="date"
                                name="due_date"
                                value={form.due_date}
                                onChange={handleChange}
                                className="border rounded w-full p-2"
                            />
                        </div>
                    </div>

                    <div className="mt-4 space-y-3">
                        <label className="flex gap-2">
                            <input
                                type="checkbox"
                                name="is_billable"
                                checked={form.is_billable}
                                onChange={handleChange}
                            />
                            Billable
                        </label>

                        <label className="flex gap-2">
                            <input
                                type="checkbox"
                                name="status"
                                checked={form.status}
                                onChange={handleChange}
                            />
                            Active
                        </label>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="border px-5 py-2 rounded"
                        >
                            Cancel
                        </button>

                        <button
                            disabled={loading}
                            className="bg-blue-600 text-white px-5 py-2 rounded"
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
