<?php

namespace App\Services\Task;

use App\Models\Task;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class TaskService
{
    /*
    |--------------------------------------------------------------------------
    | List Tasks
    |--------------------------------------------------------------------------
    */

    public function index(array $filters = [])
    {
        return Task::with([
            'project',
            'parent',
            'taskStatus',
            'taskPriority',
            'creator',
            'updater',
            'assignedUsers',
        ])
            ->withCount([
                'attachments',
                'comments',
                'checklists',
                'activities',
            ])
            ->when(
                !empty($filters['search']),
                function ($query) use ($filters) {
                    $query->where(function ($q) use ($filters) {
                        $q->where(
                            'title',
                            'like',
                            "%{$filters['search']}%"
                        )
                        ->orWhere(
                            'task_code',
                            'like',
                            "%{$filters['search']}%"
                        );
                    });
                }
            )
            ->when(
                !empty($filters['project_id']),
                fn($query) =>
                $query->where(
                    'project_id',
                    $filters['project_id']
                )
            )
            ->when(
                !empty($filters['task_status_id']),
                fn($query) =>
                $query->where(
                    'task_status_id',
                    $filters['task_status_id']
                )
            )
            ->when(
                !empty($filters['task_priority_id']),
                fn($query) =>
                $query->where(
                    'task_priority_id',
                    $filters['task_priority_id']
                )
            )
            ->when(
                isset($filters['status']) &&
                $filters['status'] !== '',
                fn($query) =>
                $query->where(
                    'status',
                    $filters['status']
                )
            )
            ->latest()
            ->paginate(
                $filters['per_page'] ?? 10
            );
    }

    /*
    |--------------------------------------------------------------------------
    | Create Task
    |--------------------------------------------------------------------------
    */

    public function store(array $data)
    {
        return DB::transaction(function () use ($data) {

            $data['task_code'] = $this->generateTaskCode();

            $data['created_by'] = Auth::id();

            $data['progress'] = $data['progress'] ?? 0;

            $data['task_status_id'] =
                $data['task_status_id'] ?? 1;

            $task = Task::create($data);

            $this->logActivity(
                $task,
                'created'
            );

            return $task->load([
                'project',
                'parent',
                'taskStatus',
                'taskPriority',
                'creator',
                'updater',
                'assignedUsers',
            ]);
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Generate Task Code
    |--------------------------------------------------------------------------
    */

    private function generateTaskCode(): string
    {
        $lastTask = Task::latest('id')->first();

        $number = $lastTask
            ? ((int) substr($lastTask->task_code, 5)) + 1
            : 1;

        return 'TASK-' .
            str_pad(
                $number,
                5,
                '0',
                STR_PAD_LEFT
            );
    }

    /*
    |--------------------------------------------------------------------------
    | Show Task
    |--------------------------------------------------------------------------
    */

    public function show(Task $task)
    {
        return $task->load([
            'project',
            'parent',
            'children',
            'taskStatus',
            'taskPriority',
            'creator',
            'updater',
            'assignedUsers',
            'attachments',
            'comments.user',
            'timeLogs.user',
            'checklists',
            'activities.user',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Update Task
    |--------------------------------------------------------------------------
    */

    public function update(Task $task, array $data)
    {
        return DB::transaction(function () use ($task, $data) {

            $data['updated_by'] = Auth::id();

            if (
                isset($data['progress']) &&
                (int)$data['progress'] === 100 &&
                empty($task->completed_at)
            ) {
                $data['completed_at'] = now();
            }

            if (
                isset($data['progress']) &&
                (int)$data['progress'] < 100
            ) {
                $data['completed_at'] = null;
            }

            $oldValues = $task->only(
                array_keys($data)
            );

            $task->update($data);

            foreach ($data as $field => $value) {

                if (
                    array_key_exists(
                        $field,
                        $oldValues
                    ) &&
                    $oldValues[$field] != $value
                ) {

                    $this->logActivity(
                        $task,
                        'updated',
                        $field,
                        $oldValues[$field],
                        $value
                    );
                }
            }

            return $task->fresh()->load([
                'project',
                'parent',
                'taskStatus',
                'taskPriority',
                'creator',
                'updater',
                'assignedUsers',
            ]);
        });
    }
        /*
    |--------------------------------------------------------------------------
    | Soft Delete Task
    |--------------------------------------------------------------------------
    */

    public function destroy(Task $task)
    {
        return DB::transaction(function () use ($task) {

            $this->logActivity(
                $task,
                'deleted'
            );

            $task->delete();

            return true;
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Restore Task
    |--------------------------------------------------------------------------
    */

    public function restore(int $id)
    {
        return DB::transaction(function () use ($id) {

            $task = Task::onlyTrashed()
                ->findOrFail($id);

            $task->restore();

            $this->logActivity(
                $task,
                'restored'
            );

            return $task->load([
                'project',
                'parent',
                'taskStatus',
                'taskPriority',
                'creator',
                'updater',
                'assignedUsers',
            ]);
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Force Delete Task
    |--------------------------------------------------------------------------
    */

    public function forceDelete(int $id)
    {
        return DB::transaction(function () use ($id) {

            $task = Task::onlyTrashed()
                ->findOrFail($id);

            $this->logActivity(
                $task,
                'force_deleted'
            );

            $task->forceDelete();

            return true;
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Change Active Status
    |--------------------------------------------------------------------------
    */

    public function changeStatus(Task $task)
    {
        $oldStatus = $task->status;

        $task->status = !$task->status;

        $task->save();

        $this->logActivity(
            $task,
            'status_toggle',
            'status',
            $oldStatus,
            $task->status
        );

        return $task->fresh()->load([
            'project',
            'parent',
            'taskStatus',
            'taskPriority',
            'creator',
            'updater',
            'assignedUsers',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Assign Users
    |--------------------------------------------------------------------------
    */

    public function assignUsers(Task $task, array $userIds)
    {
        DB::transaction(function () use ($task, $userIds) {

            foreach ($userIds as $userId) {

                $task->assignments()->firstOrCreate(

                    [
                        'task_id' => $task->id,
                        'user_id' => $userId,
                    ],

                    [
                        'assigned_by' => Auth::id(),
                        'assigned_at' => now(),
                        'status' => true,
                    ]
                );

                $this->logActivity(
                    $task,
                    'assigned',
                    'user_id',
                    null,
                    $userId
                );
            }
        });

        return $task->fresh()->load([
            'assignedUsers',
            'creator',
            'taskStatus',
            'taskPriority',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Remove Assigned User
    |--------------------------------------------------------------------------
    */

    public function removeAssignedUser(Task $task, int $userId)
    {
        DB::transaction(function () use ($task, $userId) {

            $task->assignments()
                ->where('user_id', $userId)
                ->delete();

            $this->logActivity(
                $task,
                'unassigned',
                'user_id',
                $userId,
                null
            );
        });

        return $task->fresh()->load([
            'assignedUsers',
            'creator',
            'taskStatus',
            'taskPriority',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Sync Assignments
    |--------------------------------------------------------------------------
    */

    public function syncAssignments(Task $task, array $userIds)
    {
        DB::transaction(function () use ($task, $userIds) {

            $task->assignments()->delete();

            foreach ($userIds as $userId) {

                $task->assignments()->create([

                    'user_id' => $userId,

                    'assigned_by' => Auth::id(),

                    'assigned_at' => now(),

                    'status' => true,

                ]);

                $this->logActivity(
                    $task,
                    'assigned',
                    'user_id',
                    null,
                    $userId
                );
            }
        });

        return $task->fresh()->load([
            'assignedUsers',
            'creator',
            'taskStatus',
            'taskPriority',
        ]);
    }
        /*
    |--------------------------------------------------------------------------
    | Change Task Status
    |--------------------------------------------------------------------------
    */

    public function changeTaskStatus(Task $task, int $statusId)
    {
        $oldStatus = optional($task->taskStatus)->name;

        $task->update([
            'task_status_id' => $statusId,
            'updated_by'     => Auth::id(),
        ]);

        $task->load('taskStatus');

        $newStatus = optional($task->taskStatus)->name;

        $this->logActivity(
            $task,
            'status_changed',
            'task_status_id',
            $oldStatus,
            $newStatus
        );

        return $task->load([
            'project',
            'parent',
            'taskStatus',
            'taskPriority',
            'creator',
            'updater',
            'assignedUsers',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Change Task Priority
    |--------------------------------------------------------------------------
    */

    public function changeTaskPriority(Task $task, int $priorityId)
    {
        $oldPriority = optional($task->taskPriority)->name;

        $task->update([
            'task_priority_id' => $priorityId,
            'updated_by'       => Auth::id(),
        ]);

        $task->load('taskPriority');

        $newPriority = optional($task->taskPriority)->name;

        $this->logActivity(
            $task,
            'priority_changed',
            'task_priority_id',
            $oldPriority,
            $newPriority
        );

        return $task->load([
            'project',
            'parent',
            'taskStatus',
            'taskPriority',
            'creator',
            'updater',
            'assignedUsers',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Log Activity
    |--------------------------------------------------------------------------
    */

    private function logActivity(
        Task $task,
        string $action,
        ?string $fieldName = null,
        $oldValue = null,
        $newValue = null,
        ?array $metadata = null
    ): void {

        $task->activities()->create([

            'user_id' => Auth::id(),

            'action' => $action,

            'field_name' => $fieldName,

            'old_value' => is_array($oldValue)
                ? json_encode($oldValue)
                : $oldValue,

            'new_value' => is_array($newValue)
                ? json_encode($newValue)
                : $newValue,

            'metadata' => $metadata,

            'status' => true,

        ]);
    }
}
