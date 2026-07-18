import api from "../api/axios";

const designationService = {

    getDesignations(params = {}) {
        return api.get("/designations", {
            params,
        });
    },

    getDesignation(id) {
        return api.get(`/designations/${id}`);
    },

    createDesignation(data) {
        return api.post("/designations", data);
    },

    updateDesignation(id, data) {
        return api.put(`/designations/${id}`, data);
    },

    deleteDesignation(id) {
        return api.delete(`/designations/${id}`);
    },

    changeStatus(id, status) {
        return api.patch(`/designations/${id}/status`, {
            status,
        });
    },

};

export default designationService;