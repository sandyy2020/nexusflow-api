import { useState } from "react";

import TaskOverviewTab from "../../components/TaskOverviewTab";
import TaskAssignmentsTab from "../../components/TaskAssignmentsTab";
import TaskAttachmentsTab from "../../components/TaskAttachmentsTab";

export default function TaskDetailsModal({ open, task, onClose }) {
    const [activeTab, setActiveTab] = useState("overview");

    if (!open || !task) return null;

    const tabs = [
        {
            key: "overview",
            label: "Overview",
        },
        {
            key: "assignments",
            label: "Assignments",
        },
        {
            key: "attachments",
            label: "Attachments",
        },
        {
            key: "comments",
            label: "Comments",
        },
        {
            key: "checklist",
            label: "Checklist",
        },
        {
            key: "timelogs",
            label: "Time Logs",
        },
        {
            key: "activity",
            label: "Activity",
        },
    ];

    return (
        <div
            className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-xl w-[1200px] max-w-[95vw] h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="border-b px-6 py-4 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">Task Details</h2>

                        <p className="text-gray-500 mt-1">{task.task_code}</p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-3xl text-gray-500 hover:text-red-600"
                    >
                        ×
                    </button>
                </div>

                <div className="border-b px-6">
                    <div className="flex gap-2 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-5 py-3 border-b-2 transition ${
                                    activeTab === tab.key
                                        ? "border-blue-600 text-blue-600 font-semibold"
                                        : "border-transparent text-gray-600 hover:text-blue-600"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === "overview" && (
                        <TaskOverviewTab task={task} />
                    )}

                    {activeTab === "assignments" && (
                        <TaskAssignmentsTab task={task} />
                    )}

                    {activeTab === "attachments" && (
                        <TaskAttachmentsTab task={task} />
                    )}

                    {activeTab === "comments" && (
                        <div className="text-gray-500">
                            Comments module coming next...
                        </div>
                    )}

                    {activeTab === "checklist" && (
                        <div className="text-gray-500">
                            Checklist module coming next...
                        </div>
                    )}

                    {activeTab === "timelogs" && (
                        <div className="text-gray-500">
                            Time Logs module coming next...
                        </div>
                    )}

                    {activeTab === "activity" && (
                        <div className="text-gray-500">
                            Activity module coming next...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
