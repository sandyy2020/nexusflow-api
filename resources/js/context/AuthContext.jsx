import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        try {
            const response = await api.get("/me");

            setUser(response.data.data);
        } catch (error) {
            localStorage.removeItem("token");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            getUser();
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (token) => {
        localStorage.setItem("token", token);

        await getUser();
    };

    const logout = async () => {
        try {
            await api.post("/logout");
        } catch (error) {}

        localStorage.removeItem("token");

        setUser(null);

        window.location.href = "/login";
    };

    const hasRole = (role) => {

        if (!user) return false;

        return user.roles?.includes(role);

    };

    const hasPermission = (permission) => {

        if (!user) return false;

        return user.permissions?.includes(permission);

    };

    const hasAnyPermission = (permissions = []) => {

        if (!user) return false;

        return permissions.some(permission =>
            user.permissions?.includes(permission)
        );

    };

    const hasAnyRole = (roles = []) => {

        if (!user) return false;

        return roles.some(role =>
            user.roles?.includes(role)
        );

    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                hasRole,
                hasAnyRole,
                hasPermission,
                hasAnyPermission,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}