import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

function Login() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const submit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await api.post("/login", form);

            await login(response.data.data.token);

            navigate("/dashboard");

        } catch (error) {
            console.log(error.response?.data);

            alert(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-96 bg-white shadow-lg rounded-lg p-6">

                <h1 className="text-3xl font-bold mb-6 text-center">
                    NexusFlow
                </h1>

                <form onSubmit={submit}>

                    <input
                        className="border rounded w-full p-3 mb-4"
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <input
                        className="border rounded w-full p-3 mb-5"
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white rounded p-3 hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

            </div>
        </div>
    );
}

export default Login;