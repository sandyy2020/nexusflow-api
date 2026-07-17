import { useState } from "react";
import permissionService from "../../services/permissionService";

export default function DeletePermissionModal({
    open,
    permission,
    onClose,
    onSuccess,
}) {

    const [loading, setLoading] = useState(false);

    const destroy = async () => {

        setLoading(true);

        try {

            await permissionService.deletePermission(permission.id);

            alert("Permission deleted successfully.");

            onSuccess();

            onClose();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Unable to delete permission."
            );

        } finally {

            setLoading(false);

        }

    };

    if (!open || !permission) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl w-[450px] shadow-lg">

                <div className="border-b px-6 py-4">

                    <h2 className="text-2xl font-bold text-red-600">
                        Delete Permission
                    </h2>

                </div>

                <div className="p-6">

                    <p className="text-gray-700">

                        Are you sure you want to delete this permission?

                    </p>

                    <div className="mt-5 border rounded-lg p-4 bg-gray-50">

                        <p>

                            <strong>ID:</strong> {permission.id}

                        </p>

                        <p className="mt-2">

                            <strong>Name:</strong> {permission.name}

                        </p>

                    </div>

                </div>

                <div className="border-t px-6 py-4 flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="border px-5 py-2 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={destroy}
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>

                </div>

            </div>

        </div>

    );

}