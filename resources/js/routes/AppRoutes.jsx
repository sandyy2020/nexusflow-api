import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard/Dashboard";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes(){

    return (

        <Routes>

            <Route path="/" element={<Navigate to="/login" replace /> }/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute permission="view dashboard"><Dashboard /></ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute permission="view users"><UserList /></ProtectedRoute>} />

        </Routes>

    );

}

export default AppRoutes;