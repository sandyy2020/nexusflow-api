import api from "../api/axios";

const dashboardService = {

    getDashboard() {
        return api.get("/dashboard");
    }

};

export default dashboardService;