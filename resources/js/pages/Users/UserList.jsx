import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import userService from "../../services/userService";
import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import ViewUserModal from "./ViewUserModal";
import {
    FaEye,
    FaEdit,
    FaTrash,
    FaToggleOn,
    FaToggleOff,
} from "react-icons/fa";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [meta, setMeta] = useState({});
    const [links, setLinks] = useState({});

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState("");

    const [openCreate, setOpenCreate] = useState(false);

    const [editOpen, setEditOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteUser, setDeleteUser] = useState(null);

    const [viewOpen, setViewOpen] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, [page, perPage, search]);

    const fetchUsers = async () => {
        setLoading(true);

        try {
            const response = await userService.getUsers({
                page,
                per_page: perPage,
                search,
            });

            setUsers(response.data.data);

            setMeta(response.data.meta);

            setLinks(response.data.links);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const editUser = (user) => {
        setSelectedUser(user);
        setEditOpen(true);
    };

    const removeUser = (user) => {
        setDeleteUser(user);
        setDeleteOpen(true);
    };

    const openViewModal = (user) => {
        setSelectedUser(user);
        setViewOpen(true);
    };

    const toggleStatus = async (user) => {
        try {
            const newStatus = !user.status;

            await userService.changeStatus(user.id, newStatus);

            setUsers((prevUsers) =>
                prevUsers.map((u) =>
                    u.id === user.id ? { ...u, status: newStatus } : u,
                ),
            );

            successAlert(newStatus ? "User Activated" : "User Deactivated");
        } catch (error) {
            console.log(error);
            errorAlert("Unable to change status");
        }
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Users</h1>

                <button
                    onClick={() => setOpenCreate(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
                >
                    Add User
                </button>
            </div>

            <div className="flex justify-between mb-5">
                <input
                    className="border rounded px-3 py-2 w-80"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                />

                <select
                    className="border rounded px-3 py-2"
                    value={perPage}
                    onChange={(e) => {
                        setPerPage(Number(e.target.value));
                        setPage(1);
                    }}
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
            </div>

            {loading ? (
                <div className="text-center py-10">Loading...</div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Role</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="p-3">{user.id}</td>

                                        <td className="p-3">{user.name}</td>

                                        <td className="p-3">{user.email}</td>

                                        <td className="p-3">
                                            {user.roles?.join(", ")}
                                        </td>

                                        <td className="p-3">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    user.status
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {user.status
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex justify-center items-center gap-5">
                                                <FaEye
                                                    className="text-indigo-600 text-xl cursor-pointer hover:text-indigo-800 transition"
                                                    title="View User"
                                                    onClick={() =>
                                                        openViewModal(user)
                                                    }
                                                />

                                                <FaEdit
                                                    className="text-yellow-500 text-xl cursor-pointer hover:text-yellow-700 transition"
                                                    title="Edit User"
                                                    onClick={() =>
                                                        editUser(user)
                                                    }
                                                />

                                                <FaTrash
                                                    className="text-red-600 text-xl cursor-pointer hover:text-red-800 transition"
                                                    title="Delete User"
                                                    onClick={() =>
                                                        removeUser(user)
                                                    }
                                                />

                                                <button
                                                    onClick={() =>
                                                        toggleStatus(user)
                                                    }
                                                    className={`relative inline-flex h-7 w-14 items-center rounded-full transition-all duration-300 ${
                                                        user.status
                                                            ? "bg-green-500"
                                                            : "bg-gray-400"
                                                    }`}
                                                >
                                                    <span
                                                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-all duration-300 ${
                                                            user.status
                                                                ? "translate-x-8"
                                                                : "translate-x-1"
                                                        }`}
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center py-10"
                                    >
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {!loading && (
                <div className="flex justify-between items-center mt-6">
                    <button
                        disabled={!links.prev}
                        onClick={() => setPage(page - 1)}
                        className="border px-4 py-2 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <div>
                        Page {meta.current_page || 1} of {meta.last_page || 1}
                    </div>

                    <button
                        disabled={!links.next}
                        onClick={() => setPage(page + 1)}
                        className="border px-4 py-2 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
            <CreateUserModal
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onSuccess={fetchUsers}
            />
            <EditUserModal
                open={editOpen}
                user={selectedUser}
                onClose={() => {
                    setEditOpen(false);
                    setSelectedUser(null);
                }}
                onSuccess={fetchUsers}
            />
            <DeleteUserModal
                open={deleteOpen}
                user={deleteUser}
                onClose={() => {
                    setDeleteOpen(false);
                    setDeleteUser(null);
                }}
                onSuccess={fetchUsers}
            />
            <ViewUserModal
                open={viewOpen}
                user={selectedUser}
                onClose={() => {
                    setViewOpen(false);
                    setSelectedUser(null);
                }}
            />
        </AdminLayout>
    );
}
