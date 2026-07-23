import { useEffect, useState } from "react";

import {
    FaFile,
    FaFilePdf,
    FaFileWord,
    FaFileExcel,
    FaFileImage,
    FaDownload,
    FaTrash,
    FaUpload,
} from "react-icons/fa";

import taskAttachmentService from "../services/taskAttachmentService";
import UploadAttachmentModal from "./UploadAttachmentModal";
export default function TaskAttachmentsTab({ task }) {
    const [attachments, setAttachments] = useState([]);
    const [loading, setLoading] = useState(true);

    const [uploadOpen, setUploadOpen] = useState(false);

    useEffect(() => {
        if (task) {
            fetchAttachments();
        }
    }, [task]);

    const fetchAttachments = async () => {
        setLoading(true);

        try {
            const response = await taskAttachmentService.getAttachments({
                task_id: task.id,
            });

            setAttachments(response.data.data.data ?? []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const deleteAttachment = async (id) => {
        if (!window.confirm("Delete this attachment?")) {
            return;
        }

        try {
            await taskAttachmentService.delete(id);

            fetchAttachments();
        } catch (error) {
            console.log(error);
        }
    };
    const getFileIcon = (attachment) => {
        const ext = attachment.extension?.toLowerCase() ?? "";

        if (attachment.is_image)
            return <FaFileImage className="text-green-600 text-2xl" />;

        if (ext === "pdf")
            return <FaFilePdf className="text-red-600 text-2xl" />;

        if (["doc", "docx"].includes(ext))
            return <FaFileWord className="text-blue-600 text-2xl" />;

        if (["xls", "xlsx", "csv"].includes(ext))
            return <FaFileExcel className="text-green-700 text-2xl" />;

        return <FaFile className="text-gray-600 text-2xl" />;
    };
    return (
        <>
            <div className="space-y-5">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Attachments</h3>

                    <button
                        onClick={() => setUploadOpen(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        <FaUpload />
                        Upload Attachment
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-10">
                        Loading attachments...
                    </div>
                ) : attachments.length === 0 ? (
                    <div className="bg-gray-50 rounded-lg p-10 text-center text-gray-500">
                        No attachments found.
                    </div>
                ) : (
                    <div className="overflow-x-auto border rounded-lg">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="text-left p-3">File</th>

                                    <th className="text-left p-3">Size</th>

                                    <th className="text-left p-3">
                                        Uploaded By
                                    </th>

                                    <th className="text-left p-3">Uploaded</th>

                                    <th className="text-center p-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {attachments.map((attachment) => (
                                    <tr
                                        key={attachment.id}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="p-3">
                                            <div className="flex items-center gap-3">
                                                {getFileIcon(attachment)}

                                                <div>
                                                    <div className="font-medium">
                                                        <a
                                                            href={
                                                                attachment.file_url
                                                            }
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            {
                                                                attachment.file_name
                                                            }
                                                        </a>

                                                        <div className="text-xs text-gray-500">
                                                            {
                                                                attachment.mime_type
                                                            }
                                                        </div>
                                                    </div>

                                                    {attachment.is_image && (
                                                        <img
                                                            src={
                                                                attachment.file_url
                                                            }
                                                            alt=""
                                                            className="mt-2 w-20 h-20 rounded border object-cover"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-3">
                                            {attachment.file_size_human}
                                        </td>

                                        <td className="p-3">
                                            {attachment.uploader?.name ?? "-"}
                                        </td>

                                        <td className="p-3">
                                            {attachment.created_at}
                                        </td>

                                        <td className="p-3">
                                            <div className="flex justify-center gap-4">
                                                <a
                                                    href={attachment.file_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <FaDownload className="text-green-600 cursor-pointer text-lg hover:text-green-800" />
                                                </a>

                                                <FaTrash
                                                    onClick={() =>
                                                        deleteAttachment(
                                                            attachment.id,
                                                        )
                                                    }
                                                    className="text-red-600 cursor-pointer text-lg hover:text-red-800"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <UploadAttachmentModal
                open={uploadOpen}
                task={task}
                onClose={() => setUploadOpen(false)}
                onSuccess={fetchAttachments}
            />
        </>
    );
}
