<?php

namespace App\Services\Task;

use App\Models\Task;
use Illuminate\Support\Facades\DB;

class TaskService
{
    public function index(array $filters = [])
    {
        return Task::with([
            'project',
            'status',
            'priority',
            'creator',
            'assignedUsers',
        ])
            ->withCount([
                'attachments',
                'comments',
                'checklists',
                'activities',
            ])
            ->when(!empty($filters['search']), function ($query) use ($filters) {
                $query->where(function ($q) use ($filters) {
                    $q->where('title', 'like', "%{$filters['search']}%")
                        ->orWhere('task_code', 'like', "%{$filters['search']}%");
                });
            })
            ->when(!empty($filters['project_id']), function ($query) use ($filters) {
                $query->where('project_id', $filters['project_id']);
            })
            ->when(!empty($filters['task_status_id']), function ($query) use ($filters) {
                $query->where('task_status_id', $filters['task_status_id']);
            })
            ->when(!empty($filters['task_priority_id']), function ($query) use ($filters) {
                $query->where('task_priority_id', $filters['task_priority_id']);
            })
            ->when(isset($filters['status']) && $filters['status'] !== '', function ($query) use ($filters) {
                $query->where('status', $filters['status']);
            })
            ->latest()
            ->paginate($filters['per_page'] ?? 10);
    }

    public function store(array $data)
    {
        return DB::transaction(function () use ($data) {

            $data['task_code'] = $this->generateTaskCode();

            $data['created_by'] = auth()->id();

            if (empty($data['progress'])) {
                $data['progress'] = 0;
            }

            $task = Task::create($data);
            $this->logActivity(
                $task,
                'created'
            );

            return $task->load([
                'project',
                'status',
                'priority',
                'creator',
            ]);
        });
    }

    private function generateTaskCode(): string
    {
        $lastTask = Task::latest('id')->first();
        $number = $lastTask
            ? ((int) substr($lastTask->task_code, 5)) + 1
            : 1;
        return 'TASK-' . str_pad($number, 5, '0', STR_PAD_LEFT);
    }


    public function show(Task $task)
    {
        return $task->load([
            'project',
            'parent',
            'children',
            'status',
            'priority',
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

    public function update(Task $task, array $data)
    {
        return DB::transaction(function () use ($task, $data) {
            $data['updated_by'] = auth()->id();
            if (
                isset($data['progress']) &&
                (int) $data['progress'] === 100 &&
                empty($task->completed_at)
            ) {
                $data['completed_at'] = now();
            }
            if (
                isset($data['progress']) &&
                (int) $data['progress'] < 100
            ) {
                $data['completed_at'] = null;
            }
            $oldValues = $task->only(array_keys($data));
            $task->update($data);
            foreach ($data as $field => $value) {
                if (
                    array_key_exists($field, $oldValues) &&
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
                'status',
                'priority',
                'creator',
                'updater',
                'assignedUsers',
            ]);
        });
    }
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

    public function restore($id)
    {
        return DB::transaction(function () use ($id) {
            $task = Task::onlyTrashed()->findOrFail($id);
            $task->restore();
            $this->logActivity(
                $task,
                'restored'
            );
            return $task;
        });
    }

    public function forceDelete($id)
    {
        return DB::transaction(function () use ($id) {
            $task = Task::onlyTrashed()->findOrFail($id);
            $this->logActivity(
                $task,
                'force_deleted'
            );
            $task->forceDelete();
            return true;
        });
    }

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
        return $task->fresh();
    }

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
                        'assigned_by' => auth()->id(),
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
        return $task->fresh()->load('assignedUsers');
    }
    public function removeAssignedUser(Task $task, int $userId)
    {
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
        return $task->fresh()->load('assignedUsers');
    }

    public function syncAssignments(Task $task, array $userIds)
    {
        DB::transaction(function () use ($task, $userIds) {
            $task->assignments()->delete();
            foreach ($userIds as $userId) {
                $task->assignments()->create([
                    'user_id' => $userId,
                    'assigned_by' => auth()->id(),
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
        return $task->fresh()->load('assignedUsers');
    }

    public function changeTaskStatus(Task $task, int $statusId)
    {
        $oldStatus = optional($task->status)->name;
        $task->update([
            'task_status_id' => $statusId,
            'updated_by' => auth()->id(),
        ]);
        $task->load('status');
        $newStatus = optional($task->status)->name;
        $this->logActivity(
            $task,
            'status_changed',
            'task_status_id',
            $oldStatus,
            $newStatus
        );
        return $task;
    }

    public function changeTaskPriority(Task $task, int $priorityId)
    {
        $oldPriority = optional($task->priority)->name;
        $task->update([
            'task_priority_id' => $priorityId,
            'updated_by' => auth()->id(),
        ]);
        $task->load('priority');
        $newPriority = optional($task->priority)->name;
        $this->logActivity(
            $task,
            'priority_changed',
            'task_priority_id',
            $oldPriority,
            $newPriority
        );
        return $task;
    }

    private function logActivity(
        Task $task,
        string $action,
        ?string $fieldName = null,
        $oldValue = null,
        $newValue = null,
        ?array $metadata = null
    ): void {
        $task->activities()->create([
            'user_id'    => auth()->id(),
            'action'     => $action,
            'field_name' => $fieldName,
            'old_value'  => is_array($oldValue)
                ? json_encode($oldValue)
                : $oldValue,
            'new_value'  => is_array($newValue)
                ? json_encode($newValue)
                : $newValue,
            'metadata'   => $metadata,
            'status'     => true,
        ]);
    }
}
