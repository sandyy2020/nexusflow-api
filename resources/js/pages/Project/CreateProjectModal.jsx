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

    const [formData, setFormData] = useState({
        department_id: "",
        team_id: "",
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

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (open) {
            loadDepartments();
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

    const loadUsers = async (teamId) => {
        if (!teamId) {
            setUsers([]);
            return;
        }

        try {
            const response = await userService.getUsersByTeam(teamId);

            setUsers(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,

            [name]: type === "checkbox" ? checked : value,
        }));

        setErrors((prev) => ({
            ...prev,

            [name]: "",
        }));

        if (name === "department_id") {
            setFormData((prev) => ({
                ...prev,

                department_id: value,
                team_id: "",
                project_manager_id: "",
            }));

            loadTeams(value);

            setUsers([]);
        }

        if (name === "team_id") {
            setFormData((prev) => ({
                ...prev,

                team_id: value,
                project_manager_id: "",
            }));

            loadUsers(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            await projectService.createProject(formData);

            setFormData({
                department_id: "",
                team_id: "",
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center border-b p-4">
                    <h2 className="text-xl font-semibold">Create Project</h2>

                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-500"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-4 space-y-3">
                        <div>
                            <label className="block mb-1">Department</label>

                            <select
                                name="department_id"
                                value={formData.department_id}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Select Department</option>

                                {departments.map((dep) => (
                                    <option key={dep.id} value={dep.id}>
                                        {dep.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Team */}

                        <div>
                            <label className="block mb-1">Team</label>

                            <select
                                name="team_id"
                                value={formData.team_id}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Select Team</option>

                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>
                                        {team.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Manager */}

                        <div>
                            <label className="block mb-1">
                                Project Manager
                            </label>

                            <select
                                name="project_manager_id"
                                value={formData.project_manager_id}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Select Manager</option>

                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <input
                            name="name"
                            placeholder="Project Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />

                        <input
                            name="code"
                            placeholder="Project Code"
                            value={formData.code}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />

                        <input
                            name="client_name"
                            placeholder="Client Name"
                            value={formData.client_name}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="date"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleChange}
                                className="border rounded px-3 py-2"
                            />

                            <input
                                type="date"
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleChange}
                                className="border rounded px-3 py-2"
                            />
                        </div>

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

                        <input
                            type="number"
                            name="budget"
                            placeholder="Budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="w-full border rounded px-3 py-2"
                        />

                        <div className="flex gap-2 items-center">
                            <input
                                type="checkbox"
                                name="status"
                                checked={formData.status}
                                onChange={handleChange}
                            />

                            <label>Active</label>
                        </div>
                    </div>

                    <div className="border-t p-4 flex justify-end gap-3">
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
                            {loading ? "Saving..." : "Save Project"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
