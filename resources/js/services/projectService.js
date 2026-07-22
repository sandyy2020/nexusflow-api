import api from "../api/axios";

const projectService = {
    getProjects(params = {}) {
        return api.get("/projects", {
            params,
        });
    },

    getProject(id) {
        return api.get(`/projects/${id}`);
    },

    createProject(data) {
        return api.post("/projects", data);
    },

    updateProject(id, data) {
        return api.put(`/projects/${id}`, data);
    },

    deleteProject(id) {
        return api.delete(`/projects/${id}`);
    },

    changeStatus(id, status) {
        return api.patch(`/projects/${id}/status`, {
            status,
        });
    },
};

export default projectService;
