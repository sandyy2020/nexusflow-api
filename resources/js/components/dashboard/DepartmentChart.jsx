import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

export default function DepartmentChart({ data }) {
    const chartData = {
        labels: data.map((d) => d.name),
        datasets: [
            {
                label: "Users",
                data: data.map((d) => d.users_count),
            },
        ],
    };

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-bold text-lg mb-4">
                Users by Department
            </h2>

            <Bar data={chartData} />
        </div>
    );
}