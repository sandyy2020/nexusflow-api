export default function ViewRoleModal({
    open,
    onClose,
    role,
}) {
    if (!open || !role) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-[650px]">

                {/* Header */}
                <div className="flex justify-between items-center border-b px-6 py-4">

                    <h2 className="text-2xl font-bold">
                        View Role
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-600 text-2xl"
                    >
                        ×
                    </button>

                </div>

                {/* Body */}
                <div className="p-6 space-y-5">

                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <label className="text-gray-500 text-sm">
                                Role ID
                            </label>

                            <div className="font-semibold text-lg">
                                {role.id}
                            </div>
                        </div>

                        <div>
                            <label className="text-gray-500 text-sm">
                                Role Name
                            </label>

                            <div className="font-semibold text-lg">
                                {role.name}
                            </div>
                        </div>

                        <div>
                            <label className="text-gray-500 text-sm">
                                Created At
                            </label>

                            <div className="font-semibold">
                                {role.created_at}
                            </div>
                        </div>

                        <div>
                            <label className="text-gray-500 text-sm">
                                Total Permissions
                            </label>

                            <div className="font-semibold">
                                {role.permissions?.length || 0}
                            </div>
                        </div>

                    </div>

                    <div>

                        <label className="text-gray-500 text-sm block mb-3">
                            Permissions
                        </label>

                        {role.permissions?.length > 0 ? (

                            <div className="flex flex-wrap gap-2">

                                {role.permissions.map((permission) => (

                                    <span
                                        key={permission.id}
                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                                    >
                                        {permission.name}
                                    </span>

                                ))}

                            </div>

                        ) : (

                            <p className="text-gray-500">
                                No permissions assigned.
                            </p>

                        )}

                    </div>

                </div>

                {/* Footer */}
                <div className="border-t px-6 py-4 flex justify-end">

                    <button
                        onClick={onClose}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg"
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    );
}