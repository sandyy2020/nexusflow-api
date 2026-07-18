import { useEffect, useState } from "react";
import designationService from "../../services/designationService";
import departmentService from "../../services/departmentService";

export default function CreateDesignationModal({ open, onClose, onSuccess }) {
    const [departments, setDepartments] = useState([]);

    const [formData, setFormData] = useState({
        department_id: "",
        name: "",
        description: "",
        status: true,
    });

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

    useEffect(() => {
        if (open) {
            loadDepartments();
        }
    }, [open]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await designationService.createDesignation(formData);

            onSuccess();

            onClose();

            setFormData({
                department_id: "",
                name: "",
                description: "",
                status: true,
            });
        } catch (error) {
            console.log(error);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-xl font-semibold">
                        Create Designation
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black text-2xl"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block mb-2 font-medium">
                                Department
                            </label>

                            <select
                                className="w-full border rounded-lg px-3 py-2"
                                name="department_id"
                                value={formData.department_id}
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
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Designation Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2"
                                rows={3}
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

                    <div className="flex justify-end gap-3 border-t px-6 py-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded-lg"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
