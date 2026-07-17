import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import departmentService from "../../services/departmentService";

import CreateDepartmentModal from "./CreateDepartmentModal";
import EditDepartmentModal from "./EditDepartmentModal";
import DeleteDepartmentModal from "./DeleteDepartmentModal";
import ViewDepartmentModal from "./ViewDepartmentModal";

import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export default function DepartmentList() {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    const [meta, setMeta] = useState({});
    const [links, setLinks] = useState({});

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState("");

    const [openCreate, setOpenCreate] = useState(false);

    const [editOpen, setEditOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteDepartment, setDeleteDepartment] = useState(null);

    const [viewOpen, setViewOpen] = useState(false);
    useEffect(() => {
        fetchDepartments();
    }, [page, perPage, search]);

    const fetchDepartments = async () => {
        setLoading(true);

        try {
            const response = await departmentService.getDepartments({
                page,
                per_page: perPage,
                search,
            });

            setDepartments(response.data.data);

            setMeta(response.data.meta);

            setLinks(response.data.links);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const editDepartment = (department) => {
        setSelectedDepartment(department);
        setEditOpen(true);
    };

    const removeDepartment = (department) => {
        setDeleteDepartment(department);
        setDeleteOpen(true);
    };

    const openViewModal = (department) => {
        setSelectedDepartment(department);
        setViewOpen(true);
    };

    const toggleStatus = async (department) => {
        try {
            const newStatus = !department.status;

            await departmentService.changeStatus(department.id, newStatus);

            setDepartments((prev) =>
                prev.map((d) =>
                    d.id === department.id ? { ...d, status: newStatus } : d,
                ),
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-6">Departments</h1>

            <div className="flex justify-end mb-5">
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
                    onClick={() => setOpenCreate(true)}
                >
                    <FaPlus />
                    Add Department
                </button>
            </div>
            <div className="flex justify-between mb-5">
                <input
                    className="border rounded px-3 py-2 w-80"
                    placeholder="Search departments..."
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
                <div>Loading...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-4 py-2">#</th>

                                <th className="border px-4 py-2">Name</th>

                                <th className="border px-4 py-2">
                                    Description
                                </th>

                                <th className="border px-4 py-2">Status</th>

                                <th className="border px-4 py-2">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {departments.length > 0 ? (
                                departments.map((department, index) => (
                                    <tr key={department.id}>
                                        <td className="border px-4 py-2">
                                            {index + 1}
                                        </td>

                                        <td className="border px-4 py-2">
                                            {department.name}
                                        </td>

                                        <td className="border px-4 py-2">
                                            {department.description}
                                        </td>

                                        <td className="border px-4 py-2">
                                            {department.status
                                                ? "Active"
                                                : "Inactive"}
                                        </td>

                                        <td className="border px-4 py-2">
                                            <div className="flex justify-center items-center gap-5">
                                                <FaEye
                                                    className="text-indigo-600 text-xl cursor-pointer"
                                                    onClick={() =>
                                                        openViewModal(
                                                            department,
                                                        )
                                                    }
                                                />

                                                <FaEdit
                                                    className="text-yellow-500 text-xl cursor-pointer"
                                                    onClick={() =>
                                                        editDepartment(
                                                            department,
                                                        )
                                                    }
                                                />

                                                <FaTrash
                                                    className="text-red-600 text-xl cursor-pointer"
                                                    onClick={() =>
                                                        removeDepartment(
                                                            department,
                                                        )
                                                    }
                                                />

                                                <button
                                                    onClick={() =>
                                                        toggleStatus(department)
                                                    }
                                                    className={`relative inline-flex h-7 w-14 items-center rounded-full ${
                                                        department.status
                                                            ? "bg-green-500"
                                                            : "bg-gray-400"
                                                    }`}
                                                >
                                                    <span
                                                        className={`inline-block h-5 w-5 transform rounded-full bg-white ${
                                                            department.status
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
                                        colSpan="5"
                                        className="text-center py-4"
                                    >
                                        No departments found
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

            <CreateDepartmentModal
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onSuccess={fetchDepartments}
            />

            <EditDepartmentModal
                open={editOpen}
                department={selectedDepartment}
                onClose={() => {
                    setEditOpen(false);
                    setSelectedDepartment(null);
                }}
                onSuccess={fetchDepartments}
            />

            <DeleteDepartmentModal
                open={deleteOpen}
                department={deleteDepartment}
                onClose={() => {
                    setDeleteOpen(false);
                    setDeleteDepartment(null);
                }}
                onSuccess={fetchDepartments}
            />

            <ViewDepartmentModal
                open={viewOpen}
                department={selectedDepartment}
                onClose={() => {
                    setViewOpen(false);
                    setSelectedDepartment(null);
                }}
            />
        </AdminLayout>
    );
}
