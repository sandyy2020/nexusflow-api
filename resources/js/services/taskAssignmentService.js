import api from "../api/axios";

const taskAssignmentService = {
    getAssignments(taskId) {
        return api.get(`/tasks/${taskId}/assignments`);
    },

    assignUsers(taskId, userIds) {
        return api.post(`/tasks/${taskId}/assignments`, {
            user_ids: userIds,
        });
    },

    syncAssignments(taskId, userIds) {
        return api.put(`/tasks/${taskId}/assignments/sync`, {
            user_ids: userIds,
        });
    },

    removeUser(taskId, userId) {
        return api.delete(`/tasks/${taskId}/assignments/${userId}`);
    },
};

export default taskAssignmentService;
