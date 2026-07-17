export default function ViewPermissionModal({
    open,
    permission,
    onClose,
}) {

    if (!open || !permission) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl w-[500px] shadow-lg">

                <div className="border-b px-6 py-4 flex justify-between items-center">

                    <h2 className="text-2xl font-bold">
                        View Permission
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-500 hover:text-red-600"
                    >
                        ×
                    </button>

                </div>

                <div className="p-6 space-y-5">

                    <div>

                        <label className="block text-gray-500 text-sm mb-1">
                            ID
                        </label>

                        <div className="border rounded p-3 bg-gray-50">
                            {permission.id}
                        </div>

                    </div>

                    <div>

                        <label className="block text-gray-500 text-sm mb-1">
                            Permission Name
                        </label>

                        <div className="border rounded p-3 bg-gray-50">
                            {permission.name}
                        </div>

                    </div>

                    <div>

                        <label className="block text-gray-500 text-sm mb-1">
                            Guard Name
                        </label>

                        <div className="border rounded p-3 bg-gray-50">
                            {permission.guard_name}
                        </div>

                    </div>

                    <div>

                        <label className="block text-gray-500 text-sm mb-1">
                            Created At
                        </label>

                        <div className="border rounded p-3 bg-gray-50">
                            {permission.created_at}
                        </div>

                    </div>

                    <div>

                        <label className="block text-gray-500 text-sm mb-1">
                            Updated At
                        </label>

                        <div className="border rounded p-3 bg-gray-50">
                            {permission.updated_at}
                        </div>

                    </div>

                </div>

                <div className="border-t px-6 py-4 flex justify-end">

                    <button
                        onClick={onClose}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded"
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    );
}