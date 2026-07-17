import { useEffect, useState } from "react";
import permissionService from "../../services/permissionService";

export default function EditPermissionModal({
    open,
    permission,
    onClose,
    onSuccess,
}) {

    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (permission) {
            setName(permission.name);
        }

    }, [permission]);

    const submit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setErrors({});

        try {

            await permissionService.updatePermission(permission.id, {
                name,
            });

            alert("Permission updated successfully.");

            onSuccess();

            onClose();

        } catch (error) {

            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                alert(error.response?.data?.message || "Something went wrong");
            }

        } finally {

            setLoading(false);

        }

    };

    if (!open || !permission) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl w-[500px] shadow-lg">

                <div className="border-b px-6 py-4 flex justify-between items-center">

                    <h2 className="text-2xl font-bold">
                        Edit Permission
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

                        <label className="block font-medium mb-2">
                            Permission Name
                        </label>

                        <input
                            type="text"
                            className="border rounded w-full p-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name[0]}
                            </p>
                        )}

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
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
                        >
                            {loading ? "Updating..." : "Update Permission"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}