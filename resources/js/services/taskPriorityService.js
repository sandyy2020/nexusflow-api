import api from "../api/axios";

const taskPriorityService = {
    getTaskPriorities(params = {}) {
        return api.get("/task-priorities", { params });
    },

    getTaskPriority(id) {
        return api.get(`/task-priorities/${id}`);
    },
};

export default taskPriorityService;
