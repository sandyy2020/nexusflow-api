import { useEffect, useState } from "react";
import userService from "../../services/userService";
import roleService from "../../services/roleService";
import { successAlert, errorAlert } from "../../utils/alert";

export default function CreateUserModal({ open, onClose, onSuccess }) {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [departments, setDepartments] = useState([]);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        department_id: "",
        password: "",
        password_confirmation: "",
        status: true,
        role: "",
    });

    useEffect(() => {
        if (open) {
            loadRoles();
            loadDepartments();
        }
    }, [open]);

    const loadRoles = async () => {
        try {
            const response = await roleService.getRoles();

            // Handles both paginated and non-paginated responses
            const rolesData = response.data.data.data || response.data.data;

            setRoles(rolesData);
        } catch (error) {
            console.log(error);
        }
    };

    const loadDepartments = async () => {
        try {
            const response = await userService.getDepartments();

            const departmentsData =
                response.data.data.data || response.data.data;

            setDepartments(departmentsData);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: name === "status" ? value === "true" : value,
        }));
    };

    const submit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            await userService.createUser(form);

            successAlert("User Created Successfully");

            onSuccess();

            onClose();

            setForm({
                name: "",
                email: "",
                phone: "",
                department_id: "",
                password: "",
                password_confirmation: "",
                status: true,
                role: "",
            });
        } catch (error) {
            console.log(error);

            if (error.response?.data?.errors) {
                errorAlert(
                    Object.values(error.response.data.errors).flat().join("\n"),
                );
            } else {
                errorAlert(
                    error.response?.data?.message || "Something went wrong.",
                );
            }
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-[650px] p-6">
                <h2 className="text-2xl font-bold mb-5">Create User</h2>

                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            className="border rounded p-2"
                            placeholder="Name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="email"
                            className="border rounded p-2"
                            placeholder="Email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="border rounded p-2"
                            placeholder="Phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                        />

                        <select
                            className="border rounded p-2"
                            name="department_id"
                            value={form.department_id}
                            onChange={handleChange}
                            required
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

                        <select
                            className="border rounded p-2"
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Role</option>

                            {roles.map((role) => (
                                <option key={role.id} value={role.name}>
                                    {role.name}
                                </option>
                            ))}
                        </select>

                        <input
                            type="password"
                            className="border rounded p-2"
                            placeholder="Password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="password"
                            className="border rounded p-2"
                            placeholder="Confirm Password"
                            name="password_confirmation"
                            value={form.password_confirmation}
                            onChange={handleChange}
                            required
                        />

                        <select
                            className="border rounded p-2"
                            name="status"
                            value={String(form.status)}
                            onChange={handleChange}
                        >
                            <option value="true">Active</option>

                            <option value="false">Inactive</option>
                        </select>
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
                            type="submit"
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
