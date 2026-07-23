import api from "../api/axios";

const taskAttachmentService = {
    getAttachments(params = {}) {
        return api.get("/task-attachments", {
            params,
        });
    },

    getAttachment(id) {
        return api.get(`/task-attachments/${id}`);
    },

    upload(data) {
        return api.post("/task-attachments", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    update(id, data) {
        return api.post(`/task-attachments/${id}?_method=PUT`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    delete(id) {
        return api.delete(`/task-attachments/${id}`);
    },

    changeStatus(id) {
        return api.patch(`/task-attachments/${id}/status`);
    },

    restore(id) {
        return api.patch(`/task-attachments/restore/${id}`);
    },

    forceDelete(id) {
        return api.delete(`/task-attachments/force-delete/${id}`);
    },
};

export default taskAttachmentService;
