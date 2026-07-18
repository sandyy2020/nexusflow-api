import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import teamService from "../../services/teamService";

import CreateTeamModal from "./CreateTeamModal";
import EditTeamModal from "./EditTeamModal";
import DeleteTeamModal from "./DeleteTeamModal";
import ViewTeamModal from "./ViewTeamModal";

import {
    FaEye,
    FaEdit,
    FaTrash,
    FaToggleOn,
    FaToggleOff,
} from "react-icons/fa";

export default function TeamList() {
    const [teams, setTeams] = useState([]);
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

    const [selectedTeam, setSelectedTeam] = useState(null);

    useEffect(() => {
        fetchTeams();
    }, [page, perPage, search]);

    const fetchTeams = async () => {
        setLoading(true);

        try {
            const response = await teamService.getTeams({
                page,
                per_page: perPage,
                search,
            });

            setTeams(response.data.data);
            setMeta(response.data.meta);
            setLinks(response.data.links);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const openView = (team) => {
        setSelectedTeam(team);
        setViewOpen(true);
    };

    const openEdit = (team) => {
        setSelectedTeam(team);
        setEditOpen(true);
    };

    const openDelete = (team) => {
        setSelectedTeam(team);
        setDeleteOpen(true);
    };

    const handleStatus = async (team) => {
        try {
            await teamService.changeStatus(team.id, !team.status);

            fetchTeams();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Team Management</h1>

                <button
                    onClick={() => setCreateOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
                >
                    Add Team
                </button>
            </div>

            <div className="flex justify-between mb-5">
                <input
                    className="border rounded px-3 py-2 w-80"
                    placeholder="Search Team..."
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

                                <th className="p-3 text-left">Team</th>

                                <th className="p-3 text-left">Code</th>

                                <th className="p-3 text-left">Department</th>

                                <th className="p-3 text-left">Team Lead</th>

                                <th className="p-3 text-left">Status</th>

                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {teams.length > 0 ? (
                                teams.map((team) => (
                                    <tr
                                        key={team.id}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="p-3">{team.id}</td>

                                        <td className="p-3">{team.name}</td>

                                        <td className="p-3">{team.code}</td>

                                        <td className="p-3">
                                            {team.department?.name}
                                        </td>

                                        <td className="p-3">
                                            {team.team_lead?.name ?? "-"}
                                        </td>

                                        <td className="p-3">
                                            {team.status ? (
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
                                                        openView(team)
                                                    }
                                                    className="text-indigo-600 text-xl cursor-pointer hover:scale-110"
                                                />

                                                <FaEdit
                                                    onClick={() =>
                                                        openEdit(team)
                                                    }
                                                    className="text-yellow-500 text-xl cursor-pointer hover:scale-110"
                                                />

                                                <FaTrash
                                                    onClick={() =>
                                                        openDelete(team)
                                                    }
                                                    className="text-red-600 text-xl cursor-pointer hover:scale-110"
                                                />

                                                {team.status ? (
                                                    <FaToggleOn
                                                        onClick={() =>
                                                            handleStatus(team)
                                                        }
                                                        className="text-green-600 text-xl cursor-pointer hover:scale-110"
                                                    />
                                                ) : (
                                                    <FaToggleOff
                                                        onClick={() =>
                                                            handleStatus(team)
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
                                        colSpan="7"
                                        className="text-center py-10"
                                    >
                                        No Teams Found
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

            <CreateTeamModal
                open={createOpen}
                onClose={() => setCreateOpen(false)}
                onSuccess={fetchTeams}
            />

            <EditTeamModal
                open={editOpen}
                team={selectedTeam}
                onClose={() => setEditOpen(false)}
                onSuccess={fetchTeams}
            />

            <DeleteTeamModal
                open={deleteOpen}
                team={selectedTeam}
                onClose={() => setDeleteOpen(false)}
                onSuccess={fetchTeams}
            />

            <ViewTeamModal
                open={viewOpen}
                team={selectedTeam}
                onClose={() => setViewOpen(false)}
            />
        </AdminLayout>
    );
}
