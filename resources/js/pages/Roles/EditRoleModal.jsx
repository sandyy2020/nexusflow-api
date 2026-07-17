import { useEffect, useState } from "react";
import roleService from "../../services/roleService";

export default function EditRoleModal({
    open,
    onClose,
    onSuccess,
    role,
}) {
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (role) {
            setForm({
                name: role.name || "",
            });
        }
    }, [role]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        setErrors({
            ...errors,
            [e.target.name]: "",
        });
    };

    const submit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setErrors({});

        try {

            await roleService.updateRole(role.id, form);

            alert("Role updated successfully.");

            onSuccess();

            onClose();

        } catch (error) {

            if (error.response?.status === 422) {

                setErrors(error.response.data.errors || {});

            } else {

                alert(
                    error.response?.data?.message ||
                    "Something went wrong."
                );

            }

        } finally {

            setLoading(false);

        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-[450px] p-6">

                <h2 className="text-2xl font-bold mb-6">
                    Edit Role
                </h2>

                <form onSubmit={submit}>

                    <div className="mb-5">

                        <label className="block mb-2 font-medium">
                            Role Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2"
                            placeholder="Role Name"
                        />

                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name[0]}
                            </p>
                        )}

                    </div>

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="border px-5 py-2 rounded-lg"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                        >
                            {loading ? "Updating..." : "Update"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}