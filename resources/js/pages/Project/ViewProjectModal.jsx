export default function ViewProjectModal({ open, onClose, project }) {
    if (!open || !project) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-xl">
                <div className="flex justify-between items-center border-b p-4">
                    <h2 className="text-xl font-semibold">Project Details</h2>

                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-500"
                    >
                        ×
                    </button>
                </div>

                <div className="p-6 space-y-3">
                    <p>
                        <strong>Name:</strong> {project.name}
                    </p>

                    <p>
                        <strong>Code:</strong> {project.code}
                    </p>

                    <p>
                        <strong>Department:</strong>{" "}
                        {project.department?.name ?? "-"}
                    </p>

                    <p>
                        <strong>Team:</strong> {project.team?.name ?? "-"}
                    </p>

                    <p>
                        <strong>Project Manager:</strong>{" "}
                        {project.project_manager?.name ?? "-"}
                    </p>

                    <p>
                        <strong>Client:</strong> {project.client_name ?? "-"}
                    </p>

                    <p>
                        <strong>Priority:</strong> {project.priority}
                    </p>

                    <p>
                        <strong>Status:</strong> {project.status}
                    </p>

                    <p>
                        <strong>Progress:</strong> {project.progress}%
                    </p>

                    <p>
                        <strong>Budget:</strong> {project.budget ?? "-"}
                    </p>

                    <p>
                        <strong>Description:</strong>{" "}
                        {project.description ?? "-"}
                    </p>
                </div>

                <div className="border-t p-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="border px-5 py-2 rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
