import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import roleService from "../../services/roleService";

import CreateRoleModal from "./CreateRoleModal";
import EditRoleModal from "./EditRoleModal";
import DeleteRoleModal from "./DeleteRoleModal";
import ViewRoleModal from "./ViewRoleModal";
import AssignPermissionModal from "./AssignPermissionModal";

import {
    FaEye,
    FaEdit,
    FaTrash,
    FaKey,
} from "react-icons/fa";

export default function RoleList() {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    const [meta, setMeta] = useState({});
    const [links, setLinks] = useState({});

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [permissionOpen, setPermissionOpen] = useState(false);

    const [selectedRole, setSelectedRole] = useState(null);

    useEffect(() => {
        fetchRoles();
    }, [page, search]);

    const fetchRoles = async () => {
        setLoading(true);

        try {
            const response = await roleService.getRoles({
                page,
                search,
            });

            setRoles(response.data.data);

            setMeta(response.data.meta);

            setLinks(response.data.links);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const openView = (role) => {
        setSelectedRole(role);
        setViewOpen(true);
    };

    const openEdit = (role) => {
        setSelectedRole(role);
        setEditOpen(true);
    };

    const openDelete = (role) => {
        setSelectedRole(role);
        setDeleteOpen(true);
    };

    const openPermission = (role) => {
        setSelectedRole(role);
        setPermissionOpen(true);
    };

    return (
        <AdminLayout>

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Roles
                </h1>

                <button
                    onClick={() => setCreateOpen(true)}
                    className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                >
                    Add Role
                </button>

            </div>

            <div className="mb-5">

                <input
                    className="border rounded px-3 py-2 w-80"
                    placeholder="Search Role..."
                    value={search}
                    onChange={(e)=>{
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                />

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

                                <th className="text-left">Role</th>

                                <th className="text-left">
                                    Permissions
                                </th>

                                <th className="text-left">
                                    Created
                                </th>

                                <th className="text-center">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {roles.length > 0 ? (

                                roles.map((role)=>(

                                    <tr
                                        key={role.id}
                                        className="border-t hover:bg-gray-50"
                                    >

                                        <td className="p-3">
                                            {role.id}
                                        </td>

                                        <td>
                                            {role.name}
                                        </td>

                                        <td>

                                            {role.permissions?.length || 0}

                                            {" "}Permissions

                                        </td>

                                        <td>
                                            {role.created_at}
                                        </td>

                                        <td>

                                            <div className="flex justify-center gap-5">

                                                <FaEye
                                                    className="text-indigo-600 cursor-pointer text-xl"
                                                    onClick={() =>
                                                        openView(role)
                                                    }
                                                />

                                                <FaEdit
                                                    className="text-yellow-500 cursor-pointer text-xl"
                                                    onClick={() =>
                                                        openEdit(role)
                                                    }
                                                />

                                                <FaTrash
                                                    className="text-red-600 cursor-pointer text-xl"
                                                    onClick={() =>
                                                        openDelete(role)
                                                    }
                                                />

                                                <FaKey
                                                    className="text-green-600 cursor-pointer text-xl"
                                                    onClick={() =>
                                                        openPermission(role)
                                                    }
                                                />

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
                                        No Roles Found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            )}

            {!loading && (

                <div className="flex justify-between mt-6">

                    <button
                        disabled={!links.prev}
                        onClick={() => setPage(page-1)}
                        className="border rounded px-4 py-2 disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <div>

                        Page {meta.current_page || 1}

                        {" "}of{" "}

                        {meta.last_page || 1}

                    </div>

                    <button
                        disabled={!links.next}
                        onClick={() => setPage(page+1)}
                        className="border rounded px-4 py-2 disabled:opacity-50"
                    >
                        Next
                    </button>

                </div>

            )}

            <CreateRoleModal
                open={createOpen}
                onClose={()=>setCreateOpen(false)}
                onSuccess={fetchRoles}
            />

            <EditRoleModal
                open={editOpen}
                role={selectedRole}
                onClose={()=>setEditOpen(false)}
                onSuccess={fetchRoles}
            />

            <DeleteRoleModal
                open={deleteOpen}
                role={selectedRole}
                onClose={()=>setDeleteOpen(false)}
                onSuccess={fetchRoles}
            />

            <ViewRoleModal
                open={viewOpen}
                role={selectedRole}
                onClose={()=>setViewOpen(false)}
            />

            <AssignPermissionModal
                open={permissionOpen}
                role={selectedRole}
                onClose={()=>setPermissionOpen(false)}
                onSuccess={fetchRoles}
            />

        </AdminLayout>
    );
}