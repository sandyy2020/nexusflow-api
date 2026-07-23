<?php

namespace App\Http\Resources\Task;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskAssignmentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [

            'id' => $this->id,

            'task_id' => $this->task_id,

            'user_id' => $this->user_id,

            'assigned_by' => $this->assigned_by,

            'role' => $this->role,

            'assigned_at' => optional($this->assigned_at)
                ->format('Y-m-d H:i:s'),

            'status' => $this->status,

            'user' => new UserResource(
                $this->whenLoaded('user')
            ),

            'assigner' => new UserResource(
                $this->whenLoaded('assigner')
            ),

            'created_at' => optional($this->created_at)
                ->format('Y-m-d H:i:s'),

            'updated_at' => optional($this->updated_at)
                ->format('Y-m-d H:i:s'),

        ];
    }
}