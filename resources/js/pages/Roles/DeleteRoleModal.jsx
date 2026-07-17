import { useState } from "react";
import roleService from "../../services/roleService";

export default function DeleteRoleModal({
    open,
    onClose,
    onSuccess,
    role,
}) {
    const [loading, setLoading] = useState(false);

    if (!open || !role) return null;

    const deleteRole = async () => {
        setLoading(true);

        try {
            await roleService.deleteRole(role.id);

            alert("Role deleted successfully.");

            onSuccess();

            onClose();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to delete role."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-[450px] p-6">

                <h2 className="text-2xl font-bold text-red-600 mb-4">
                    Delete Role
                </h2>

                <p className="text-gray-700 mb-6">
                    Are you sure you want to delete the role
                    <strong> "{role.name}" </strong>?
                </p>

                <div className="flex justify-end gap-3">

                    <button
                        type="button"
                        onClick={onClose}
                        className="border px-5 py-2 rounded-lg hover:bg-gray-100"
                        disabled={loading}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={deleteRole}
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>

                </div>

            </div>
        </div>
    );
}