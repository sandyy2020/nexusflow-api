import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import permissionService from "../../services/permissionService";

import CreatePermissionModal from "./CreatePermissionModal";
import EditPermissionModal from "./EditPermissionModal";
import DeletePermissionModal from "./DeletePermissionModal";
import ViewPermissionModal from "./ViewPermissionModal";

import {
    FaEye,
    FaEdit,
    FaTrash,
} from "react-icons/fa";

export default function PermissionList() {

    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);

    const [meta, setMeta] = useState({});
    const [links, setLinks] = useState({});

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState("");

    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);

    const [selectedPermission, setSelectedPermission] = useState(null);

    useEffect(() => {
        fetchPermissions();
    }, [page, perPage, search]);

    const fetchPermissions = async () => {

        setLoading(true);

        try {

            const response = await permissionService.getPermissions({

                page,
                per_page: perPage,
                search,

            });

            setPermissions(response.data.data);

            setMeta(response.data.meta);

            setLinks(response.data.links);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    const openView = (permission) => {

        setSelectedPermission(permission);

        setViewOpen(true);

    };

    // const openEdit = (permission) => {

    //     setSelectedPermission(permission);

    //     setEditOpen(true);

    // };

    // const openDelete = (permission) => {

    //     setSelectedPermission(permission);

    //     setDeleteOpen(true);

    // };

    return (

        <AdminLayout>

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Permission Management
                </h1>

                <button
                    onClick={() => setCreateOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
                >
                    Add Permission
                </button>

            </div>

            <div className="flex justify-between mb-5">

                <input
                    className="border rounded px-3 py-2 w-80"
                    placeholder="Search Permission..."
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

                <div className="text-center py-10">

                    Loading...

                </div>

            ) : (

                <div className="bg-white rounded-lg shadow overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="p-3 text-left">ID</th>

                                <th className="p-3 text-left">
                                    Permission
                                </th>

                                <th className="p-3 text-left">
                                    Guard
                                </th>

                                <th className="p-3 text-left">
                                    Created
                                </th>

                                <th className="p-3 text-center">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {permissions.length > 0 ? (

                                permissions.map((permission) => (

                                    <tr
                                        key={permission.id}
                                        className="border-t hover:bg-gray-50"
                                    >

                                        <td className="p-3">
                                            {permission.id}
                                        </td>

                                        <td className="p-3">
                                            {permission.name}
                                        </td>

                                        <td className="p-3">
                                            {permission.guard_name}
                                        </td>

                                        <td className="p-3">
                                            {permission.created_at}
                                        </td>

                                        <td className="p-3">

                                            <div className="flex justify-center gap-5">

                                                <FaEye
                                                    onClick={() => openView(permission)}
                                                    className="text-indigo-600 text-xl cursor-pointer hover:scale-110"
                                                />

                                                {/* <FaEdit
                                                    onClick={() => openEdit(permission)}
                                                    className="text-yellow-500 text-xl cursor-pointer hover:scale-110"
                                                />

                                                <FaTrash
                                                    onClick={() => openDelete(permission)}
                                                    className="text-red-600 text-xl cursor-pointer hover:scale-110"
                                                /> */}

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="text-center py-10"
                                    >
                                        No Permissions Found
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

            <CreatePermissionModal
                open={createOpen}
                onClose={() => setCreateOpen(false)}
                onSuccess={fetchPermissions}
            />

            {/* <EditPermissionModal
                open={editOpen}
                permission={selectedPermission}
                onClose={() => setEditOpen(false)}
                onSuccess={fetchPermissions}
            />

            <DeletePermissionModal
                open={deleteOpen}
                permission={selectedPermission}
                onClose={() => setDeleteOpen(false)}
                onSuccess={fetchPermissions}
            /> */}

            <ViewPermissionModal
                open={viewOpen}
                permission={selectedPermission}
                onClose={() => setViewOpen(false)}
            />

        </AdminLayout>
    );
}