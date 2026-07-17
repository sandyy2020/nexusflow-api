import { useEffect, useState } from "react";
import departmentService from "../../services/departmentService";

export default function EditDepartmentModal({
    open,
    department,
    onClose,
    onSuccess,
}) {
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        description: "",
        status: 1,
    });

    useEffect(() => {
        if (department) {
            setFormData({
                name: department.name,
                code: department.code,
                description: department.description,
                status: department.status,
            });
        }
    }, [department]);

    if (!open) {
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await departmentService.updateDepartment(department.id, formData);

            onSuccess();

            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-96">
                <h2 className="text-xl font-bold mb-5">Edit Department</h2>

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

                        <button className="bg-yellow-500 text-white px-4 py-2 rounded">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
