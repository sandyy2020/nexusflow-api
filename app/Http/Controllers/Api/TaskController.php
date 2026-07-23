<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Http\Resources\Task\TaskCollection;
use App\Http\Resources\Task\TaskResource;
use App\Models\Task;
use App\Services\Task\TaskService;
use Illuminate\Http\Request;
use Throwable;

class TaskController extends Controller
{
    protected TaskService $taskService;

    public function __construct(TaskService $taskService)
    {
        $this->taskService = $taskService;
    }


    public function index(Request $request)
    {
        try {

            $tasks = $this->taskService->index($request->all());

            return ApiResponse::success(

                new TaskCollection($tasks),

                'Tasks retrieved successfully.'

            );
        } catch (Throwable $e) {

            return ApiResponse::error(
                'Failed to retrieve tasks.',
                $e->getMessage(),
                500
            );
        }
    }

    public function store(StoreTaskRequest $request)
    {
        try {

            $task = $this->taskService->store(

                $request->validated()

            );

            return ApiResponse::success(

                new TaskResource($task),

                'Task created successfully.',

                201

            );
        } catch (Throwable $e) {

            return ApiResponse::error(
                'Failed to retrieve tasks.',
                $e->getMessage(),
                500
            );
        }
    }

    public function show(Task $task)
    {
        try {

            $task = $this->taskService->show($task);

            return ApiResponse::success(

                new TaskResource($task),

                'Task retrieved successfully.'

            );
        } catch (Throwable $e) {
            return ApiResponse::error(
                'Failed to retrieve tasks.',
                $e->getMessage(),
                500
            );
        }
    }

    /**
     * Update the specified task.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        try {

            $task = $this->taskService->update(
                $task,
                $request->validated()
            );

            return ApiResponse::success(
                new TaskResource($task),
                'Task updated successfully.'
            );
        } catch (Throwable $e) {

            return ApiResponse::error(
                'Failed to retrieve tasks.',
                $e->getMessage(),
                500
            );
        }
    }

    /**
     * Remove the specified task (Soft Delete).
     */
    public function destroy(Task $task)
    {
        try {

            $this->taskService->destroy($task);

            return ApiResponse::success(
                null,
                'Task deleted successfully.'
            );
        } catch (Throwable $e) {
            return ApiResponse::error(
                'Failed to retrieve tasks.',
                $e->getMessage(),
                500
            );
        }
    }

    /**
     * Toggle task Active / Inactive status.
     */
    public function changeStatus(Task $task)
    {
        try {

            $task = $this->taskService->changeStatus($task);

            return ApiResponse::success(
                new TaskResource($task),
                'Task status updated successfully.'
            );
        } catch (Throwable $e) {

            return ApiResponse::error(
                'Failed to retrieve tasks.',
                $e->getMessage(),
                500
            );
        }
    }

    /**
     * Restore a soft deleted task.
     */
    public function restore(int $id)
    {
        try {

            $task = $this->taskService->restore($id);

            return ApiResponse::success(
                new TaskResource($task),
                'Task restored successfully.'
            );
        } catch (Throwable $e) {

            return ApiResponse::error(
                'Failed to retrieve tasks.',
                $e->getMessage(),
                500
            );
        }
    }

    /**
     * Permanently delete task.
     */
    public function forceDelete(int $id)
    {
        try {

            $this->taskService->forceDelete($id);

            return ApiResponse::success(
                null,
                'Task permanently deleted.'
            );
        } catch (Throwable $e) {

            return ApiResponse::error(
                'Failed to retrieve tasks.',
                $e->getMessage(),
                500
            );
        }
    }

    /**
     * Assign users to a task.
     */
    public function assignUsers(Request $request, Task $task)
    {
        $request->validate([
            'user_ids' => ['required', 'array'],
            'user_ids.*' => ['integer', 'exists:users,id'],
        ]);

        try {

            $task = $this->taskService->assignUsers(
                $task,
                $request->user_ids
            );

            return ApiResponse::success(
                new TaskResource($task),
                'Users assigned successfully.'
            );
        } catch (Throwable $e) {

            return ApiResponse::error(
                'Failed to retrieve tasks.',
                $e->getMessage(),
                500
            );
        }
    }

    /**
     * Remove assigned user.
     */
    public function removeAssignedUser(Task $task, int $userId)
    {
        try {

            $task = $this->taskService->removeAssignedUser(
                $task,
                $userId
            );

            return ApiResponse::success(
                new TaskResource($task),
                'Assigned user removed successfully.'
            );
        } catch (Throwable $e) {

            return ApiResponse::error(
                'Failed to retrieve tasks.',
                $e->getMessage(),
                500
            );
        }
    }

    /**
     * Sync assigned users.
     */
    public function syncAssignments(Request $request, Task $task)
    {
        $request->validate([
            'user_ids' => ['required', 'array'],
            'user_ids.*' => ['integer', 'exists:users,id'],
        ]);

        try {

            $task = $this->taskService->syncAssignments(
                $task,
                $request->user_ids
            );

            return ApiResponse::success(
                new TaskResource($task),
                'Task assignments synchronized successfully.'
            );
        } catch (Throwable $e) {

            return ApiResponse::error(
                'Failed to retrieve tasks.',
                $e->getMessage(),
                500
            );
        }
    }

    /**
     * Change workflow status.
     */
    public function changeTaskStatus(Request $request, Task $task)
    {
        $request->validate([
            'task_status_id' => [
                'required',
                'exists:task_statuses,id'
            ],
        ]);

        try {

            $task = $this->taskService->changeTaskStatus(
                $task,
                $request->task_status_id
            );

            return ApiResponse::success(
                new TaskResource($task),
                'Task status updated successfully.'
            );
        } catch (Throwable $e) {

            return ApiResponse::error(
                'Failed to retrieve tasks.',
                $e->getMessage(),
                500
            );
        }
    }

    /**
     * Change priority.
     */
    public function changeTaskPriority(Request $request, Task $task)
    {
        $request->validate([
            'task_priority_id' => [
                'required',
                'exists:task_priorities,id'
            ],
        ]);

        try {

            $task = $this->taskService->changeTaskPriority(
                $task,
                $request->task_priority_id
            );

            return ApiResponse::success(
                new TaskResource($task),
                'Task priority updated successfully.'
            );
        } catch (Throwable $e) {

            return ApiResponse::error(
                'Failed to retrieve tasks.',
                $e->getMessage(),
                500
            );
        }
    }
}
