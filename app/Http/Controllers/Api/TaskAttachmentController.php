<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Task\StoreTaskAttachmentRequest;
use App\Http\Requests\Task\UpdateTaskAttachmentRequest;
use App\Http\Resources\TaskAttachmentCollection;
use App\Http\Resources\TaskAttachmentResource;
use App\Models\TaskAttachment;
use App\Services\TaskAttachment\TaskAttachmentService;
use Illuminate\Http\Request;
use Throwable;

class TaskAttachmentController extends Controller
{
    protected TaskAttachmentService $taskAttachmentService;

    public function __construct(
        TaskAttachmentService $taskAttachmentService
    ) {
        $this->taskAttachmentService = $taskAttachmentService;
    }

    public function index(Request $request)
    {
        try {

            $attachments = $this->taskAttachmentService->index(
                $request->all()
            );

            return ApiResponse::success(
                new TaskAttachmentCollection($attachments),
                'Task attachments retrieved successfully.'
            );
        } catch (Throwable $e) {

            return ApiResponse::error(
                'Failed to retrieve task attachments.',
                500,
                $e->getMessage()
            );
        }
    }

    public function store(StoreTaskAttachmentRequest $request)
    {
        try {

            $attachment = $this->taskAttachmentService->store(
                $request->validated()
            );

            return ApiResponse::success(
                new TaskAttachmentResource($attachment),
                'Task attachment uploaded successfully.',
                201
            );
        } catch (Throwable $e) {

            return ApiResponse::error(
                'Failed to upload task attachment.',
                500,
                $e->getMessage()
            );
        }
    }

    public function show(TaskAttachment $taskAttachment)
    {
        try {

            $attachment = $this->taskAttachmentService->show(
                $taskAttachment
            );

            return ApiResponse::success(
                new TaskAttachmentResource($attachment),
                'Task attachment retrieved successfully.'
            );
        } catch (Throwable $e) {

            return ApiResponse::error(
                'Failed to retrieve task attachment.',
                500,
                $e->getMessage()
            );
        }
    }

    public function update(
        UpdateTaskAttachmentRequest $request,
        TaskAttachment $taskAttachment
    ) {
        try {

            $attachment = $this->taskAttachmentService->update(
                $taskAttachment,
                $request->validated()
            );

            return ApiResponse::success(
                new TaskAttachmentResource($attachment),
                'Task attachment updated successfully.'
            );
        } catch (Throwable $e) {

            return ApiResponse::error(
                'Failed to update task attachment.',
                500,
                $e->getMessage()
            );
        }
    }

    public function destroy(TaskAttachment $taskAttachment)
    {
        try {

            $this->taskAttachmentService->destroy($taskAttachment);

            return ApiResponse::success(
                [],
                'Task attachment deleted successfully.'
            );
        } catch (Throwable $e) {

            return ApiResponse::error(
                'Failed to delete task attachment.',
                500,
                $e->getMessage()
            );
        }
    }

    public function restore(int $id)
    {
        try {

            $attachment = $this->taskAttachmentService->restore($id);

            return ApiResponse::success(
                new TaskAttachmentResource($attachment),
                'Task attachment restored successfully.'
            );
        } catch (Throwable $e) {

            return ApiResponse::error(
                'Failed to restore task attachment.',
                500,
                $e->getMessage()
            );
        }
    }

    public function forceDelete(int $id)
    {
        try {

            $this->taskAttachmentService->forceDelete($id);

            return ApiResponse::success(
                [],
                'Task attachment permanently deleted.'
            );
        } catch (Throwable $e) {

            return ApiResponse::error(
                'Failed to permanently delete task attachment.',
                500,
                $e->getMessage()
            );
        }
    }

    public function changeStatus(TaskAttachment $taskAttachment)
    {
        try {

            $attachment = $this->taskAttachmentService
                ->changeStatus($taskAttachment);

            return ApiResponse::success(
                new TaskAttachmentResource($attachment),
                'Task attachment status updated successfully.'
            );
        } catch (Throwable $e) {

            return ApiResponse::error(
                'Failed to update task attachment status.',
                500,
                $e->getMessage()
            );
        }
    }
}
