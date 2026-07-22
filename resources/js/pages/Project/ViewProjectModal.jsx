export default function ViewProjectModal({ open, onClose, project }) {
    if (!open || !project) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
                <div className="flex justify-between items-center border-b p-5">
                    <h2 className="text-2xl font-semibold">Project Details</h2>

                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-500 hover:text-red-600"
                    >
                        ×
                    </button>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <strong>Project Name</strong>
                            <p>{project.name}</p>
                        </div>

                        <div>
                            <strong>Project Code</strong>
                            <p>{project.code}</p>
                        </div>

                        <div>
                            <strong>Department</strong>
                            <p>{project.department?.name ?? "-"}</p>
                        </div>

                        <div>
                            <strong>Project Manager</strong>
                            <p>{project.project_manager?.name ?? "-"}</p>
                        </div>

                        <div>
                            <strong>Client Name</strong>
                            <p>{project.client_name || "-"}</p>
                        </div>

                        <div>
                            <strong>Priority</strong>
                            <p>{project.priority}</p>
                        </div>

                        <div>
                            <strong>Project Status</strong>
                            <p>{project.project_status}</p>
                        </div>

                        <div>
                            <strong>Record Status</strong>
                            <p>
                                {project.status ? (
                                    <span className="text-green-600 font-semibold">
                                        Active
                                    </span>
                                ) : (
                                    <span className="text-red-600 font-semibold">
                                        Inactive
                                    </span>
                                )}
                            </p>
                        </div>
                        <div>
                            <strong>Progress</strong>
                            <p>{project.progress}%</p>
                        </div>

                        <div>
                            <strong>Budget</strong>
                            <p>
                                {project.budget
                                    ? `₹ ${Number(project.budget).toLocaleString()}`
                                    : "-"}
                            </p>
                        </div>
                        <div>
                            <strong>Start Date</strong>
                            <p>{project.start_date}</p>
                        </div>
                        <div>
                            <strong>End Date</strong>
                            <p>{project.end_date ?? "-"}</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <strong>Assigned Teams</strong>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {project.teams?.length ? (
                                project.teams.map((team) => (
                                    <span
                                        key={team.id}
                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                                    >
                                        {team.name}
                                    </span>
                                ))
                            ) : (
                                <span>-</span>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <strong>Description</strong>
                        <div className="border rounded p-3 mt-2 bg-gray-50">
                            {project.description || "-"}
                        </div>
                    </div>
                </div>

                <div className="border-t p-5 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 border rounded hover:bg-gray-100"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
