<?php

namespace App\Services\TaskAssignment;

use App\Models\Task;
use App\Models\TaskAssignment;
use Illuminate\Support\Facades\DB;

class TaskAssignmentService
{
    public function index(Task $task)
    {
        return $task->assignments()
            ->with([
                'user',
                'assigner',
            ])
            ->latest()
            ->get();
    }

    public function store(Task $task, array $userIds)
    {
        return DB::transaction(function () use ($task, $userIds) {

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

            return $task->load([
                'assignedUsers',
            ]);
        });
    }

    public function remove(Task $task, int $userId)
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

        return true;
    }

    public function sync(Task $task, array $userIds)
    {
        return DB::transaction(function () use ($task, $userIds) {

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

            return $task->load('assignedUsers');
        });
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

            'user_id' => auth()->id(),

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
