import api from "../api/axios";

const teamService = {
    getTeams(params = {}) {
        return api.get("/teams", {
            params,
        });
    },

    getTeam(id) {
        return api.get(`/teams/${id}`);
    },

    createTeam(data) {
        return api.post("/teams", data);
    },

    updateTeam(id, data) {
        return api.put(`/teams/${id}`, data);
    },

    deleteTeam(id) {
        return api.delete(`/teams/${id}`);
    },

    changeStatus(id, status) {
        return api.patch(`/teams/${id}/status`, {
            status,
        });
    },

    getTeamsByDepartment(departmentId) {
        return api.get(`/departments/${departmentId}/teams`);
    },
};

export default teamService;
