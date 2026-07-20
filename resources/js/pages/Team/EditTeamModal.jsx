import { useEffect, useState } from "react";
import teamService from "../../services/teamService";
import departmentService from "../../services/departmentService";
import userService from "../../services/userService";

export default function EditTeamModal({ open, onClose, onSuccess, team }) {
    const [departments, setDepartments] = useState([]);
    const [users, setUsers] = useState([]);

    const [formData, setFormData] = useState({
        department_id: "",
        team_lead_id: "",
        name: "",
        code: "",
        description: "",
        status: true,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && team) {
            loadDepartments();

            setFormData({
                department_id: team.department_id || "",
                team_lead_id: team.team_lead_id || "",
                name: team.name || "",
                code: team.code || "",
                description: team.description || "",
                status: team.status,
            });

            if (team.department_id) {
                loadDepartmentUsers(team.department_id);
            }
        }
    }, [open, team]);

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

    const loadDepartmentUsers = async (departmentId) => {
        try {
            const response =
                await userService.getUsersByDepartment(departmentId);

            setUsers(response.data.data);
        } catch (error) {
            console.log(error);
            setUsers([]);
        }
    };

    const handleChange = async (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "department_id") {
            setFormData((prev) => ({
                ...prev,
                department_id: value,
                team_lead_id: "",
            }));

            setErrors((prev) => ({
                ...prev,
                department_id: "",
            }));

            if (value) {
                await loadDepartmentUsers(value);
            } else {
                setUsers([]);
            }

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            await teamService.updateTeam(team.id, formData);

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

    if (!open || !team) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-xl">
                <div className="flex justify-between items-center border-b p-4">
                    <h2 className="text-xl font-semibold">Edit Team</h2>

                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-500"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block mb-1">Department</label>

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

                        <div>
                            <label className="block mb-1">Team Lead</label>

                            <select
                                name="team_lead_id"
                                value={formData.team_lead_id}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Select Team Lead</option>

                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>

                            {errors.team_lead_id && (
                                <p className="text-red-500 text-sm">
                                    {errors.team_lead_id[0]}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1">Team Name</label>

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

                        <div>
                            <label className="block mb-1">Team Code</label>

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

                        <div>
                            <label className="block mb-1">Description</label>

                            <textarea
                                rows="3"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div className="flex items-center gap-2">
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
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
                        >
                            {loading ? "Updating..." : "Update Team"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
