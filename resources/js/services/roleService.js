import api from "../api/axios";

const roleService = {

    getRoles(params = {}) {
        return api.get("/roles", { params });
    },

};

export default roleService;