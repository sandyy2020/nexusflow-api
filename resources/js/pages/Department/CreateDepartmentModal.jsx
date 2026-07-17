import { useState } from "react";
import departmentService from "../../services/departmentService";

export default function CreateDepartmentModal({ open, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        description: "",
        status: 1,
    });

    const [loading, setLoading] = useState(false);

    if (!open) {
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            await departmentService.createDepartment(formData);

            onSuccess();

            onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg w-96 p-6">
                <h2 className="text-xl font-bold mb-5">Add Department</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        className="border w-full px-3 py-2 rounded mb-3"
                        placeholder="Department Code"
                        value={formData.code}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                code: e.target.value,
                            })
                        }
                    />
                    <input
                        className="border w-full px-3 py-2 rounded mb-3"
                        placeholder="Department Name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            })
                        }
                    />

                    <textarea
                        className="border w-full px-3 py-2 rounded mb-3"
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                    />

                    <select
                        className="border w-full px-3 py-2 rounded mb-3"
                        value={formData.status}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                status: Number(e.target.value),
                            })
                        }
                    >
                        <option value={1}>Active</option>

                        <option value={0}>Inactive</option>
                    </select>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="border px-4 py-2 rounded"
                        >
                            Cancel
                        </button>

                        <button
                            disabled={loading}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
