import { useEffect, useState } from "react";
import designationService from "../../services/designationService";
import departmentService from "../../services/departmentService";

export default function EditDesignationModal({
    open,
    designation,
    onClose,
    onSuccess,
}) {
    const [departments, setDepartments] = useState([]);

    const [form, setForm] = useState({
        department_id: "",
        name: "",
        description: "",
        status: true,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            fetchDepartments();
        }
    }, [open]);

    useEffect(() => {
        if (designation) {
            setForm({
                department_id: designation.department_id || "",
                name: designation.name || "",
                description: designation.description || "",
                status: designation.status,
            });

            setErrors({});
        }
    }, [designation]);

    const fetchDepartments = async () => {
        try {
            const response = await departmentService.getDepartments({
                per_page: 100,
            });

            setDepartments(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setErrors({});

        try {
            await designationService.updateDesignation(designation.id, form);

            onSuccess();
            onClose();
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            }

            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
                <div className="flex justify-between items-center border-b px-6 py-4">
                    <h2 className="text-xl font-semibold">Edit Designation</h2>

                    <button onClick={onClose} className="text-2xl">
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block mb-1">Department</label>

                            <select
                                className="w-full border rounded px-3 py-2"
                                name="department_id"
                                value={form.department_id}
                                onChange={handleChange}
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
                                <small className="text-red-500">
                                    {errors.department_id[0]}
                                </small>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1">
                                Designation Name
                            </label>

                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />

                            {errors.name && (
                                <small className="text-red-500">
                                    {errors.name[0]}
                                </small>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1">Description</label>

                            <textarea
                                className="w-full border rounded px-3 py-2"
                                rows="3"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                            />

                            {errors.description && (
                                <small className="text-red-500">
                                    {errors.description[0]}
                                </small>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="status"
                                checked={form.status}
                                onChange={handleChange}
                            />

                            <label>Active</label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 border-t px-6 py-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            {loading ? "Updating..." : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
