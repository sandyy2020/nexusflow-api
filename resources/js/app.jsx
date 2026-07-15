import "./bootstrap";

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

createRoot(document.getElementById("app")).render(
    <BrowserRouter>
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    </BrowserRouter>
);
