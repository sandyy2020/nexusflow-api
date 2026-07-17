import { useEffect, useState } from "react";
import roleService from "../../services/roleService";

export default function AssignPermissionModal({
    open,
    role,
    onClose,
    onSuccess,
}) {
    const [permissions, setPermissions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && role) {
            loadPermissions();

            setSelectedPermissions(
                role.permissions
                    ? role.permissions.map((permission) => permission.name)
                    : []
            );
        }
    }, [open, role]);

    const loadPermissions = async () => {
        try {
            const response = await roleService.getPermissions();

            setPermissions(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handlePermissionChange = (permission) => {
        if (selectedPermissions.includes(permission)) {
            setSelectedPermissions(
                selectedPermissions.filter((item) => item !== permission)
            );
        } else {
            setSelectedPermissions([
                ...selectedPermissions,
                permission,
            ]);
        }
    };

    const selectAll = () => {
        setSelectedPermissions(
            permissions.map((permission) => permission.name)
        );
    };

    const clearAll = () => {
        setSelectedPermissions([]);
    };

    const submit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            await roleService.assignPermissions(role.id, {
                permissions: selectedPermissions,
            });

            alert("Permissions Updated Successfully");

            onSuccess();

            onClose();
        } catch (error) {
            console.log(error);

            alert(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (!open || !role) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl w-[750px] max-h-[90vh] overflow-auto">

                <div className="border-b px-6 py-4 flex justify-between items-center">

                    <h2 className="text-2xl font-bold">
                        Assign Permissions
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-500 hover:text-red-600"
                    >
                        ×
                    </button>

                </div>

                <form onSubmit={submit}>

                    <div className="p-6">

                        <div className="mb-5">

                            <label className="font-semibold">
                                Role
                            </label>

                            <input
                                className="border rounded w-full mt-2 p-2 bg-gray-100"
                                value={role.name}
                                disabled
                            />

                        </div>

                        <div className="flex justify-end gap-3 mb-5">

                            <button
                                type="button"
                                onClick={selectAll}
                                className="bg-green-600 text-white px-4 py-2 rounded"
                            >
                                Select All
                            </button>

                            <button
                                type="button"
                                onClick={clearAll}
                                className="bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Clear All
                            </button>

                        </div>

                        <div className="grid grid-cols-2 gap-3">

                            {permissions.map((permission) => (

                                <label
                                    key={permission.id}
                                    className="flex items-center gap-3 border rounded p-3 cursor-pointer hover:bg-gray-50"
                                >

                                    <input
                                        type="checkbox"
                                        checked={selectedPermissions.includes(permission.name)}
                                        onChange={() =>
                                            handlePermissionChange(permission.name)
                                        }
                                    />

                                    {permission.name}

                                </label>

                            ))}

                        </div>

                    </div>

                    <div className="border-t px-6 py-4 flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="border px-5 py-2 rounded"
                        >
                            Cancel
                        </button>

                        <button
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
                        >
                            {loading
                                ? "Saving..."
                                : "Save Permissions"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}