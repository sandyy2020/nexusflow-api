import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import userService from "../../services/userService";

export default function UserList() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [pagination, setPagination] = useState({});

    const [page, setPage] = useState(1);

    const [perPage, setPerPage] = useState(10);

    const [search, setSearch] = useState("");

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

            setUsers(response.data.data.data);

            setPagination(response.data.data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <AdminLayout>

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">

                    Users

                </h1>

                <button className="bg-blue-600 text-white px-5 py-2 rounded">

                    Add User

                </button>

            </div>

            <div className="flex justify-between mb-4">

                <input

                    className="border rounded px-3 py-2 w-80"

                    placeholder="Search user..."

                    value={search}

                    onChange={(e) => {

                        setSearch(e.target.value);

                        setPage(1);

                    }}

                />

                <select

                    className="border rounded px-3"

                    value={perPage}

                    onChange={(e) => {

                        setPerPage(e.target.value);

                        setPage(1);

                    }}

                >

                    <option value="10">10</option>

                    <option value="25">25</option>

                    <option value="50">50</option>

                </select>

            </div>

            {loading ? (

                <div>

                    Loading...

                </div>

            ) : (

                <table className="w-full bg-white rounded shadow">

                    <thead>

                        <tr className="bg-gray-100">

                            <th className="p-3">ID</th>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Role</th>

                            <th>Status</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {users.map((user) => (

                            <tr
                                key={user.id}
                                className="border-b"
                            >

                                <td className="p-3">

                                    {user.id}

                                </td>

                                <td>

                                    {user.name}

                                </td>

                                <td>

                                    {user.email}

                                </td>

                                <td>

                                    {user.roles.join(", ")}

                                </td>

                                <td>

                                    {user.status ? (

                                        <span className="text-green-600">

                                            Active

                                        </span>

                                    ) : (

                                        <span className="text-red-600">

                                            Inactive

                                        </span>

                                    )}

                                </td>

                                <td>

                                    Edit | Delete

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

            <div className="flex justify-between mt-6">

                <button

                    disabled={!pagination.prev_page_url}

                    onClick={() => setPage(page - 1)}

                    className="px-4 py-2 border rounded disabled:opacity-40"

                >

                    Previous

                </button>

                <div>

                    Page {pagination.current_page} of {pagination.last_page}

                </div>

                <button

                    disabled={!pagination.next_page_url}

                    onClick={() => setPage(page + 1)}

                    className="px-4 py-2 border rounded disabled:opacity-40"

                >

                    Next

                </button>

            </div>

        </AdminLayout>

    );

}