export default function ViewDepartmentModal({ open, department, onClose }) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-96">
                <h2 className="text-xl font-bold mb-5">Department Details</h2>

                <p>
                    <b>Name:</b> {department?.name}
                </p>

                <p>
                    <b>Description:</b> {department?.description}
                </p>

                <p>
                    <b>Status:</b>
                    {department?.status ? " Active" : " Inactive"}
                </p>

                <div className="text-right mt-5">
                    <button
                        onClick={onClose}
                        className="border px-4 py-2 rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
