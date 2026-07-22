<?php

namespace App\Http\Resources\Project;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'department_id' => $this->department_id,
            'project_manager_id' => $this->project_manager_id,
            'name' => $this->name,
            'code' => $this->code,
            'client_name' => $this->client_name,
            'start_date' => optional($this->start_date)->format('Y-m-d'),
            'end_date' => optional($this->end_date)->format('Y-m-d'),
            'priority' => $this->priority,
            'project_status' => $this->project_status,
            'progress' => $this->progress,
            'budget' => $this->budget,
            'description' => $this->description,
            'status' => $this->status,
            // Relations
            'department' => $this->whenLoaded('department'),
            'project_manager' => $this->whenLoaded('projectManager'),
            'teams' => $this->whenLoaded('teams'),
            // Only IDs of selected teams (useful for Edit form)
            'team_ids' => $this->whenLoaded(
                'teams',
                fn() => $this->teams->pluck('id')
            ),
            'created_at' => optional($this->created_at)->format('Y-m-d H:i:s'),
            'updated_at' => optional($this->updated_at)->format('Y-m-d H:i:s'),
        ];
    }
}
