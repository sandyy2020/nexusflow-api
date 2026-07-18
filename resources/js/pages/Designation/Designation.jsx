import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import designationService from "../../services/designationService";

import CreateDesignationModal from "./CreateDesignationModal";
import EditDesignationModal from "./EditDesignationModal";
import DeleteDesignationModal from "./DeleteDesignationModal";
import ViewDesignationModal from "./ViewDesignationModal";

import {
    FaEye,
    FaEdit,
    FaTrash,
    FaToggleOn,
    FaToggleOff,
} from "react-icons/fa";

export default function Designation() {
    const [designations, setDesignations] = useState([]);
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

    const [selectedDesignation, setSelectedDesignation] = useState(null);

    useEffect(() => {
        fetchDesignations();
    }, [page, perPage, search]);

    const fetchDesignations = async () => {
        setLoading(true);

        try {
            const response = await designationService.getDesignations({
                page,
                per_page: perPage,
                search,
            });

            setDesignations(response.data.data);
            setMeta(response.data.meta);
            setLinks(response.data.links);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const openView = (designation) => {
        setSelectedDesignation(designation);
        setViewOpen(true);
    };

    const openEdit = (designation) => {
        setSelectedDesignation(designation);
        setEditOpen(true);
    };

    const openDelete = (designation) => {
        setSelectedDesignation(designation);
        setDeleteOpen(true);
    };

    const handleStatus = async (designation) => {
        try {
            await designationService.changeStatus(
                designation.id,
                !designation.status,
            );

            fetchDesignations();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Designation Management</h1>

                <button
                    onClick={() => setCreateOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
                >
                    Add Designation
                </button>
            </div>

            <div className="flex justify-between mb-5">
                <input
                    className="border rounded px-3 py-2 w-80"
                    placeholder="Search Designation..."
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

                                <th className="p-3 text-left">Designation</th>

                                <th className="p-3 text-left">Department</th>

                                <th className="p-3 text-left">Description</th>

                                <th className="p-3 text-left">Status</th>

                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {designations.length > 0 ? (
                                designations.map((designation) => (
                                    <tr
                                        key={designation.id}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="p-3">
                                            {designation.id}
                                        </td>

                                        <td className="p-3">
                                            {designation.name}
                                        </td>

                                        <td className="p-3">
                                            {designation.department?.name}
                                        </td>

                                        <td className="p-3">
                                            {designation.description}
                                        </td>

                                        <td className="p-3">
                                            {designation.status ? (
                                                <span className="text-green-600">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="text-red-600">
                                                    Inactive
                                                </span>
                                            )}
                                        </td>

                                        <td className="p-3">
                                            <div className="flex justify-center gap-5">
                                                <FaEye
                                                    onClick={() =>
                                                        openView(designation)
                                                    }
                                                    className="text-indigo-600 text-xl cursor-pointer hover:scale-110"
                                                />

                                                <FaEdit
                                                    onClick={() =>
                                                        openEdit(designation)
                                                    }
                                                    className="text-yellow-500 text-xl cursor-pointer hover:scale-110"
                                                />

                                                <FaTrash
                                                    onClick={() =>
                                                        openDelete(designation)
                                                    }
                                                    className="text-red-600 text-xl cursor-pointer hover:scale-110"
                                                />

                                                {designation.status ? (
                                                    <FaToggleOn
                                                        onClick={() =>
                                                            handleStatus(
                                                                designation,
                                                            )
                                                        }
                                                        className="text-green-600 text-xl cursor-pointer hover:scale-110"
                                                    />
                                                ) : (
                                                    <FaToggleOff
                                                        onClick={() =>
                                                            handleStatus(
                                                                designation,
                                                            )
                                                        }
                                                        className="text-gray-500 text-xl cursor-pointer hover:scale-110"
                                                    />
                                                )}
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
                                        No Designations Found
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

            <CreateDesignationModal
                open={createOpen}
                onClose={() => setCreateOpen(false)}
                onSuccess={fetchDesignations}
            />

            <EditDesignationModal
                open={editOpen}
                designation={selectedDesignation}
                onClose={() => setEditOpen(false)}
                onSuccess={fetchDesignations}
            />

            <DeleteDesignationModal
                open={deleteOpen}
                designation={selectedDesignation}
                onClose={() => setDeleteOpen(false)}
                onSuccess={fetchDesignations}
            />

            <ViewDesignationModal
                open={viewOpen}
                designation={selectedDesignation}
                onClose={() => setViewOpen(false)}
            />
        </AdminLayout>
    );
}
