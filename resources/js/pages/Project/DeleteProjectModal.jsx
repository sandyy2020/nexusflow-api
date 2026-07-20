import projectService from "../../services/projectService";
import { useState } from "react";

export default function DeleteProjectModal({
    open,
    onClose,
    project,
    onSuccess,
}) {
    const [loading, setLoading] = useState(false);

    if (!open || !project) return null;

    const handleDelete = async () => {
        setLoading(true);

        try {
            await projectService.deleteProject(project.id);

            onSuccess();

            onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                <div className="border-b p-4">
                    <h2 className="text-xl font-semibold text-red-600">
                        Delete Project
                    </h2>
                </div>

                <div className="p-6">
                    <p>
                        Are you sure you want to delete
                        <strong> {project.name}</strong>?
                    </p>
                </div>

                <div className="border-t p-4 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="border px-5 py-2 rounded"
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
