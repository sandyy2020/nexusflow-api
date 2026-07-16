import { useState } from "react";
import userService from "../../services/userService";
import {
    confirmDelete,
    successAlert,
    errorAlert,
} from "../../utils/alert";

export default function DeleteUserModal({
    open,
    user,
    onClose,
    onSuccess,
}) {
    const [loading, setLoading] = useState(false);

    if (!open || !user) return null;

    const handleDelete = async () => {
        setLoading(true);

        try {
            await userService.deleteUser(user.id);

            successAlert("User deleted successfully.");

            onSuccess();

            onClose();
        } catch (error) {
            console.log(error);

            errorAlert(
                error.response?.data?.message ||
                "Unable to delete user."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl w-[450px] p-6">

                <h2 className="text-2xl font-bold mb-4">
                    Delete User
                </h2>

                <p className="text-gray-700 mb-6">
                    Are you sure you want to delete
                    <span className="font-semibold">
                        {" "}
                        {user.name}
                    </span>
                    ?
                </p>

                <div className="flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="border px-4 py-2 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="bg-red-600 text-white px-5 py-2 rounded"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>

                </div>

            </div>

        </div>
    );
}