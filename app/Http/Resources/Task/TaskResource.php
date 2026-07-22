<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'task_code' => $this->task_code,
            'title' => $this->title,
            'description' => $this->description,
            'project' => $this->whenLoaded('project', function () {
                return [
                    'id' => $this->project->id,
                    'name' => $this->project->name,
                ];
            }),
            'parent_task' => $this->whenLoaded('parent', function () {
                return [
                    'id' => $this->parent->id,
                    'task_code' => $this->parent->task_code,
                    'title' => $this->parent->title,
                ];
            }),
            'task_status' => $this->whenLoaded('status', function () {
                return [
                    'id' => $this->status->id,
                    'name' => $this->status->name,
                    'color' => $this->status->color,
                    'is_completed' => $this->status->is_completed,
                ];
            }),
            'task_priority' => $this->whenLoaded('priority', function () {
                return [
                    'id' => $this->priority->id,
                    'name' => $this->priority->name,
                    'level' => $this->priority->level,
                    'color' => $this->priority->color,
                ];
            }),
            'progress' => $this->progress,
            'story_points' => $this->story_points,
            'estimated_hours' => $this->estimated_hours,
            'actual_hours' => $this->actual_hours,
            'start_date' => optional($this->start_date)->format('Y-m-d'),
            'due_date' => optional($this->due_date)->format('Y-m-d'),
            'completed_at' => optional($this->completed_at)->format('Y-m-d H:i:s'),
            'is_billable' => $this->is_billable,
            'metadata' => $this->metadata,
            'created_by' => $this->whenLoaded('creator', function () {
                return [
                    'id' => $this->creator->id,
                    'name' => $this->creator->name,
                    'email' => $this->creator->email,
                ];
            }),
            'updated_by' => $this->whenLoaded('updater', function () {
                return [
                    'id' => $this->updater->id,
                    'name' => $this->updater->name,
                ];
            }),
            'assigned_users' => $this->whenLoaded('assignedUsers'),
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
        ];
    }
}