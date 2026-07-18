import { useEffect, useState } from "react";
import teamService from "../../services/teamService";
import departmentService from "../../services/departmentService";
import userService from "../../services/userService";

export default function CreateTeamModal({ open, onClose, onSuccess }) {
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
            await teamService.createTeam(formData);

            setFormData({
                department_id: "",
                team_lead_id: "",
                name: "",
                code: "",
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
            <div className="bg-white rounded-lg shadow-lg w-full max-w-xl">
                <div className="flex justify-between items-center border-b p-4">
                    <h2 className="text-xl font-semibold">Create Team</h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500 text-2xl"
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
                                <p className="text-red-500 text-sm mt-1">
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

                            {errors.description && (
                                <p className="text-red-500 text-sm">
                                    {errors.description[0]}
                                </p>
                            )}
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
                            className="px-5 py-2 rounded border"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
                        >
                            {loading ? "Saving..." : "Save Team"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
