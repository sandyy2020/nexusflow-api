import { useEffect, useState } from "react";

import projectService from "../../services/projectService";
import departmentService from "../../services/departmentService";
import teamService from "../../services/teamService";
import userService from "../../services/userService";

export default function EditProjectModal({
    open,
    onClose,
    onSuccess,
    project,
}) {
    const [departments, setDepartments] = useState([]);
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const initialState = {
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
    };

    const [formData, setFormData] = useState(initialState);
    useEffect(() => {
        if (open) {
            loadDepartments();
            loadUsers();
        }
    }, [open]);
    useEffect(() => {
        if (!open || !project) return;

        setFormData({
            department_id: project.department_id || "",

            team_ids: project.teams?.map((team) => team.id) || [],

            project_manager_id: project.project_manager_id || "",

            name: project.name || "",

            code: project.code || "",

            client_name: project.client_name || "",

            start_date: project.start_date
                ? project.start_date.substring(0, 10)
                : "",

            end_date: project.end_date ? project.end_date.substring(0, 10) : "",

            priority: project.priority || "Medium",

            project_status: project.project_status || "Planning",

            progress: project.progress ?? 0,

            budget: project.budget ?? "",

            description: project.description || "",

            status: project.status,
        });

        if (project.department_id) {
            loadTeams(project.department_id);
        }
    }, [project, open]);
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
        const { name, value, type, checked } = e.target;

        const newValue = type === "checkbox" ? checked : value;

        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        if (name === "department_id") {
            loadTeams(value);

            setFormData((prev) => ({
                ...prev,
                department_id: value,
                team_ids: [],
            }));
        }
    };
    const handleTeamChange = (teamId) => {
        setFormData((prev) => ({
            ...prev,
            team_ids: prev.team_ids.includes(teamId)
                ? prev.team_ids.filter((id) => id !== teamId)
                : [...prev.team_ids, teamId],
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setErrors({});

        try {
            await projectService.updateProject(project.id, formData);

            onSuccess();

            setFormData(initialState);

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

    if (!open || !project) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center border-b p-5">
                    <h2 className="text-2xl font-bold">Edit Project</h2>

                    <button
                        onClick={onClose}
                        className="text-3xl text-gray-500 hover:text-red-600"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-5">
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
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.department_id[0]}
                                </p>
                            )}
                        </div>

                        {/* Teams */}
                        <div>
                            <label className="block mb-2 font-medium">
                                Teams
                            </label>

                            <div className="border rounded-lg p-3 max-h-48 overflow-y-auto">
                                {teams.length > 0 ? (
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
                                ) : (
                                    <p className="text-gray-400">
                                        No Teams Available
                                    </p>
                                )}
                            </div>

                            {errors.team_ids && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.team_ids[0]}
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
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.project_manager_id[0]}
                                </p>
                            )}
                        </div>

                        {/* Project Name */}
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
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name[0]}
                                </p>
                            )}
                        </div>

                        {/* Project Code */}
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
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.code[0]}
                                </p>
                            )}
                        </div>

                        {/* Client Name */}
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

                            {errors.client_name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.client_name[0]}
                                </p>
                            )}
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-2 gap-4">
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

                                {errors.start_date && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.start_date[0]}
                                    </p>
                                )}
                            </div>

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

                                {errors.end_date && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.end_date[0]}
                                    </p>
                                )}
                            </div>
                        </div>
                        {/* Priority & Project Status */}
                        <div className="grid grid-cols-2 gap-4">
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
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                    <option value="Critical">Critical</option>
                                </select>

                                {errors.priority && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.priority[0]}
                                    </p>
                                )}
                            </div>

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
                                    <option value="Planning">Planning</option>
                                    <option value="Active">Active</option>
                                    <option value="On Hold">On Hold</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>

                                {errors.project_status && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.project_status[0]}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Progress & Budget */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 font-medium">
                                    Progress (%)
                                </label>

                                <input
                                    type="number"
                                    name="progress"
                                    min="0"
                                    max="100"
                                    value={formData.progress}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2"
                                />

                                {errors.progress && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.progress[0]}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">
                                    Budget
                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2"
                                />

                                {errors.budget && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.budget[0]}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
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

                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.description[0]}
                                </p>
                            )}
                        </div>

                        {/* Active Status */}
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="status"
                                checked={formData.status}
                                onChange={handleChange}
                            />

                            <label className="font-medium">
                                Active Project
                            </label>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t p-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 border rounded hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50"
                        >
                            {loading ? "Updating..." : "Update Project"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
