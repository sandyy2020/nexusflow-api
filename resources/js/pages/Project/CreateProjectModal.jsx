import { useEffect, useState } from "react";

import projectService from "../../services/projectService";
import departmentService from "../../services/departmentService";
import teamService from "../../services/teamService";
import userService from "../../services/userService";

export default function CreateProjectModal({ open, onClose, onSuccess }) {
    const [departments, setDepartments] = useState([]);
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        department_id: "",
        team_ids: [],
        project_manager_id: "",
        name: "",
        code: "",
        client_name: "",
        start_date: "",
        end_date: "",
        priority: "Medium",
        project_status: "Planning",
        progress: 0,
        budget: "",
        description: "",
        status: true,
    });

    useEffect(() => {
        if (open) {
            loadDepartments();
            loadUsers();
        }
    }, [open]);

    const loadDepartments = async () => {
        try {
            const response = await departmentService.getDepartments({
                per_page: 100,
            });

            setDepartments(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const loadTeams = async (departmentId) => {
        if (!departmentId) {
            setTeams([]);
            return;
        }

        try {
            const response =
                await teamService.getTeamsByDepartment(departmentId);

            setTeams(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const loadUsers = async () => {
        try {
            const response = await userService.getUsers({
                per_page: 100,
            });

            setUsers(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        if (name === "department_id") {
            loadTeams(value);

            setFormData((prev) => ({
                ...prev,
                department_id: value,
                team_ids: [],
            }));

            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleTeamChange = (teamId) => {
        setFormData((prev) => ({
            ...prev,
            team_ids: prev.team_ids.includes(teamId)
                ? prev.team_ids.filter((id) => id !== teamId)
                : [...prev.team_ids, teamId],
        }));
    };

    const resetForm = () => {
        setFormData({
            department_id: "",
            team_ids: [],
            project_manager_id: "",
            name: "",
            code: "",
            client_name: "",
            start_date: "",
            end_date: "",
            priority: "Medium",
            project_status: "Planning",
            progress: 0,
            budget: "",
            description: "",
            status: true,
        });

        setTeams([]);
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            await projectService.createProject(formData);

            resetForm();

            onSuccess();
            onClose();
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.log(error);
            }
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[92vh] overflow-y-auto">
                {/* Header */}

                <div className="flex justify-between items-center border-b px-6 py-4 sticky top-0 bg-white">
                    <h2 className="text-2xl font-semibold">Create Project</h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-600 text-3xl"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Department */}

                        <div>
                            <label className="block mb-1 font-medium">
                                Department
                            </label>

                            <select
                                name="department_id"
                                value={formData.department_id}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Select Department</option>

                                {departments.map((department) => (
                                    <option
                                        key={department.id}
                                        value={department.id}
                                    >
                                        {department.name}
                                    </option>
                                ))}
                            </select>

                            {errors.department_id && (
                                <p className="text-red-500 text-sm">
                                    {errors.department_id[0]}
                                </p>
                            )}
                        </div>

                        {/* Project Manager */}

                        <div>
                            <label className="block mb-1 font-medium">
                                Project Manager
                            </label>

                            <select
                                name="project_manager_id"
                                value={formData.project_manager_id}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Select Project Manager</option>

                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>

                            {errors.project_manager_id && (
                                <p className="text-red-500 text-sm">
                                    {errors.project_manager_id[0]}
                                </p>
                            )}
                        </div>

                        {/* Teams */}

                        <div className="md:col-span-2">
                            <label className="block mb-2 font-medium">
                                Teams
                            </label>

                            <div className="border rounded p-3 max-h-40 overflow-y-auto">
                                {teams.length === 0 ? (
                                    <p className="text-gray-500">
                                        Select Department First
                                    </p>
                                ) : (
                                    teams.map((team) => (
                                        <label
                                            key={team.id}
                                            className="flex items-center gap-2 mb-2"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={formData.team_ids.includes(
                                                    team.id,
                                                )}
                                                onChange={() =>
                                                    handleTeamChange(team.id)
                                                }
                                            />

                                            {team.name}
                                        </label>
                                    ))
                                )}
                            </div>

                            {errors.team_ids && (
                                <p className="text-red-500 text-sm">
                                    {errors.team_ids[0]}
                                </p>
                            )}
                        </div>

                        {/* Name */}

                        <div>
                            <label className="block mb-1 font-medium">
                                Project Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />

                            {errors.name && (
                                <p className="text-red-500 text-sm">
                                    {errors.name[0]}
                                </p>
                            )}
                        </div>

                        {/* Code */}

                        <div>
                            <label className="block mb-1 font-medium">
                                Project Code
                            </label>

                            <input
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />

                            {errors.code && (
                                <p className="text-red-500 text-sm">
                                    {errors.code[0]}
                                </p>
                            )}
                        </div>

                        {/* Client */}

                        <div>
                            <label className="block mb-1 font-medium">
                                Client Name
                            </label>

                            <input
                                type="text"
                                name="client_name"
                                value={formData.client_name}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        {/* Budget */}

                        <div>
                            <label className="block mb-1 font-medium">
                                Budget
                            </label>

                            <input
                                type="number"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        {/* Start */}

                        <div>
                            <label className="block mb-1 font-medium">
                                Start Date
                            </label>

                            <input
                                type="date"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        {/* End */}

                        <div>
                            <label className="block mb-1 font-medium">
                                End Date
                            </label>

                            <input
                                type="date"
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        {/* Priority */}

                        <div>
                            <label className="block mb-1 font-medium">
                                Priority
                            </label>

                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                                <option>Critical</option>
                            </select>
                        </div>

                        {/* Project Status */}

                        <div>
                            <label className="block mb-1 font-medium">
                                Project Status
                            </label>

                            <select
                                name="project_status"
                                value={formData.project_status}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option>Planning</option>
                                <option>Active</option>
                                <option>On Hold</option>
                                <option>Completed</option>
                                <option>Cancelled</option>
                            </select>
                        </div>

                        {/* Progress */}

                        <div>
                            <label className="block mb-1 font-medium">
                                Progress (%)
                            </label>

                            <input
                                type="number"
                                min="0"
                                max="100"
                                name="progress"
                                value={formData.progress}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        {/* Active */}

                        <div className="flex items-center gap-3 mt-8">
                            <input
                                type="checkbox"
                                name="status"
                                checked={formData.status}
                                onChange={handleChange}
                            />

                            <label>Active</label>
                        </div>

                        {/* Description */}

                        <div className="md:col-span-2">
                            <label className="block mb-1 font-medium">
                                Description
                            </label>

                            <textarea
                                rows="4"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                    </div>

                    <div className="border-t px-6 py-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="border px-6 py-2 rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                        >
                            {loading ? "Saving..." : "Save Project"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
