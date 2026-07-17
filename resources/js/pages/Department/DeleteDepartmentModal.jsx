import departmentService from "../../services/departmentService";

export default function DeleteDepartmentModal({
    open,
    department,
    onClose,
    onSuccess,
}) {
    if (!open) {
        return null;
    }

    const handleDelete = async () => {
        try {
            await departmentService.deleteDepartment(department.id);

            onSuccess();

            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-96">
                <h2 className="text-xl font-bold mb-4">Delete Department</h2>

                <p>
                    Are you sure you want to delete
                    <b> {department?.name}</b> ?
                </p>

                <div className="flex justify-end gap-3 mt-5">
                    <button
                        onClick={onClose}
                        className="border px-4 py-2 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
