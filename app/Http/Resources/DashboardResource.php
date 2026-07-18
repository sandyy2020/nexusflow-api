<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DashboardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'summary' => $this['summary'],
            'recent_users' => $this['recent_users'],
            'recent_roles' => $this['recent_roles'],
            'latest_users' => $this['latest_users'] ?? [],
            'department_stats' => $this['department_stats'] ?? [],
            'role_stats' => $this['role_stats'] ?? [],
            'growth_stats' => $this['growth_stats'],
            'recent_activity' => $this['recent_activity'],
        ];
    }
}
