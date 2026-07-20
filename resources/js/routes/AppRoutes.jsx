import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import UserList from "../pages/Users/UserList";

import ProtectedRoute from "./ProtectedRoute";
import RoleList from "../pages/Roles/RoleList";
import PermissionList from "../pages/Permissions/PermissionList";
import DepartmentList from "../pages/Department/DepartmentList";
import Designation from "../pages/Designation/Designation";
import TeamList from "../pages/team/TeamList";
import ProjectList from "../pages/project/ProjectList";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute permission="view dashboard">
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/users"
                element={
                    <ProtectedRoute permission="view users">
                        <UserList />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/roles"
                element={
                    <ProtectedRoute permission="view roles">
                        <RoleList />
                    </ProtectedRoute>
                }
            />
            <Route path="/permissions" element={<PermissionList />} />
            <Route path="/departments" element={<DepartmentList />} />
            <Route path="/designations" element={<Designation />} />
            <Route path="/teams" element={<TeamList />} />
            <Route
                path="/projects"
                element={
                    <ProtectedRoute>
                        <ProjectList />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default AppRoutes;
