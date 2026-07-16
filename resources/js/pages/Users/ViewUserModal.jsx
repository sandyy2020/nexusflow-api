export default function ViewUserModal({
    open,
    user,
    onClose,
}) {
    if (!open || !user) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[500px]">

                <div className="border-b px-6 py-4">
                    <h2 className="text-2xl font-bold">
                        User Details
                    </h2>
                </div>

                <div className="p-6 space-y-4">

                    <div>
                        <label className="font-semibold">
                            ID
                        </label>

                        <p>{user.id}</p>
                    </div>

                    <div>
                        <label className="font-semibold">
                            Name
                        </label>

                        <p>{user.name}</p>
                    </div>

                    <div>
                        <label className="font-semibold">
                            Email
                        </label>

                        <p>{user.email}</p>
                    </div>

                    <div>
                        <label className="font-semibold">
                            Phone
                        </label>

                        <p>{user.phone || "-"}</p>
                    </div>

                    <div>
                        <label className="font-semibold">
                            Role
                        </label>

                        <p>{user.roles?.join(", ") || "-"}</p>
                    </div>

                    <div>
                        <label className="font-semibold">
                            Status
                        </label>

                        <p>
                            {user.status ? (
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
                        <label className="font-semibold">
                            Permissions
                        </label>

                        <div className="flex flex-wrap gap-2 mt-2">
                            {user.permissions?.length ? (
                                user.permissions.map((permission) => (
                                    <span
                                        key={permission}
                                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
                                    >
                                        {permission}
                                    </span>
                                ))
                            ) : (
                                <span>No Permissions</span>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="font-semibold">
                            Created At
                        </label>

                        <p>{user.created_at}</p>
                    </div>

                </div>

                <div className="border-t px-6 py-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded"
                    >
                        Close
                    </button>
                </div>

            </div>
        </div>
    );
}