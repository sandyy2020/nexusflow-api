import api from "../api/axios";

const userService = {
    getUsers(params = {}) {
        return api.get("/users", {
            params,
        });
    },

    getUser(id) {
        return api.get(`/users/${id}`);
    },

    createUser(data) {
        return api.post("/users", data);
    },

    updateUser(id, data) {
        return api.put(`/users/${id}`, data);
    },

    deleteUser(id) {
        return api.delete(`/users/${id}`);
    },

    changeStatus(id) {
        return api.patch(`/users/${id}/status`);
    },

    assignRole(id, role) {
        return api.post(`/users/${id}/assign-role`, {
            role,
        });
    },
};

export default userService;
