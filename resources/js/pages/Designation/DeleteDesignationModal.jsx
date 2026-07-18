import { useState } from "react";
import designationService from "../../services/designationService";

export default function DeleteDesignationModal({
    open,
    designation,
    onClose,
    onSuccess,
}) {
    const [loading, setLoading] = useState(false);

    if (!open || !designation) return null;

    const handleDelete = async () => {
        setLoading(true);

        try {
            await designationService.deleteDesignation(designation.id);

            onSuccess();

            onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                <div className="border-b px-6 py-4">
                    <h2 className="text-xl font-semibold text-red-600">
                        Delete Designation
                    </h2>
                </div>

                <div className="p-6">
                    <p>
                        Are you sure you want to delete
                        <strong> {designation.name}</strong>?
                    </p>
                </div>

                <div className="flex justify-end gap-3 border-t px-6 py-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="px-4 py-2 bg-red-600 text-white rounded"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}
