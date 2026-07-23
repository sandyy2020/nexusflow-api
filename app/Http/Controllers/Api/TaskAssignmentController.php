<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Task\AssignTaskRequest;
use App\Http\Resources\Task\TaskAssignmentCollection;
use App\Http\Resources\Task\TaskResource;
use App\Models\Task;
use App\Services\Task\TaskService;
use App\Services\TaskAssignment\TaskAssignmentService;
use Illuminate\Http\JsonResponse;
use App\Models\User;

class TaskAssignmentController extends Controller
{
    protected TaskAssignmentService $assignmentService;

    public function __construct(
        TaskAssignmentService $assignmentService,
    ) {
        $this->assignmentService = $assignmentService;
    }

    public function index(Task $task): JsonResponse
    {
        try {

            $assignments = $this->assignmentService
                ->index($task);

            return ApiResponse::success(

                new TaskAssignmentCollection($assignments),

                'Task assignments retrieved successfully.'

            );
        } catch (\Exception $e) {

            return ApiResponse::error(

                'Failed to retrieve task assignments.',

                $e->getMessage(),

                500

            );
        }
    }

    public function store(
        AssignTaskRequest $request,
        Task $task
    ): JsonResponse {
        try {

            $task = $this->assignmentService->store(

                $task,

                $request->validated()['user_ids']

            );

            return ApiResponse::success(

                new TaskResource(
                    $task->load('assignedUsers')
                ),

                'Users assigned successfully.'

            );
        } catch (\Exception $e) {

            return ApiResponse::error(

                'Failed to assign users.',

                $e->getMessage(),

                500

            );
        }
    }

    public function sync(
        AssignTaskRequest $request,
        Task $task
    ): JsonResponse {
        try {

            $task = $this->assignmentService->sync(

                $task,

                $request->validated()['user_ids']

            );

            return ApiResponse::success(

                new TaskResource(
                    $task->load('assignedUsers')
                ),

                'Task assignments updated successfully.'

            );
        } catch (\Exception $e) {

            return ApiResponse::error(

                'Failed to update task assignments.',

                $e->getMessage(),

                500

            );
        }
    }

    public function remove(
        Task $task,
        User $user
    ): JsonResponse {
        try {

            $this->assignmentService->remove(
                $task,
                $user->id
            );

            return ApiResponse::success(

                [],

                'User removed successfully.'

            );
        } catch (\Exception $e) {

            return ApiResponse::error(

                'Failed to remove assigned user.',

                $e->getMessage(),

                500

            );
        }
    }
}
