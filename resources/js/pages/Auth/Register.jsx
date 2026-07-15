import React, { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,

            [e.target.name]: e.target.value,
        });
    };

    const submit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/api/register", form);

            alert("Registration successful");

            navigate("/login");
        } catch (error) {
            console.log(error.response?.data);

            alert("Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-96 border p-6 rounded">
                <h2 className="text-2xl mb-5">Register</h2>

                <form onSubmit={submit}>
                    <input
                        className="border w-full p-2 mb-3"
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                    />

                    <input
                        className="border w-full p-2 mb-3"
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />

                    <input
                        className="border w-full p-2 mb-3"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />

                    <input
                        className="border w-full p-2 mb-3"
                        type="password"
                        name="password_confirmation"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                    />

                    <button className="bg-black text-white w-full p-2">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
