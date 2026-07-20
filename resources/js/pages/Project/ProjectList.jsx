import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import projectService from "../../services/projectService";

import CreateProjectModal from "./CreateProjectModal";
import EditProjectModal from "./EditProjectModal";
import DeleteProjectModal from "./DeleteProjectModal";
import ViewProjectModal from "./ViewProjectModal";

import {
    FaEye,
    FaEdit,
    FaTrash,
    FaToggleOn,
    FaToggleOff,
} from "react-icons/fa";

export default function ProjectList() {
    const [projects, setProjects] = useState([]);
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

    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, [page, perPage, search]);

    const fetchProjects = async () => {
        setLoading(true);

        try {
            const response = await projectService.getProjects({
                page,
                per_page: perPage,
                search,
            });

            setProjects(response.data.data);
            setMeta(response.data.meta);
            setLinks(response.data.links);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const openView = (project) => {
        setSelectedProject(project);
        setViewOpen(true);
    };

    const openEdit = (project) => {
        setSelectedProject(project);
        setEditOpen(true);
    };

    const openDelete = (project) => {
        setSelectedProject(project);
        setDeleteOpen(true);
    };

    const handleStatus = async (project) => {
        try {
            await projectService.changeStatus(project.id, !project.status);

            fetchProjects();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Project Management</h1>

                <button
                    onClick={() => setCreateOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
                >
                    Add Project
                </button>
            </div>

            <div className="flex justify-between mb-5">
                <input
                    className="border rounded px-3 py-2 w-80"
                    placeholder="Search Project..."
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
                                <th className="p-3 text-left">Project</th>
                                <th className="p-3 text-left">Code</th>
                                <th className="p-3 text-left">Department</th>
                                <th className="p-3 text-left">Team</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {projects.length > 0 ? (
                                projects.map((project) => (
                                    <tr
                                        key={project.id}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="p-3">{project.id}</td>

                                        <td className="p-3">{project.name}</td>

                                        <td className="p-3">{project.code}</td>

                                        <td className="p-3">
                                            {project.department?.name}
                                        </td>

                                        <td className="p-3">
                                            {project.team?.name}
                                        </td>

                                        <td className="p-3">
                                            {project.status ? (
                                                <span className="text-green-600 font-semibold">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="text-red-600 font-semibold">
                                                    Inactive
                                                </span>
                                            )}
                                        </td>

                                        <td className="p-3">
                                            <div className="flex justify-center gap-5">
                                                <FaEye
                                                    onClick={() =>
                                                        openView(project)
                                                    }
                                                    className="text-indigo-600 text-xl cursor-pointer"
                                                />

                                                <FaEdit
                                                    onClick={() =>
                                                        openEdit(project)
                                                    }
                                                    className="text-yellow-500 text-xl cursor-pointer"
                                                />

                                                <FaTrash
                                                    onClick={() =>
                                                        openDelete(project)
                                                    }
                                                    className="text-red-600 text-xl cursor-pointer"
                                                />

                                                {project.status ? (
                                                    <FaToggleOn
                                                        onClick={() =>
                                                            handleStatus(
                                                                project,
                                                            )
                                                        }
                                                        className="text-green-600 text-xl cursor-pointer"
                                                    />
                                                ) : (
                                                    <FaToggleOff
                                                        onClick={() =>
                                                            handleStatus(
                                                                project,
                                                            )
                                                        }
                                                        className="text-gray-500 text-xl cursor-pointer"
                                                    />
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="text-center py-10"
                                    >
                                        No Projects Found
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

            <CreateProjectModal
                open={createOpen}
                onClose={() => setCreateOpen(false)}
                onSuccess={fetchProjects}
            />

            <EditProjectModal
                open={editOpen}
                project={selectedProject}
                onClose={() => setEditOpen(false)}
                onSuccess={fetchProjects}
            />

            <DeleteProjectModal
                open={deleteOpen}
                project={selectedProject}
                onClose={() => setDeleteOpen(false)}
                onSuccess={fetchProjects}
            />

            <ViewProjectModal
                open={viewOpen}
                project={selectedProject}
                onClose={() => setViewOpen(false)}
            />
        </AdminLayout>
    );
}
