<?php

namespace App\Http\Resources\Team;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\DepartmentResource;
use App\Http\Resources\UserResource;

class TeamResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'department_id' => $this->department_id,
           'department' => new DepartmentResource($this->whenLoaded('department')),
            'team_lead_id' => $this->team_lead_id,
            'team_lead' => new UserResource($this->whenLoaded('teamLead')),
            'name' => $this->name,
            'code' => $this->code,
            'description' => $this->description,
            'status' => $this->status,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
        ];
    }
}
