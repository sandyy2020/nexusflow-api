import { useState } from "react";

import taskAttachmentService from "../services/taskAttachmentService";

export default function UploadAttachmentModal({
    open,
    task,
    onClose,
    onSuccess,
}) {
    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please choose a file.");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("task_id", task.id);

            formData.append("file", file);

            await taskAttachmentService.upload(formData);

            onSuccess();

            onClose();

            setFile(null);
        } catch (error) {
            console.log(error);

            alert("Upload failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-xl w-[500px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="border-b px-6 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Upload Attachment</h2>

                    <button
                        onClick={onClose}
                        className="text-3xl text-gray-500 hover:text-red-600"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-5">
                        <div>
                            <label className="block mb-2 font-medium">
                                Select File
                            </label>

                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                    </div>

                    <div className="border-t px-6 py-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded border"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded disabled:opacity-50"
                        >
                            {loading ? "Uploading..." : "Upload"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
