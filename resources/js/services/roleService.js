import api from "../api/axios";

const roleService = {
    getRoles(params = {}) {
        return api.get("/roles", { params });
    },

    getRole(id) {
        return api.get(`/roles/${id}`);
    },

    createRole(data) {
        return api.post("/roles", data);
    },

    updateRole(id, data) {
        return api.put(`/roles/${id}`, data);
    },

    deleteRole(id) {
        return api.delete(`/roles/${id}`);
    },

    getPermissions() {
        return api.get("/permissions");
    },

    assignPermissions(id, data) {
        return api.post(`/roles/${id}/permissions`, data);
    },
};

export default roleService;
