export default function ViewTeamModal({ open, onClose, team }) {
    if (!open || !team) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
                <div className="flex justify-between items-center border-b p-5">
                    <h2 className="text-xl font-semibold">Team Details</h2>

                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-500 hover:text-red-500"
                    >
                        ×
                    </button>
                </div>

                <div className="p-6">
                    <table className="w-full">
                        <tbody>
                            <tr className="border-b">
                                <td className="font-semibold py-3 w-48">ID</td>

                                <td>{team.id}</td>
                            </tr>

                            <tr className="border-b">
                                <td className="font-semibold py-3">
                                    Department
                                </td>

                                <td>{team.department?.name ?? "-"}</td>
                            </tr>

                            <tr className="border-b">
                                <td className="font-semibold py-3">
                                    Team Lead
                                </td>

                                <td>{team.team_lead?.name ?? "-"}</td>
                            </tr>

                            <tr className="border-b">
                                <td className="font-semibold py-3">
                                    Team Name
                                </td>

                                <td>{team.name}</td>
                            </tr>

                            <tr className="border-b">
                                <td className="font-semibold py-3">
                                    Team Code
                                </td>

                                <td>{team.code}</td>
                            </tr>

                            <tr className="border-b">
                                <td className="font-semibold py-3">
                                    Description
                                </td>

                                <td>{team.description || "-"}</td>
                            </tr>

                            <tr className="border-b">
                                <td className="font-semibold py-3">Status</td>

                                <td>
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
                            </tr>

                            <tr className="border-b">
                                <td className="font-semibold py-3">
                                    Created At
                                </td>

                                <td>{team.created_at}</td>
                            </tr>

                            <tr>
                                <td className="font-semibold py-3">
                                    Updated At
                                </td>

                                <td>{team.updated_at}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="border-t p-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded bg-gray-600 text-white hover:bg-gray-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
