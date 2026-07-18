export default function ViewDesignationModal({ open, designation, onClose }) {
    if (!open || !designation) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
                <div className="flex justify-between items-center border-b px-6 py-4">
                    <h2 className="text-xl font-semibold">View Designation</h2>

                    <button onClick={onClose} className="text-2xl">
                        ×
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="font-semibold">Department</label>

                        <p className="mt-1">{designation.department?.name}</p>
                    </div>

                    <div>
                        <label className="font-semibold">Designation</label>

                        <p className="mt-1">{designation.name}</p>
                    </div>

                    <div>
                        <label className="font-semibold">Description</label>

                        <p className="mt-1">{designation.description || "-"}</p>
                    </div>

                    <div>
                        <label className="font-semibold">Status</label>

                        <p className="mt-1">
                            {designation.status ? (
                                <span className="text-green-600">Active</span>
                            ) : (
                                <span className="text-red-600">Inactive</span>
                            )}
                        </p>
                    </div>
                </div>

                <div className="flex justify-end border-t px-6 py-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
