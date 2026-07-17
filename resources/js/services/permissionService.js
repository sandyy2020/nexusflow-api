import api from "../api/axios";

const permissionService = {

    getPermissions(params = {}) {
        return api.get("/permissions", { params });
    },

    getPermission(id) {
        return api.get(`/permissions/${id}`);
    },

    createPermission(data) {
        return api.post("/permissions", data);
    },

    updatePermission(id, data) {
        return api.put(`/permissions/${id}`, data);
    },

    deletePermission(id) {
        return api.delete(`/permissions/${id}`);
    },

};

export default permissionService;