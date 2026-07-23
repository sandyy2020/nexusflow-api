import api from "../api/axios";

const taskService = {
    getTasks(params = {}) {
        return api.get("/tasks", {
            params,
        });
    },

    getTask(id) {
        return api.get(`/tasks/${id}`);
    },

    createTask(data) {
        return api.post("/tasks", data);
    },

    updateTask(id, data) {
        return api.put(`/tasks/${id}`, data);
    },

    deleteTask(id) {
        return api.delete(`/tasks/${id}`);
    },

    changeStatus(id) {
        return api.patch(`/tasks/${id}/status`);
    },

    restoreTask(id) {
        return api.patch(`/tasks/${id}/restore`);
    },

    forceDeleteTask(id) {
        return api.delete(`/tasks/${id}/force-delete`);
    },

    assignUsers(id, data) {
        return api.post(`/tasks/${id}/assign-users`, data);
    },

    removeAssignedUser(taskId, userId) {
        return api.delete(`/tasks/${taskId}/assigned-users/${userId}`);
    },

    syncAssignments(id, data) {
        return api.put(`/tasks/${id}/sync-assignments`, data);
    },

    changeTaskStatus(id, data) {
        return api.patch(`/tasks/${id}/workflow-status`, data);
    },

    changeTaskPriority(id, data) {
        return api.patch(`/tasks/${id}/priority`, data);
    },
};

export default taskService;
