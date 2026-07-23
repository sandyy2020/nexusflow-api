import { FaTimes } from "react-icons/fa";
import taskService from "../../services/taskService";

export default function DeleteTaskModal({ open, task, onClose, onSuccess }) {
    if (!open || !task) return null;

    const handleDelete = async () => {
        try {
            await taskService.deleteTask(task.id);

            onSuccess();

            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[450px] p-6">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-bold">Delete Task</h2>

                    <FaTimes
                        onClick={onClose}
                        className="cursor-pointer text-gray-600"
                    />
                </div>

                <p className="mb-6">
                    Are you sure you want to delete
                    <strong> {task.title}</strong>?
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded"
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
