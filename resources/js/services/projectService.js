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

    // Load all departments
    getDepartments() {
        return api.get("/departments", {
            params: {
                per_page: 100,
            },
        });
    },

    // Load teams by department
    getTeamsByDepartment(departmentId) {
        return api.get(`/departments/${departmentId}/teams`);
    },

    // Load users by team (Project Managers)
    getUsersByTeam(teamId) {
        return api.get(`/teams/${teamId}/users`);
    },
};

export default projectService;
