import api from "../api/axios";

const departmentService = {
    getDepartments(params = {}) {
        return api.get("/departments", {
            params,
        });
    },

    getDepartment(id) {
        return api.get(`/departments/${id}`);
    },

    createDepartment(data) {
        return api.post("/departments", data);
    },

    updateDepartment(id, data) {
        return api.put(`/departments/${id}`, data);
    },

    deleteDepartment(id) {
        return api.delete(`/departments/${id}`);
    },

    changeStatus(id, status) {
        return api.patch(`/departments/${id}/status`, {
            status,
        });
    },
};

export default departmentService;
