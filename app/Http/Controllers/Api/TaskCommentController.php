<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Task\StoreTaskCommentRequest;
use App\Http\Requests\Task\UpdateTaskCommentRequest;
use App\Http\Resources\Task\TaskCommentCollection;
use App\Http\Resources\Task\TaskCommentResource;
use App\Models\TaskComment;
use App\Services\TaskComment\TaskCommentService;
use Illuminate\Http\Request;

class TaskCommentController extends Controller
{
    protected TaskCommentService $taskCommentService;

    public function __construct(TaskCommentService $taskCommentService)
    {
        $this->taskCommentService = $taskCommentService;
    }

    public function index(Request $request)
    {
        $comments = $this->taskCommentService->index(
            $request->only([
                'task_id',
                'user_id',
                'status',
                'per_page',
            ])
        );

        return ApiResponse::success(
            new TaskCommentCollection($comments),
            'Task comments retrieved successfully.'
        );
    }

    /**
     * Store a newly created comment.
     */
    public function store(StoreTaskCommentRequest $request)
    {
        $comment = $this->taskCommentService->store(
            $request->validated()
        );

        return ApiResponse::success(
            new TaskCommentResource($comment),
            'Task comment created successfully.',
            201
        );
    }

    /**
     * Display the specified comment.
     */
    public function show(TaskComment $taskComment)
    {
        return ApiResponse::success(
            new TaskCommentResource(
                $this->taskCommentService->show($taskComment)
            ),
            'Task comment retrieved successfully.'
        );
    }

    /**
     * Update the specified comment.
     */
    public function update(
        UpdateTaskCommentRequest $request,
        TaskComment $taskComment
    ) {
        $comment = $this->taskCommentService->update(
            $taskComment,
            $request->validated()
        );

        return ApiResponse::success(
            new TaskCommentResource($comment),
            'Task comment updated successfully.'
        );
    }

    /**
     * Remove the specified comment.
     */
    public function destroy(TaskComment $taskComment)
    {
        $this->taskCommentService->destroy($taskComment);

        return ApiResponse::success(
            null,
            'Task comment deleted successfully.'
        );
    }

    /**
     * Restore a soft deleted comment.
     */
    public function restore(int $id)
    {
        $comment = $this->taskCommentService->restore($id);

        return ApiResponse::success(
            new TaskCommentResource($comment),
            'Task comment restored successfully.'
        );
    }

    /**
     * Permanently delete a comment.
     */
    public function forceDelete(int $id)
    {
        $this->taskCommentService->forceDelete($id);

        return ApiResponse::success(
            null,
            'Task comment permanently deleted.'
        );
    }

    /**
     * Toggle Active/Inactive.
     */
    public function changeStatus(TaskComment $taskComment)
    {
        $comment = $this->taskCommentService->changeStatus($taskComment);

        return ApiResponse::success(
            new TaskCommentResource($comment),
            'Task comment status updated successfully.'
        );
    }

    /**
     * Pin / Unpin comment.
     */
    public function togglePin(TaskComment $taskComment)
    {
        $comment = $this->taskCommentService->togglePin($taskComment);

        return ApiResponse::success(
            new TaskCommentResource($comment),
            'Task comment pin status updated successfully.'
        );
    }
}