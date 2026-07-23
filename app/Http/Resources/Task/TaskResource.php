<?php

namespace App\Http\Resources\Task;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;

class TaskResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'task_code' => $this->task_code,
            'title' => $this->title,
            'description' => $this->description,
            'project' => $this->project
                ? [
                    'id' => $this->project->id,
                    'name' => $this->project->name,
                ]
                : null,
            'parent_task' => $this->parent
                ? [
                    'id' => $this->parent->id,
                    'task_code' => $this->parent->task_code,
                    'title' => $this->parent->title,
                ]
                : null,
            'task_status' => $this->taskStatus
                ? [
                    'id' => $this->taskStatus->id,
                    'name' => $this->taskStatus->name,
                    'color' => $this->taskStatus->color,
                    'is_completed' => $this->taskStatus->is_completed,
                ]
                : null,
            'task_priority' => $this->taskPriority
                ? [
                    'id' => $this->taskPriority->id,
                    'name' => $this->taskPriority->name,
                    'level' => $this->taskPriority->level,
                    'color' => $this->taskPriority->color,
                ]
                : null,
            'progress' => $this->progress,
            'story_points' => $this->story_points,
            'estimated_hours' => $this->estimated_hours,
            'actual_hours' => $this->actual_hours,
            'start_date' => optional($this->start_date)->format('Y-m-d'),
            'due_date' => optional($this->due_date)->format('Y-m-d'),
            'completed_at' => optional($this->completed_at)->format('Y-m-d H:i:s'),
            'is_billable' => $this->is_billable,
            'metadata' => $this->metadata,
            'created_by' => $this->creator
                ? [
                    'id' => $this->creator->id,
                    'name' => $this->creator->name,
                    'email' => $this->creator->email,
                ]
                : null,
            'updated_by' => $this->updater
                ? [
                    'id' => $this->updater->id,
                    'name' => $this->updater->name,
                ]
                : null,
            'assigned_users' => UserResource::collection(
                $this->whenLoaded('assignedUsers')
            ),
            'attachments_count' => $this->whenCounted('attachments'),
            'comments_count' => $this->whenCounted('comments'),
            'checklists_count' => $this->whenCounted('checklists'),
            'activities_count' => $this->whenCounted('activities'),
            'sort_order' => $this->sort_order,
            'status' => $this->status,
            'created_at' => optional($this->created_at)
                ->format('Y-m-d H:i:s'),
            'updated_at' => optional($this->updated_at)
                ->format('Y-m-d H:i:s'),
            'children' => TaskResource::collection(
                $this->whenLoaded('children')
            ),
        ];
    }
}
